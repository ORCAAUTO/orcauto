import { Redirect, Link } from 'expo-router'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useAuth } from '@/lib/auth-context'

export default function HomeScreen() {
  const { session, loading } = useAuth()
  if (!loading && session) return <Redirect href="/dashboard" />
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container}>
      <Text style={styles.brand}>ORCAAUTO</Text>
      <Text style={styles.title}>Seu carro. Seu serviço. Do seu jeito.</Text>
      <Text style={styles.subtitle}>Conectamos clientes e oficinas para transformar o pedido de manutenção em um serviço acompanhado do começo ao fim.</Text>
      <Link href="/auth" style={styles.button}>Entrar ou criar conta</Link>
      <View style={styles.features}>
        <Text style={styles.feature}>✓ Solicitações de serviço</Text>
        <Text style={styles.feature}>✓ Orçamentos de oficinas</Text>
        <Text style={styles.feature}>✓ Acompanhamento do serviço</Text>
        <Text style={styles.feature}>✓ Comunicação em um só lugar</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', padding: 24, gap: 18, backgroundColor: '#0B0D10' },
  brand: { fontSize: 18, fontWeight: '800', letterSpacing: 3, color: '#FFFFFF' },
  title: { fontSize: 34, lineHeight: 40, fontWeight: '800', color: '#FFFFFF' },
  subtitle: { fontSize: 16, lineHeight: 24, color: '#A9B0BA' },
  button: { alignSelf: 'flex-start', paddingHorizontal: 20, paddingVertical: 14, borderRadius: 14, backgroundColor: '#FFFFFF', color: '#0B0D10', fontWeight: '800' },
  features: { gap: 10, paddingTop: 8 },
  feature: { color: '#D9DEE5', fontSize: 15 },
})
