import { hasSupabaseEnv, requireSupabase } from '../lib/supabaseClient';

export type AuthUser = {
  id: string;
  email: string;
};

export const getCurrentUser = async (): Promise<AuthUser | null> => {
  if (!hasSupabaseEnv) return null;

  const supabase = requireSupabase();
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  if (!data.user || !data.user.email) return null;

  return {
    id: data.user.id,
    email: data.user.email,
  };
};

export const signInWithEmail = async (email: string, password: string) => {
  const supabase = requireSupabase();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
};

export const signUpWithEmail = async (email: string, password: string, fullName: string) => {
  const supabase = requireSupabase();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });
  if (error) throw error;
};

export const sendPasswordReset = async (email: string) => {
  const supabase = requireSupabase();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/login`,
  });
  if (error) throw error;
};

export const signOut = async () => {
  if (!hasSupabaseEnv) return;

  const supabase = requireSupabase();
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};
