type SmokeResult = {
  name: string;
  status: number;
  ok: boolean;
  details?: string;
};

const baseUrl = process.env.PROD_SUPABASE_URL?.trim();
const publishableKey = process.env.PROD_SUPABASE_PUBLISHABLE_KEY?.trim();
const testUserEmail = process.env.PROD_TEST_USER_EMAIL?.trim();
const testUserPassword = process.env.PROD_TEST_USER_PASSWORD?.trim();

if (!baseUrl || !publishableKey) {
  console.error('Missing env vars: PROD_SUPABASE_URL and PROD_SUPABASE_PUBLISHABLE_KEY are required.');
  process.exit(1);
}

const toJson = async (response: Response) => {
  const text = await response.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return { raw: text };
  }
};

const call = async (
  name: string,
  method: string,
  path: string,
  expected: number[],
  body?: unknown,
  token?: string,
): Promise<SmokeResult> => {
  const headers: Record<string, string> = {
    apikey: publishableKey,
    'Content-Type': 'application/json',
  };

  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const payload = await toJson(response);
  const ok = expected.includes(response.status);
  return {
    name,
    status: response.status,
    ok,
    details: ok ? undefined : JSON.stringify(payload),
  };
};

const run = async () => {
  const results: SmokeResult[] = [];

  results.push(await call('chat_get_405', 'GET', '/functions/v1/chat-recommend', [405]));
  results.push(await call('chat_bad_payload_400', 'POST', '/functions/v1/chat-recommend', [400], { query: 'x' }));
  results.push(
    await call('chat_ok_200', 'POST', '/functions/v1/chat-recommend', [200], {
      query: 'shaadi ke liye ring',
      locale: 'ur',
    }),
  );

  results.push(await call('checkout_missing_bearer_401', 'POST', '/functions/v1/checkout-create-order', [401], {}));
  results.push(
    await call(
      'checkout_anon_bearer_401',
      'POST',
      '/functions/v1/checkout-create-order',
      [401],
      {},
      publishableKey,
    ),
  );

  if (testUserEmail && testUserPassword) {
    const signin = await fetch(`${baseUrl}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: {
        apikey: publishableKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: testUserEmail,
        password: testUserPassword,
      }),
    });
    const signinBody = await toJson(signin);
    if (!signin.ok || !signinBody?.access_token) {
      results.push({
        name: 'auth_signin_for_checkout',
        status: signin.status,
        ok: false,
        details: JSON.stringify(signinBody),
      });
    } else {
      const token = signinBody.access_token as string;
      const userId = signinBody.user?.id as string | undefined;
      const products = await fetch(`${baseUrl}/rest/v1/products?select=id,public_id,price_cents&public_id=eq.c1&limit=1`, {
        headers: {
          apikey: publishableKey,
          Authorization: `Bearer ${publishableKey}`,
        },
      });
      const productRows = (await toJson(products)) as Array<{ id: string; price_cents: number }>;
      const product = productRows[0];
      if (!product || !userId) {
        results.push({
          name: 'checkout_setup_data',
          status: 500,
          ok: false,
          details: 'Missing product c1 or user id',
        });
      } else {
        const cartRes = await fetch(`${baseUrl}/rest/v1/carts?user_id=eq.${userId}&select=id`, {
          headers: {
            apikey: publishableKey,
            Authorization: `Bearer ${token}`,
          },
        });
        const cartRows = (await toJson(cartRes)) as Array<{ id: string }>;
        const cartId = cartRows[0]?.id;
        if (!cartId) {
          results.push({
            name: 'checkout_setup_cart',
            status: 500,
            ok: false,
            details: 'Cart not found for user',
          });
        } else {
          await fetch(`${baseUrl}/rest/v1/cart_items`, {
            method: 'POST',
            headers: {
              apikey: publishableKey,
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              cart_id: cartId,
              product_id: product.id,
              quantity: 1,
              unit_price_cents: product.price_cents,
            }),
          });

          const idempotency = crypto.randomUUID();
          const payload = {
            shipping_address: {
              firstName: 'Prod',
              lastName: 'Smoke',
              line1: '123 Main St',
              city: 'Austin',
              state: 'TX',
              postalCode: '78701',
              country: 'United States',
              email: testUserEmail,
            },
            billing_address: {
              firstName: 'Prod',
              lastName: 'Smoke',
              line1: '123 Main St',
              city: 'Austin',
              state: 'TX',
              postalCode: '78701',
              country: 'United States',
              email: testUserEmail,
            },
            idempotency_key: idempotency,
          };

          const first = await call('checkout_authed_first_200', 'POST', '/functions/v1/checkout-create-order', [200], payload, token);
          const second = await call(
            'checkout_authed_idempotent_200',
            'POST',
            '/functions/v1/checkout-create-order',
            [200],
            payload,
            token,
          );
          results.push(first, second);
        }
      }
    }
  }

  const failed = results.filter((r) => !r.ok);
  for (const result of results) {
    console.log(`${result.ok ? 'PASS' : 'FAIL'} ${result.name} status=${result.status}`);
    if (result.details && !result.ok) console.log(`  details=${result.details}`);
  }

  if (failed.length > 0) {
    process.exit(1);
  }
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
