import { useState } from 'react'
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { router } from 'expo-router'

import { supabase } from '@/lib/supabase'

export default function AuthScreen() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [role, setRole] = useState<'cliente' | 'oficina'>('cliente')
  const [loading, setLoading] = useState(false)

  async function signIn() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password: senha })
    setLoading(false)
    if (error) return Alert.alert('Não foi possível entrar', error.message)
    router.replace('/')
  }

  async function signUp() {
    if (nome.trim().length < 2) {
      return Alert.alert('Nome inválido', 'Informe seu nome.')
    }

    setLoading(true)
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password: senha,
      options: { data: { nome: nome.trim(), role } },
    })
    setLoading(false)

    if (error) return Alert.alert('Não foi possível criar a conta', error.message)

    if (data.session) {
      router.replace('/')
    } else {
      Alert.alert('Conta criada', 'Confira seu e-mail para confirmar a conta, se a confirmação estiver habilitada.')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acessar ORCAAUTO</Text>
      <Text style={styles.subtitle}>Entre ou crie sua conta de cliente ou oficina.</Text>

      <TextInput value={nome} onChangeText={setNome} placeholder="Nome" placeholderTextColor="#7B8490" style={styles.input} />
      <TextInput value={email} onChangeText={setEmail} placeholder="E-mail" placeholderTextColor="#7B8490" autoCapitalize="none" keyboardType="email-address" style={styles.input} />
      <TextInput value={senha} onChangeText={setSenha} placeholder="Senha" placeholderTextColor="#7B8490" secureTextEntry style={styles.input} />

      <View style={styles.roles}>
        {(['cliente', 'oficina'] as const).map((item) => (
          <Pressable key={item} onPress={() => setRole(item)} style={[styles.role, role === item && styles.roleSelected]}>
            <Text style={[styles.roleText, role === item && styles.roleTextSelected]}>{item === 'cliente' ? 'Cliente' : 'Oficina'}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable disabled={loading} onPress={signIn} style={styles.primary}>
        <Text style={styles.primaryText}>{loading ? 'Aguarde...' : 'Entrar'}</Text>
      </Pressable>
      <Pressable disabled={loading} onPress={signUp} style={styles.secondary}>
        <Text style={styles.secondaryText}>Criar conta</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 14, padding: 24, justifyContent: 'center', backgroundColor: '#0B0D10' },
  title: { color: '#FFFFFF', fontSize: 28, fontWeight: '800' },
  subtitle: { color: '#A9B0BA', fontSize: 15, lineHeight: 22, marginBottom: 8 },
  input: { color: '#FFFFFF', backgroundColor: '#171A20', borderWidth: 1, borderColor: '#2B313B', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 13 },
  roles: { flexDirection: 'row', gap: 10 },
  role: { flex: 1, borderWidth: 1, borderColor: '#2B313B', borderRadius: 12, paddingVertical: 12, alignItems: 'center' },
  roleSelected: { backgroundColor: '#FFFFFF', borderColor: '#FFFFFF' },
  roleText: { color: '#A9B0BA', fontWeight: '700' },
  roleTextSelected: { color: '#0B0D10' },
  primary: { backgroundColor: '#FFFFFF', borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginTop: 6 },
  primaryText: { color: '#0B0D10', fontWeight: '800' },
  secondary: { borderWidth: 1, borderColor: '#3A424D', borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  secondaryText: { color: '#FFFFFF', fontWeight: '700' },
})
