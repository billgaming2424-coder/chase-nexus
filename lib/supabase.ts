import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://rvetucuqburqnrgoatui.supabase.co";

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2ZXR1Y3VxYnVycW5yZ29hdHVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgyOTMyOTcsImV4cCI6MjEwMzg2OTI5N30.Q3g0deWdLd8b0oczpDd1gwdRcTm2xJ_RBhjhtCgm19g";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
