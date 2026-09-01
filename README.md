# ORCAAUTO

Aplicativo mobile Expo/React Native para conectar clientes e oficinas automotivas.

## Stack

- Expo SDK 57 + Expo Router
- React Native + TypeScript
- Supabase Auth, Postgres, Storage e Realtime
- GitHub para versionamento
- EAS para builds e distribuição

## Supabase

Project ref: `pfjenyygroyikdenjhbd`

Configure localmente:

```bash
copy .env.example .env
```

Preencha `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY` com a chave publishable do projeto. Nunca commite `.env`.

## Desenvolvimento

```bash
npm install
npx expo start
```

Teste primeiro com Expo Go. Depois que os fluxos principais estiverem validados, configure o build EAS de produção.

## Arquitetura inicial

```text
src/
  app/                 # rotas Expo Router
  lib/                 # integrações externas
```

O banco já possui os principais domínios do produto: perfis, oficinas, veículos, solicitações, fotos, orçamentos, serviços, mensagens, avaliações e assinaturas.

## Próximas etapas técnicas

1. Sincronizar as migrations existentes do Supabase com este repositório.
2. Completar autenticação e sessão.
3. Implementar os fluxos cliente e oficina sobre o schema existente.
4. Implementar fotos/Storage e mensagens/Realtime.
5. Criar testes de integração para o fluxo solicitação → orçamento → aceite → serviço → avaliação.
6. Configurar EAS e testar APK em aparelho físico.
