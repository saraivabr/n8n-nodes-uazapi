# n8n-nodes-uazapi

Community nodes for n8n that integrate the [uazapiGO V2](https://docs.uazapi.com/) WhatsApp API.

This package ships **two nodes**:

- **Uazapi** — action node (declarative) covering all 12 uazapi resources: instance, message, chat, contact, group, label, profile, business, sender, CRM, chatbot, admin.
- **Uazapi Trigger** — trigger node with two modes: **Webhook** (auto-registers the webhook on your uazapi instance) and **SSE** (long-lived event stream).

## Installation

### As a community node (n8n ≥ 1.0)

1. In n8n, open **Settings → Community Nodes → Install**.
2. Enter `n8n-nodes-uazapi` and confirm.
3. Restart n8n if prompted.

### Local development / self-hosted

```bash
cd /path/to/n8n-nodes-uazapi
npm install
npm run build
npm pack
# In your n8n custom folder (default ~/.n8n/custom):
cd ~/.n8n/custom
npm init -y  # if needed
npm install /absolute/path/to/n8n-nodes-uazapi-X.Y.Z.tgz
# Restart n8n
```

Or use the bundled dev workflow:

```bash
npm install
npm run dev   # starts n8n with this package loaded + hot reload
```

## Credentials

Create a **uazapi API** credential with:

| Field | Required | Description |
|---|---|---|
| Base URL | yes | `https://saraivaai.uazapi.com` (no trailing slash) |
| Instance Token | yes | Sent in the `token` header. Used for all per-instance operations. |
| Admin Token | only for Admin resource | Sent in the `admintoken` header. The Admin resource overrides the default header. |

The "Test" button hits `GET /instance/status`.

## Uazapi (action) — usage by resource

### Instance
Connect / disconnect / status / update name / delete / privacy (get & set) / presence / proxy (get, set, delete).

### Message (most-used)
Send: text, media (image/video/document/audio/myaudio/ptt/ptv/sticker), contact, location, menu (button/list/poll/carousel), carousel, location-request, payment-request, pix-button, status, presence-in-chat.
Manage: react, edit, delete, mark-as-read, find, download (with optional transcription).

All `send/*` operations expose an **Additional Fields** collection with `delay`, `readchat`, `readmessages`, `replyid`, `mentions` (array → CSV), `forward`, `track_source`, `track_id`, `async`.

```text
Resource: Message
Operation: Send Text
Number: 5511999999999
Text: Olá!
Additional Fields → Delay (Ms): 1500
```

### Chat
find / details / archive / read / mute / pin / delete / block / list-blocked / check-on-whatsapp / manage-labels.

### Contact
listAll (`GET /contacts`) / listPaginated (`POST /contacts/list`) / add / remove.

### Group
create / info / inviteInfo / join / leave / list / resetInviteCode / updateAnnounce / updateDescription / updateImage / updateLocked / updateName / manageParticipants (add/remove/promote/demote/approve/reject).

### Label
list / edit (create, rename, recolor, or delete a label).

### Profile
updateName / updateImage.

### Business
getProfile / getCategories / updateProfile / listCatalog / getProduct / deleteProduct / showProduct / hideProduct.

### Sender (mass send)
simple / advanced / control (stop|continue|delete folder) / clearDone / clearAll / listFolders / listMessages.

### CRM
updateFieldsMap (custom field mapping) / editLead (per-chat lead fields including status, value, tags, lead_field01..N).

### Chatbot
updateSettings + CRUD for trigger / agent / knowledge / function / quickReply.

### Admin (needs Admin Token)
createInstance / listInstances / updateInstance / getGlobalWebhook / setGlobalWebhook.
All Admin operations automatically swap the `token` header for `admintoken`.

## Uazapi Trigger

### Webhook mode (recommended)

1. Add the trigger to a workflow.
2. Pick **Mode = Webhook**, choose event types.
3. Activate the workflow — the trigger registers the webhook on your uazapi instance pointing at the n8n production webhook URL.
4. On workflow deactivation the webhook is removed.

`Exclude Messages` defaults to `['wasSentByApi']` to prevent the workflow from re-triggering on its own outbound messages.

### SSE mode

1. Pick **Mode = SSE**, choose event types.
2. The trigger opens a long-lived HTTP stream against `${baseUrl}/sse?token=…&events=…` and emits each event.
3. Reconnects with exponential backoff (5s → 60s).

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | n8n with hot reload |
| `npm run build` | TypeScript build into `dist/` |
| `npm run lint` | n8n-nodes-base lint |
| `npm run lint:fix` | Auto-fix lint issues |
| `npm run release` | Tag + publish workflow |

## License

[MIT](LICENSE.md)
