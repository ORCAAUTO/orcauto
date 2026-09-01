import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { getProfile } from '@/lib/data'
import type { Profile } from '@/lib/types'

type AuthContextValue = { session: Session | null; profile: Profile | null; loading: boolean; signOut: () => Promise<void> }
const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    let mounted = true
    supabase.auth.getSession().then(({ data }) => { if (mounted) setSession(data.session) }).finally(() => { if (mounted) setLoading(false) })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession))
    return () => { mounted = false; listener.subscription.unsubscribe() }
  }, [])
  useEffect(() => {
    let active = true
    if (!session?.user.id) { setProfile(null); return }
    getProfile(session.user.id).then((data) => { if (active) setProfile(data) }).catch(() => { if (active) setProfile(null) })
    return () => { active = false }
  }, [session?.user.id])
  const value = useMemo(() => ({ session, profile, loading, signOut: async () => { await supabase.auth.signOut() } }), [session, profile, loading])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export function useAuth() { const value = useContext(AuthContext); if (!value) throw new Error('useAuth must be used inside AuthProvider'); return value }
