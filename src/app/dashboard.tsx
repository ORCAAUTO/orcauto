import { Link, Redirect } from 'expo-router'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useAuth } from '@/lib/auth-context'

function Action({ href, title, description }: { href: '/vehicles' | '/request' | '/requests' | '/budgets' | '/services' | '/workshops'; title: string; description: string }) {
  return <Link href={href} asChild><Pressable style={styles.card}><><Text style={styles.cardTitle}>{title}</Text><Text style={styles.cardText}>{description}</Text></></Pressable></Link>
}

export default function DashboardScreen() {
  const { session, profile, loading, signOut } = useAuth()
  if (!loading && !session) return <Redirect href="/auth" />
  if (loading || !profile) return <View style={styles.center}><Text style={styles.muted}>Carregando seu perfil…</Text></View>
  const oficina = profile.role === 'oficina'
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container}>
      <View style={styles.hero}><Text style={styles.kicker}>ORCAAUTO</Text><Text style={styles.title}>Olá, {profile.nome}.</Text><Text style={styles.subtitle}>{oficina ? 'Gerencie solicitações, orçamentos e serviços da sua oficina.' : 'Encontre uma oficina e acompanhe seu carro em cada etapa.'}</Text></View>
      <View style={styles.grid}>
        {!oficina && <Action href="/request" title="Pedir serviço" description="Explique o problema e envie uma solicitação." />}
        <Action href="/requests" title="Solicitações" description="Acompanhe pedidos abertos e em andamento." />
        {!oficina && <Action href="/vehicles" title="Meus veículos" description="Cadastre e mantenha seus veículos atualizados." />}
        {!oficina && <Action href="/workshops" title="Oficinas" description="Consulte oficinas ativas na sua cidade." />}
        <Action href="/budgets" title="Orçamentos" description="Veja, aceite ou recuse propostas." />
        <Action href="/services" title="Serviços" description="Acompanhe o serviço até a conclusão." />
      </View>
      <Pressable onPress={signOut} style={styles.signOut}><Text style={styles.signOutText}>Sair da conta</Text></Pressable>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { padding: 20, gap: 18, backgroundColor: '#0B0D10' },
  hero: { gap: 8, paddingVertical: 8 }, kicker: { color: '#8E98A6', fontWeight: '800', letterSpacing: 2 },
  title: { color: '#FFFFFF', fontSize: 30, fontWeight: '800' }, subtitle: { color: '#A9B0BA', fontSize: 16, lineHeight: 23 },
  grid: { gap: 12 }, card: { backgroundColor: '#15181D', borderWidth: 1, borderColor: '#292F38', borderRadius: 16, padding: 18, gap: 7 }, cardTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: '800' }, cardText: { color: '#A9B0BA', lineHeight: 21 },
  signOut: { alignItems: 'center', padding: 14 }, signOutText: { color: '#B7BEC8', fontWeight: '700' }, center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0B0D10' }, muted: { color: '#A9B0BA' },
})
