import { supabaseAdmin } from '@/lib/supabase'

export async function getSettings() {
  const { data, error } = await supabaseAdmin
    .from('settings')
    .select('key, value')

  if (error || !data) return {}

  const settings: Record<string, string> = {}
  data.forEach((item: { key: string; value: string }) => {
    settings[item.key] = item.value
  })

  return settings
}