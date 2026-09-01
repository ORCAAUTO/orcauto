import { Link } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.brand}>ORCAAUTO</Text>
      <Text style={styles.title}>Seu carro. Seu serviço. Do seu jeito.</Text>
      <Text style={styles.subtitle}>
        A base do aplicativo está conectada ao projeto Supabase e pronta para receber os fluxos de cliente e oficina.
      </Text>
      <Link href="/auth" style={styles.button}>
        Entrar ou criar conta
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    gap: 16,
    backgroundColor: '#0B0D10',
  },
  brand: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 2,
    color: '#FFFFFF',
  },
  title: {
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: '#A9B0BA',
  },
  button: {
    alignSelf: 'flex-start',
    marginTop: 8,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    color: '#0B0D10',
    fontWeight: '700',
  },
})
