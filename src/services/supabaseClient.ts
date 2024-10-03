import { createClient } from '@supabase/supabase-js';

if (!process.env.SUPABASE_URL) {
    throw new Error('SUPABASE_URL is not defined');
}

if (!process.env.SUPABASE_KEY) {
    throw new Error('SUPABASE_KEY is not defined');
}

// Supabase 클라이언트 초기화
export const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
