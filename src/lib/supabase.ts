import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://vazyueybknrbgoqfnpxs.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_N8yBwKlc03G_UbQ_Un7F1g_6-ojmrW7';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
