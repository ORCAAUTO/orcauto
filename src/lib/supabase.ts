import { Platform } from 'react-native'
import 'react-native-url-polyfill/auto'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

// The EXPO_PUBLIC_* variables are preferred for local/dev environments.
// The fallback values keep the public web build operational when Vercel's
// environment variables have not yet been provisioned. Supabase publishable
// keys are intended for use in client applications; database protection must
// be enforced with Supabase Auth + RLS.
const supabaseUrl =
  process.env.EXPO_PUBLIC_SUPABASE_URL ??
  'https://pfjenyygroyikdenjhbd.supabase.co'
const supabasePublishableKey =
  process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  'sb_publishable_XIkhzXwtVxSUaGs8y37Hwg_bcxqkjco'

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    ...(Platform.OS !== 'web' ? { storage: AsyncStorage } : {}),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
