# ORCAAUTO

Aplicativo mobile Expo/React Native para conectar clientes e oficinas automotivas.

## Stack

- Expo SDK 57 + React Native 0.86.3 + Expo Router
- React Native + TypeScript
- Supabase Auth, Postgres, Storage e Realtime
- GitHub para versionamento
- EAS para builds e distribuição

## Fluxos implementados

- autenticação e perfis cliente/oficina
- dashboard por perfil
- cadastro de veículos
- solicitação de serviço
- fotos da solicitação via câmera/galeria e Supabase Storage
- consulta de oficinas
- orçamentos e aceite/recusa
- criação automática de serviço após aceite
- acompanhamento de status do serviço
- chat em tempo real
- CI de TypeScript
- perfil EAS para APK de preview

## Supabase

Project ref: `pfjenyygroyikdenjhbd`

Configure localmente com `.env` e use somente a chave publishable do projeto. Nunca commite segredos.

## Desenvolvimento

```bash
npm install
npx expo start
```

## Build Android

O `eas.json` possui o perfil `preview` configurado para gerar APK interno. O build ainda exige a autenticação da conta Expo e o vínculo final do projeto EAS.

## Próximas etapas

1. validar os fluxos em aparelho físico
2. configurar credenciais EAS/build
3. executar testes de integração ponta a ponta
4. revisar notificações, pagamentos/assinaturas e publicação nas lojas
