import { useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { router, Redirect } from 'expo-router'
import { useAuth } from '@/lib/auth-context'
import { createRequest, getVehicles, uploadRequestPhoto } from '@/lib/data'
import type { Vehicle } from '@/lib/types'

type Photo = { uri: string; mimeType?: string }
type Urgency = 'baixa' | 'normal' | 'alta' | 'urgente'

export default function RequestScreen() {
  const { session, profile, loading } = useAuth()
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [vehicleId, setVehicleId] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [urgency, setUrgency] = useState<Urgency>('normal')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [photos, setPhotos] = useState<Photo[]>([])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (session) getVehicles(session.user.id).then(setVehicles).catch(e => Alert.alert('Erro', e.message))
  }, [session])

  if (!loading && (!session || profile?.role !== 'cliente')) return <Redirect href="/dashboard" />

  async function pickPhotos() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (!permission.granted) return Alert.alert('Permissão necessária', 'Permita acesso às fotos para anexar imagens do veículo.')
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], allowsMultipleSelection: true, selectionLimit: 6, quality: 0.8 })
    if (!result.canceled) setPhotos(result.assets.map(a => ({ uri: a.uri, mimeType: a.mimeType })))
  }

  async function takePhoto() {
    const permission = await ImagePicker.requestCameraPermissionsAsync()
    if (!permission.granted) return Alert.alert('Permissão necessária', 'Permita acesso à câmera para fotografar o problema.')
    const result = await ImagePicker.launchCameraAsync({ mediaTypes: ['images'], quality: 0.8 })
    if (!result.canceled) setPhotos(v => [...v, { uri: result.assets[0].uri, mimeType: result.assets[0].mimeType }].slice(0, 6))
  }

  async function submit() {
    if (!session || !vehicleId || title.trim().length < 3 || description.trim().length < 10 || city.trim().length < 2 || state.trim().length !== 2) {
      return Alert.alert('Confira os dados', 'Selecione um veículo e preencha título, descrição, cidade e UF.')
    }
    setSaving(true)
    try {
      const request = await createRequest(session.user.id, {
        veiculo_id: vehicleId,
        titulo: title.trim(),
        descricao: description.trim(),
        categoria: category.trim() || null,
        urgencia: urgency,
        cidade: city.trim(),
        estado: state.trim().toUpperCase(),
      })
      for (const photo of photos) await uploadRequestPhoto(session.user.id, request.id, photo.uri, photo.mimeType || 'image/jpeg')
      Alert.alert('Solicitação enviada', 'Seu pedido e as fotos foram enviados para as oficinas.')
      router.replace('/requests')
    } catch (e) {
      Alert.alert('Não foi possível enviar', e instanceof Error ? e.message : 'Tente novamente.')
    } finally {
      setSaving(false)
    }
  }

  return <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container}>
    <Text style={styles.title}>Nova solicitação</Text>
    <Text style={styles.muted}>Conte o que seu carro precisa. Fotos ajudam a oficina a entender o problema.</Text>
    <Text style={styles.label}>Veículo</Text>
    <View style={styles.row}>{vehicles.map(v => <Pressable key={v.id} onPress={() => setVehicleId(v.id)} style={[styles.chip, vehicleId === v.id && styles.selected]}><Text style={[styles.chipText, vehicleId === v.id && styles.selectedText]}>{v.marca} {v.modelo}</Text></Pressable>)}</View>
    {vehicles.length === 0 && <Text style={styles.warning}>Cadastre um veículo antes de continuar.</Text>}
    <TextInput value={title} onChangeText={setTitle} placeholder="Título (ex.: Freio fazendo barulho)" placeholderTextColor="#77808C" style={styles.input} />
    <TextInput value={category} onChangeText={setCategory} placeholder="Categoria (opcional)" placeholderTextColor="#77808C" style={styles.input} />
    <TextInput value={description} onChangeText={setDescription} placeholder="Descreva o problema" placeholderTextColor="#77808C" multiline style={[styles.input, { minHeight: 120, textAlignVertical: 'top' }]} />
    <Text style={styles.label}>Urgência</Text>
    <View style={styles.row}>{(['baixa', 'normal', 'alta', 'urgente'] as const).map(v => <Pressable key={v} onPress={() => setUrgency(v)} style={[styles.chip, urgency === v && styles.selected]}><Text style={[styles.chipText, urgency === v && styles.selectedText]}>{v}</Text></Pressable>)}</View>
    <View style={styles.row}><TextInput value={city} onChangeText={setCity} placeholder="Cidade" placeholderTextColor="#77808C" style={[styles.input, { flex: 2 }]} /><TextInput value={state} onChangeText={setState} placeholder="UF" placeholderTextColor="#77808C" maxLength={2} autoCapitalize="characters" style={[styles.input, { flex: 1 }]} /></View>
    <View style={styles.photoBox}><Text style={styles.label}>Fotos ({photos.length}/6)</Text><View style={styles.row}><Pressable onPress={pickPhotos} style={styles.secondary}><Text style={styles.secondaryText}>Escolher fotos</Text></Pressable><Pressable onPress={takePhoto} style={styles.secondary}><Text style={styles.secondaryText}>Tirar foto</Text></Pressable></View><Text style={styles.muted}>JPEG, PNG ou WebP. Máximo recomendado: 6 imagens.</Text></View>
    <Pressable disabled={saving || vehicles.length === 0} onPress={submit} style={styles.primary}><Text style={styles.primaryText}>{saving ? 'Enviando…' : 'Enviar solicitação'}</Text></Pressable>
  </ScrollView>
}

const styles = StyleSheet.create({ container: { padding: 20, gap: 12, backgroundColor: '#0B0D10' }, title: { color: '#FFF', fontSize: 30, fontWeight: '800' }, muted: { color: '#A9B0BA', lineHeight: 21, marginBottom: 8 }, label: { color: '#FFF', fontWeight: '800', marginTop: 4 }, row: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' }, chip: { borderWidth: 1, borderColor: '#303743', borderRadius: 999, paddingHorizontal: 13, paddingVertical: 10 }, selected: { backgroundColor: '#FFF', borderColor: '#FFF' }, chipText: { color: '#A9B0BA', fontWeight: '700' }, selectedText: { color: '#0B0D10' }, input: { color: '#FFF', backgroundColor: '#15181D', borderColor: '#292F38', borderWidth: 1, borderRadius: 12, padding: 14 }, photoBox: { backgroundColor: '#15181D', borderWidth: 1, borderColor: '#292F38', borderRadius: 14, padding: 14, gap: 8 }, secondary: { borderColor: '#3A424D', borderWidth: 1, borderRadius: 10, paddingHorizontal: 13, paddingVertical: 10 }, secondaryText: { color: '#FFF', fontWeight: '700' }, primary: { backgroundColor: '#FFF', borderRadius: 12, padding: 15, alignItems: 'center', marginTop: 6 }, primaryText: { color: '#0B0D10', fontWeight: '800' }, warning: { color: '#F2C46D' } })
