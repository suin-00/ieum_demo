/**
 * Supabase Client Configuration & Initialization Boilerplate
 * Safely guards configuration to prevent runtime crashes when environment variables are unset.
 */

export interface SupabaseConfig {
  supabaseUrl: string;
  supabaseAnonKey: string;
}

export function getSupabaseConfig(): SupabaseConfig {
  return {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key',
  };
}

/**
 * Basic client stub for App Router data handling and server actions.
 */
export const supabaseClient = {
  auth: {
    getUser: async () => ({ data: { user: null }, error: null }),
    signOut: async () => ({ error: null }),
  },
  from: (tableName: string) => ({
    select: (columns = '*') => ({
      eq: (_column: string, _val: unknown) => Promise.resolve({ data: [], error: null }),
      order: (_column: string) => Promise.resolve({ data: [], error: null }),
      data: [],
      error: null,
    }),
    insert: (_values: unknown) => Promise.resolve({ data: null, error: null }),
    update: (_values: unknown) => ({
      eq: (_column: string, _val: unknown) => Promise.resolve({ data: null, error: null }),
    }),
    delete: () => ({
      eq: (_column: string, _val: unknown) => Promise.resolve({ data: null, error: null }),
    }),
  }),
};
