
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://iykrauzuutvmnxpqppzk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5a3JhdXp1dXR2bW54cHFwcHprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU4NzE1NjcsImV4cCI6MjA1MTQ0NzU2N30.kvAGD6FrOhmdpYzRHMyXam3p337w8Ijd5_raruHPd6U';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
