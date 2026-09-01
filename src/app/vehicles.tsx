import { useEffect, useState } from 'react'
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { Redirect } from 'expo-router'
import { useAuth } from '@/lib/auth-context'
import { createVehicle, getVehicles } from '@/lib/data'
import type { Vehicle } from '@/lib/types'

export default function VehiclesScreen() {
  const { session, profile, loading } = useAuth()
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [marca, setMarca] = useState(''); const [modelo, setModelo] = useState(''); const [ano, setAno] = useState(''); const [placa, setPlaca] = useState('')
  const [saving, setSaving] = useState(false)
  useEffect(() => { if (session) getVehicles(session.user.id).then(setVehicles).catch((e) => Alert.alert('Erro', e.message)) }, [session])
  if (!loading && (!session || profile?.role !== 'cliente')) return <Redirect href="/dashboard" />
  async function save() {
    if (!session || !marca.trim() || !modelo.trim() || !/^\d{4}$/.test(ano)) return Alert.alert('Confira os dados', 'Informe marca, modelo e ano com 4 dígitos.')
    setSaving(true); try { const vehicle = await createVehicle(session.user.id, { marca: marca.trim(), modelo: modelo.trim(), ano: Number(ano), placa: placa.trim() || null, cor: null, quilometragem: null, observacoes: null }); setVehicles((current) => [vehicle, ...current]); setMarca(''); setModelo(''); setAno(''); setPlaca('') } catch (e) { Alert.alert('Não foi possível salvar', e instanceof Error ? e.message : 'Tente novamente.') } finally { setSaving(false) }
  }
  return <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container}>
    <Text style={styles.title}>Meus veículos</Text><Text style={styles.muted}>Cadastre pelo menos um veículo para abrir uma solicitação.</Text>
    <View style={styles.form}><TextInput value={marca} onChangeText={setMarca} placeholder="Marca" placeholderTextColor="#77808C" style={styles.input}/><TextInput value={modelo} onChangeText={setModelo} placeholder="Modelo" placeholderTextColor="#77808C" style={styles.input}/><TextInput value={ano} onChangeText={setAno} placeholder="Ano" placeholderTextColor="#77808C" keyboardType="number-pad" maxLength={4} style={styles.input}/><TextInput value={placa} onChangeText={setPlaca} placeholder="Placa (opcional)" placeholderTextColor="#77808C" autoCapitalize="characters" style={styles.input}/><Pressable disabled={saving} onPress={save} style={styles.primary}><Text style={styles.primaryText}>{saving ? 'Salvando…' : 'Adicionar veículo'}</Text></Pressable></View>
    <View style={styles.list}>{vehicles.map((v) => <View key={v.id} style={styles.card}><Text style={styles.cardTitle}>{v.marca} {v.modelo}</Text><Text style={styles.muted}>{v.ano}{v.placa ? ` • ${v.placa}` : ''}</Text></View>)}</View>
  </ScrollView>
}
const styles=StyleSheet.create({container:{padding:20,gap:16,backgroundColor:'#0B0D10'},title:{fontSize:30,fontWeight:'800',color:'#FFF'},muted:{color:'#A9B0BA',lineHeight:21},form:{gap:10},input:{color:'#FFF',backgroundColor:'#15181D',borderColor:'#292F38',borderWidth:1,borderRadius:12,padding:14},primary:{backgroundColor:'#FFF',borderRadius:12,padding:14,alignItems:'center'},primaryText:{color:'#0B0D10',fontWeight:'800'},list:{gap:10},card:{backgroundColor:'#15181D',borderColor:'#292F38',borderWidth:1,borderRadius:14,padding:16,gap:5},cardTitle:{color:'#FFF',fontSize:17,fontWeight:'800'}})
