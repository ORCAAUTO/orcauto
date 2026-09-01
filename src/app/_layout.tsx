import { Stack } from 'expo-router'
import { AuthProvider } from '@/lib/auth-context'

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerBackTitle: 'Voltar', headerTintColor: '#FFFFFF', headerStyle: { backgroundColor: '#0B0D10' }, headerTitleStyle: { color: '#FFFFFF' }, contentStyle: { backgroundColor: '#0B0D10' } }}>
        <Stack.Screen name="index" options={{ title: 'ORCAAUTO' }} />
        <Stack.Screen name="auth" options={{ title: 'Entrar', presentation: 'modal' }} />
        <Stack.Screen name="dashboard" options={{ title: 'Início' }} />
        <Stack.Screen name="vehicles" options={{ title: 'Meus veículos' }} />
        <Stack.Screen name="request" options={{ title: 'Nova solicitação' }} />
        <Stack.Screen name="requests" options={{ title: 'Solicitações' }} />
        <Stack.Screen name="budgets" options={{ title: 'Orçamentos' }} />
        <Stack.Screen name="services" options={{ title: 'Serviços' }} />
        <Stack.Screen name="chat" options={{ title: 'Chat' }} />
        <Stack.Screen name="workshops" options={{ title: 'Oficinas' }} />
      </Stack>
    </AuthProvider>
  )
}
