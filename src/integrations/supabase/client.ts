// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://guepqhegqounvpjdlssz.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1ZXBxaGVncW91bnZwamRsc3N6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1MTg2NjksImV4cCI6MjA2NTA5NDY2OX0.HSi8ff7XZP-i5y7lMA-KXpE0eSyV27cBlkqek38f9Y4";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);