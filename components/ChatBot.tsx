import React from 'react';
import { Gem, Send, Sparkles, X } from 'lucide-react';

type ChatBotProps = {
  onOpenProduct: (productId: string) => void;
  onOpenCollections: () => void;
};

type ProductRecommendation = {
  id: string;
  name: string;
  price: string;
  reason: string;
  tags: string[];
};

type ChatMessage = {
  id: string;
  role: 'user' | 'bot';
  text: string;
  recommendations?: ProductRecommendation[];
};

const PRODUCT_POOL: ProductRecommendation[] = [
  {
    id: 'c1',
    name: 'Eternal Diamond Solitaire',
    price: '$2,450',
    reason: 'Great for engagements and elegant evening looks.',
    tags: ['wedding', 'engagement', 'bridal', 'formal', 'classic', 'statement', 'cool', 'neutral', 'white', 'black'],
  },
  {
    id: 'c2',
    name: 'Sapphire Halo Orbit',
    price: '$1,890',
    reason: 'Pairs beautifully with cool palettes and modern styling.',
    tags: ['party', 'formal', 'modern', 'cool', 'neutral', 'blue', 'black', 'silver'],
  },
  {
    id: 'c3',
    name: 'Dainty Pave Stack Band',
    price: '$1,200',
    reason: 'Minimal and versatile for everyday outfits.',
    tags: ['casual', 'daily', 'office', 'minimal', 'warm', 'neutral', 'pastel', 'white'],
  },
  {
    id: 'c4',
    name: 'Vintage Emerald Cut',
    price: '$3,150',
    reason: 'Best for luxe vintage styling and rich dress tones.',
    tags: ['wedding', 'anniversary', 'vintage', 'statement', 'warm', 'neutral', 'green', 'gold', 'red'],
  },
  {
    id: 'c5',
    name: 'Grand Gatsby Signet',
    price: '$2,780',
    reason: 'A bold piece for events and dressy evenings.',
    tags: ['party', 'formal', 'vintage', 'statement', 'warm', 'cool', 'black', 'gold'],
  },
  {
    id: 'c6',
    name: 'Infinity Vine Band',
    price: '$950',
    reason: 'Soft and elegant option for gifting and daily wear.',
    tags: ['gift', 'daily', 'casual', 'minimal', 'warm', 'neutral', 'pastel', 'gold', 'white'],
  },
];

const QUICK_PROMPTS = [
  'Wedding guest look',
  'I have warm skin tone',
  'Black dress for evening party',
  'Daily wear under $1500',
];

const tokenize = (input: string): string[] =>
  input
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);

const normalizeTokens = (tokens: string[]): string[] => {
  const expanded = new Set(tokens);

  if (expanded.has('wedding') || expanded.has('bridal')) {
    expanded.add('engagement');
    expanded.add('formal');
  }
  if (expanded.has('office')) expanded.add('daily');
  if (expanded.has('everyday')) expanded.add('daily');
  if (expanded.has('simple')) expanded.add('minimal');
  if (expanded.has('bold')) expanded.add('statement');
  if (expanded.has('gown')) expanded.add('formal');
  if (expanded.has('dark')) expanded.add('deep');
  if (expanded.has('brown')) expanded.add('warm');
  if (expanded.has('fair')) expanded.add('cool');

  return Array.from(expanded);
};

const recommendProducts = (query: string): ProductRecommendation[] => {
  const tokens = normalizeTokens(tokenize(query));
  const scored = PRODUCT_POOL.map((product) => {
    const score = tokens.reduce((acc, token) => acc + (product.tags.includes(token) ? 1 : 0), 0);
    return { product, score };
  })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((entry) => entry.product);

  return scored.length > 0 ? scored : PRODUCT_POOL.slice(0, 3);
};

const buildResponse = (query: string): ChatMessage => {
  const lower = query.toLowerCase();

  if (!lower.trim()) {
    return {
      id: crypto.randomUUID(),
      role: 'bot',
      text: 'Tell me your occasion, dress color, style preference, or skin tone and I will suggest pieces.',
    };
  }

  if (/(hello|hi|hey)/.test(lower)) {
    return {
      id: crypto.randomUUID(),
      role: 'bot',
      text: 'Hi. I can help you choose jewelry by occasion, outfit color, style, budget, and skin tone.',
    };
  }

  const picks = recommendProducts(query);
  const hasOccasion = /(wedding|engagement|party|office|date|gift|anniversary|casual|daily)/.test(lower);
  const hasColor = /(black|white|red|green|blue|gold|silver|pastel)/.test(lower);
  const hasTone = /(warm|cool|neutral|fair|deep|dark|medium)/.test(lower);

  let intro = 'Based on your preferences, these should suit you:';
  if (hasOccasion && hasColor) intro = 'Great match. For that occasion and dress color, I recommend:';
  else if (hasOccasion) intro = 'For your occasion, these are strong picks:';
  else if (hasTone) intro = 'For your skin tone, these should complement you well:';
  else if (hasColor) intro = 'For that dress color, these pieces will pair nicely:';

  return {
    id: crypto.randomUUID(),
    role: 'bot',
    text: `${intro} ${picks.map((p) => p.name).join(', ')}.`,
    recommendations: picks,
  };
};

const ChatBot: React.FC<ChatBotProps> = ({ onOpenProduct, onOpenCollections }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [input, setInput] = React.useState('');
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      id: crypto.randomUUID(),
      role: 'bot',
      text: 'I can recommend jewelry based on your occasion, dress color, skin tone, and style. What are you dressing for?',
    },
  ]);

  const sendMessage = (rawText: string) => {
    const text = rawText.trim();
    if (!text) return;

    const userMessage: ChatMessage = { id: crypto.randomUUID(), role: 'user', text };
    const botMessage = buildResponse(text);
    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput('');
  };

  return (
    <>
      {isOpen ? (
        <div className="fixed bottom-5 right-5 z-50 w-[92vw] max-w-[360px] bg-[#F6F1E8] text-[#1C1C1C] border border-[rgba(198,167,94,0.25)] shadow-2xl rounded-lg overflow-hidden">
          <div className="px-4 py-3 bg-[#0A3F30] text-[#F6F1E8] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-[#C6A75E]" />
              <p className="text-sm font-semibold tracking-wide">Stylist Assistant</p>
            </div>
            <button type="button" onClick={() => setIsOpen(false)} aria-label="Close chatbot">
              <X size={16} />
            </button>
          </div>

          <div className="max-h-[320px] overflow-y-auto px-3 py-3 space-y-3">
            {messages.map((message) => (
              <div key={message.id} className={message.role === 'user' ? 'text-right' : 'text-left'}>
                <div
                  className={`inline-block max-w-[92%] px-3 py-2 text-sm leading-relaxed ${
                    message.role === 'user'
                      ? 'bg-[#0E4F3C] text-[#F6F1E8]'
                      : 'bg-white border border-[rgba(198,167,94,0.2)] text-[#1C1C1C]'
                  }`}
                >
                  {message.text}
                </div>
                {message.recommendations?.length ? (
                  <div className="mt-2 space-y-2">
                    {message.recommendations.map((rec) => (
                      <button
                        key={rec.id}
                        type="button"
                        onClick={() => onOpenProduct(rec.id)}
                        className="block w-full text-left bg-white border border-[rgba(198,167,94,0.2)] px-3 py-2 hover:border-[rgba(198,167,94,0.45)] transition-colors"
                      >
                        <p className="text-sm font-semibold text-[#0E4F3C]">{rec.name}</p>
                        <p className="text-xs text-[#6F6F6F]">{rec.price} - {rec.reason}</p>
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={onOpenCollections}
                      className="text-xs uppercase tracking-widest text-[#0E4F3C] hover:text-[#B8954C] transition-colors"
                    >
                      View more in collections
                    </button>
                  </div>
                ) : null}
              </div>
            ))}
          </div>

          <div className="px-3 pb-2 flex flex-wrap gap-2">
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => sendMessage(prompt)}
                className="text-[10px] uppercase tracking-wide px-2 py-1 bg-[#EFE7DA] border border-[rgba(198,167,94,0.2)] hover:border-[rgba(198,167,94,0.45)]"
              >
                {prompt}
              </button>
            ))}
          </div>

          <form
            className="p-3 border-t border-[rgba(198,167,94,0.2)] flex items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Occasion, dress color, skin tone..."
              className="flex-1 bg-white border border-[rgba(198,167,94,0.2)] px-3 py-2 text-sm outline-none focus:border-[#C6A75E]"
            />
            <button type="submit" className="w-10 h-10 bg-[#0A3F30] text-[#F6F1E8] flex items-center justify-center hover:bg-[#115A46]">
              <Send size={16} />
            </button>
          </form>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full bg-[#0A3F30] text-[#F6F1E8] border border-[rgba(198,167,94,0.4)] shadow-xl hover:bg-[#115A46] transition-colors"
        aria-label="Open style chatbot"
      >
        <Gem size={22} className="mx-auto text-[#C6A75E]" />
      </button>
    </>
  );
};

export default ChatBot;
