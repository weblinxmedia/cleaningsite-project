import { supabaseAdmin } from '@/lib/supabase'
import { unstable_cache } from 'next/cache'

export const getSettings = unstable_cache(
  async () => {
    const { data, error } = await supabaseAdmin
      .from('settings')
      .select('key, value')

    if (error || !data) return {}

    const settings: Record<string, string> = {}
    data.forEach((item: { key: string; value: string }) => {
      settings[item.key] = item.value
    })

    return settings
  },
  ['site-settings'],
  { revalidate: 3600 }
)