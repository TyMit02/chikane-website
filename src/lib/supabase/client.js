import { createClient } from '@supabase/supabase-js'

// Debug logging to see what values we're getting
console.log('Environment variables:', {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
  hasAnonKey: !!import.meta.env.VITE_SUPABASE_ANON_KEY
})

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://puvgvjqafekwzljkfjbb.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1dmd2anFhZmVrd3psamtmamJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEyOTE0OTgsImV4cCI6MjA0Njg2NzQ5OH0.mPIGdVBhxb7gEpb8R-ezcmxNbWyh4KPahCKl1dOWqko'

if (!supabaseUrl) {
  console.error('Supabase URL is missing. Current value:', supabaseUrl)
  console.error('All env vars:', import.meta.env)
  throw new Error('Missing environment variable: VITE_SUPABASE_URL')
}

if (!supabaseAnonKey) {
  console.error('Supabase Anon Key is missing')
  throw new Error('Missing environment variable: VITE_SUPABASE_ANON_KEY')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
})