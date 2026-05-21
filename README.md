<div align="center">

# @saraivadev/n8n-nodes-uazapi

**WhatsApp para n8n via [uazapiGO V2](https://docs.uazapi.com/) — completo, opinativo, sem amarras.**

[![npm version](https://img.shields.io/npm/v/@saraivadev/n8n-nodes-uazapi?color=25D366&label=npm)](https://www.npmjs.com/package/@saraivadev/n8n-nodes-uazapi)
[![npm downloads](https://img.shields.io/npm/dm/@saraivadev/n8n-nodes-uazapi?color=25D366)](https://www.npmjs.com/package/@saraivadev/n8n-nodes-uazapi)
[![license](https://img.shields.io/npm/l/@saraivadev/n8n-nodes-uazapi?color=25D366)](LICENSE.md)
[![n8n community node](https://img.shields.io/badge/n8n-community%20node-EA4B71)](https://www.npmjs.com/search?q=keywords:n8n-community-node-package)

</div>

---

## ✨ Por que esse pacote

A maioria dos nodes WhatsApp pra n8n cobre 4 ou 5 endpoints e te deixa na mão quando você quer fazer algo sério — enviar carrossel, gerenciar grupos, disparar campanhas em massa, plugar agentes de IA, registrar webhook automaticamente. Esse aqui cobre **toda a superfície da uazapiGO V2** em dois nodes únicos:

- 🟢 **Uazapi** — node de ação declarativo cobrindo **12 resources e 93 operations** (enviar texto, mídia, menus, pix, gerenciar chats, grupos, contatos, labels, perfil business, catálogos, disparos em massa, CRM, chatbot, instâncias admin)
- 🟣 **Uazapi Trigger** — node de gatilho com **dois modos**:
  - **Webhook** — registra automaticamente o webhook na sua instância uazapi quando o workflow ativa, e remove ao desativar
  - **SSE** — conexão long-lived com reconexão exponencial, sem precisar expor URL pública

---

## 🚀 Instalação

### Via n8n Community Nodes (recomendado)

1. Abra o n8n
2. **Settings → Community Nodes → Install**
3. Cole `@saraivadev/n8n-nodes-uazapi` e confirme
4. Reinicie se solicitado

### Via CLI (self-hosted)

```bash
cd ~/.n8n/custom        # ou onde sua instância carrega custom nodes
npm install @saraivadev/n8n-nodes-uazapi
# reinicie o n8n
```

### Docker

Adicione ao `docker-compose.yml`:

```yaml
environment:
  - N8N_COMMUNITY_PACKAGES=@saraivadev/n8n-nodes-uazapi
```

---

## 🔑 Credentials

Crie uma credencial **Uazapi API** com 3 campos:

| Campo | Obrigatório | Descrição |
|---|:---:|---|
| **Base URL** | ✅ | Ex: `https://saraivaai.uazapi.com` (sem barra no fim) |
| **Instance Token** | ✅ | Token da instância — header `token` |
| **Admin Token** | ⚪ | Token administrativo — header `admintoken`. Só é usado pelo resource Admin (override automático). |

O botão "Test" bate em `GET /instance/status` pra validar.

---

## 📦 Resources & Operations

<details open>
<summary><b>📱 Message</b> — 17 operations</summary>

| Operation | Endpoint | Descrição |
|---|---|---|
| Send Text | `POST /send/text` | Texto simples com link preview opcional |
| Send Media | `POST /send/media` | image / video / document / audio / myaudio / ptt / ptv / sticker |
| Send Contact | `POST /send/contact` | vCard contact |
| Send Location | `POST /send/location` | Lat/long com nome e endereço |
| Send Menu | `POST /send/menu` | button / list / poll / carousel |
| Send Carousel | `POST /send/carousel` | Carrossel multi-card |
| Send Location Request | `POST /send/location-button` | Botão pedindo localização |
| Send Payment Request | `POST /send/request-payment` | PIX, boleto, link de pagamento |
| Send PIX Button | `POST /send/pix-button` | Botão de PIX rápido |
| Send Status | `POST /send/status` | Stories (text / image / video / audio) |
| Send Presence In Chat | `POST /message/presence` | composing / recording / paused |
| React | `POST /message/react` | Emoji em mensagem |
| Edit | `POST /message/edit` | Edita texto de mensagem enviada |
| Delete | `POST /message/delete` | Apaga mensagem |
| Mark As Read | `POST /message/markread` | Marca múltiplas como lidas |
| Find | `POST /message/find` | Busca por filtros |
| Download Media | `POST /message/download` | Download + transcrição opcional via OpenAI |

Toda operação `send/*` expõe uma collection **Additional Fields** com `delay`, `readchat`, `readmessages`, `replyid`, `mentions` (array → CSV), `forward`, `track_source`, `track_id`, `async`.

</details>

<details>
<summary><b>🔌 Instance</b> — 11 operations</summary>

connect · disconnect · status · updateName · delete · getPrivacy · setPrivacy · updatePresence · getProxy · setProxy · deleteProxy

</details>

<details>
<summary><b>💬 Chat</b> — 11 operations</summary>

find · details · archive · read · mute · pin · delete · block · listBlocked · checkOnWhatsApp · manageLabels

</details>

<details>
<summary><b>👥 Contact</b> — 4 operations</summary>

listAll · listPaginated · add · remove

</details>

<details>
<summary><b>👨‍👩‍👧‍👦 Group</b> — 13 operations</summary>

create · info · inviteInfo · join · leave · list · resetInviteCode · updateAnnounce · updateDescription · updateImage · updateLocked · updateName · manageParticipants (add/remove/promote/demote/approve/reject)

</details>

<details>
<summary><b>🏷️ Label</b> — 2 operations</summary>

list · edit (criar, renomear, recolorir ou deletar label)

</details>

<details>
<summary><b>🧑 Profile</b> — 2 operations</summary>

updateName · updateImage

</details>

<details>
<summary><b>🏢 Business</b> — 8 operations</summary>

getProfile · getCategories · updateProfile · listCatalog · getProduct · deleteProduct · showProduct · hideProduct

</details>

<details>
<summary><b>📢 Sender (disparo em massa)</b> — 7 operations</summary>

| Operation | Para que serve |
|---|---|
| Simple | Disparo simples com lista de números e mensagem única |
| Advanced | Disparo avançado com array de mensagens customizadas |
| Control | Stop / continue / delete de uma folder de campanha |
| Clear Done | Limpa campanhas finalizadas |
| Clear All | Limpa todas as campanhas |
| List Folders | Lista folders por status |
| List Messages | Lista mensagens de uma folder |

</details>

<details>
<summary><b>📈 CRM</b> — 2 operations</summary>

updateFieldsMap · editLead (lead_status, lead_value, lead_tags, lead_field01..lead_field20)

</details>

<details>
<summary><b>🤖 Chatbot</b> — 11 operations</summary>

updateSettings + CRUD para **trigger / agent / knowledge / function / quickReply** (cada um com Edit + List)

</details>

<details>
<summary><b>👑 Admin</b> — 5 operations (requer Admin Token)</summary>

createInstance · listInstances · updateInstance · getGlobalWebhook · setGlobalWebhook

> 🛡️ Todas as operações Admin sobrescrevem automaticamente o header `token` por `admintoken`. Você não precisa fazer nada além de preencher o Admin Token na credencial.

</details>

---

## 🎯 Exemplos rápidos

### Enviar texto simples

```text
Resource: Message
Operation: Send Text
Number: 5511999999999
Text: Olá, tudo bem?
```

### Enviar imagem com legenda e delay

```text
Resource: Message
Operation: Send Media
Number: 5511999999999
Media Type: Image
File: https://exemplo.com/foto.jpg
Text: Olha essa foto
▾ Additional Fields
  Delay (Ms): 2000
  Read Chat: true
```

### Disparo em massa com agendamento

```text
Resource: Sender
Operation: Simple
Numbers: [5511...A, 5511...B, 5511...C]
Type: text
Delay Min: 3 / Delay Max: 7
Scheduled For: 1737240000   # unix timestamp
▾ Message Fields
  Text: Promoção exclusiva esta semana!
  Info: campanha-jan2026
```

### Gatilho de mensagens recebidas (sem loop)

```text
Trigger: Uazapi Trigger
Mode: Webhook
Events: [messages]
Exclude Messages: [wasSentByApi]    ← previne loop com seu próprio envio
```

---

## 📡 Uazapi Trigger em detalhe

### 🔵 Webhook Mode

1. Adicione o **Uazapi Trigger** ao workflow
2. Selecione **Mode = Webhook** e os events desejados
3. **Ative o workflow** — o trigger faz um `POST /webhook` na sua instância uazapi registrando a URL de produção do n8n
4. Ao desativar, o webhook é removido automaticamente

> `Exclude Messages` vem com `wasSentByApi` por padrão — **mantenha** se o mesmo workflow também envia mensagens, senão você cria um loop infinito.

### 🟢 SSE Mode

1. Selecione **Mode = SSE** e os events
2. O node abre uma conexão persistente em `${baseUrl}/sse?token=…&events=…`
3. Reconexão com backoff exponencial: 5s → 10s → 20s → 40s → 60s
4. Cada evento vira um item no output

Use SSE quando sua instância n8n não tem URL pública (atrás de NAT, em dev local).

---

## 🛠️ Scripts (dev)

```bash
npm install
npm run dev          # n8n com hot reload
npm run build        # compila TypeScript pra dist/
npm run lint         # n8n-nodes-base lint
npm run lint:fix     # auto-fix
```

---

## 🤝 Contribuindo

PRs bem-vindos! Antes de abrir:

1. `npm run lint` deve passar com zero erros
2. `npm run build` deve compilar limpo
3. Mantenha **descriptions** alfabetizadas (regra do `eslint-plugin-n8n-nodes-base`)
4. Endpoints novos vão num arquivo `*Description.ts` próprio em `nodes/Uazapi/descriptions/`
5. Para o resource **Admin**, todo `routing.request` precisa de `headers: { admintoken: '={{$credentials.adminToken}}' }`

---

## 📜 Licença

[MIT](LICENSE.md) © Saraiva.ai

---

## 🔗 Links

- 📦 [npm](https://www.npmjs.com/package/@saraivadev/n8n-nodes-uazapi)
- 🐙 [GitHub](https://github.com/saraivabr/n8n-nodes-uazapi)
- 📖 [uazapi docs](https://docs.uazapi.com/)
- 🌐 [n8n](https://n8n.io)

<div align="center">

Feito com 🟢 para a comunidade brasileira de n8n.

</div>
