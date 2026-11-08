import 'react-native-url-polyfill/auto';

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://hxzccdclwnqzunfbvoor.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_nkZknyYzbCgKSpy8YVxy6A_i3V6xA05';

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: false,
  },
});

export async function hasPin(): Promise<boolean> {
  const { data, error } = await supabase.rpc('has_pin');
  if (error) throw error;
  return Boolean(data);
}

export async function setPin(pin: string): Promise<void> {
  const { error } = await supabase.rpc('set_pin', { new_pin: pin });
  if (error) throw error;
}

export async function verifyPin(pin: string): Promise<boolean> {
  const { data, error } = await supabase.rpc('verify_pin', { input_pin: pin });
  if (error) throw error;
  return Boolean(data);
}
