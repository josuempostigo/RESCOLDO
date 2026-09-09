/**
 * mockChats.js — Datos de prueba para Fase 1
 *
 * Estos datos siguen exactamente el esquema de la sección 4.2 de la
 * especificación técnica. En Fase 4 serán reemplazados por datos reales
 * importados desde un export de WhatsApp.
 *
 * Hay dos chats de prueba:
 *   - "Chat con Papá": individual, con todos los tipos de mensaje
 *   - "Familia 🏠": grupal, con múltiples remitentes y colores distintos
 */

export const MOCK_CHATS = [
  {
    chat_id: 'wa_mock_001',
    profile_id: 'local_default',
    metadata: {
      title: 'Chat con Papá',
      chat_type: 'individual',
      imported_at: '2026-09-06T10:00:00',
      total_messages: 12,
      participants: [
        {
          participant_id: 'p_me',
          display_name: 'Vos',
          is_me: true,
          avatar_ref: null,
          color: null,
        },
        {
          participant_id: 'p_papa',
          display_name: 'Papá',
          is_me: false,
          avatar_ref: null,
          color: '#F4A259',
        },
      ],
    },
    messages: [
      {
        message_id: 'msg_001',
        timestamp_raw: '05/09/26, 09:00',
        timestamp_iso: '2026-09-05T09:00:00',
        participant_id: 'p_papa',
        type: 'text',
        text: '¿Cómo estás?',
        media_ref: null,
        reply_to: null,
        forwarded: false,
        edited: false,
        system_event_type: null,
      },
      {
        message_id: 'msg_002',
        timestamp_raw: '05/09/26, 09:02',
        timestamp_iso: '2026-09-05T09:02:00',
        participant_id: 'p_me',
        type: 'text',
        text: 'Bien, acá trabajando. ¿Y vos?',
        media_ref: null,
        reply_to: null,
        forwarded: false,
        edited: false,
        system_event_type: null,
      },
      {
        message_id: 'msg_003',
        timestamp_raw: '05/09/26, 09:05',
        timestamp_iso: '2026-09-05T09:05:00',
        participant_id: 'p_papa',
        type: 'text',
        text: 'Todo bien. Mirá lo que encontré en el garaje',
        media_ref: null,
        reply_to: null,
        forwarded: false,
        edited: false,
        system_event_type: null,
      },
      {
        message_id: 'msg_004',
        timestamp_raw: '05/09/26, 09:06',
        timestamp_iso: '2026-09-05T09:06:00',
        participant_id: 'p_papa',
        type: 'image',
        text: null,
        media_ref: { adapter: 'mock', ref: 'IMG-20260905-WA0001.jpg' },
        reply_to: null,
        forwarded: false,
        edited: false,
        system_event_type: null,
      },
      {
        message_id: 'msg_005',
        timestamp_raw: '05/09/26, 09:10',
        timestamp_iso: '2026-09-05T09:10:00',
        participant_id: 'p_me',
        type: 'text',
        text: '¡Qué bueno! ¿Dónde estaba guardado?',
        media_ref: null,
        reply_to: 'msg_004',
        forwarded: false,
        edited: false,
        system_event_type: null,
      },
      {
        message_id: 'msg_006',
        timestamp_raw: '05/09/26, 14:00',
        timestamp_iso: '2026-09-05T14:00:00',
        participant_id: 'p_papa',
        type: 'audio',
        text: null,
        media_ref: { adapter: 'mock', ref: 'AUD-20260905-WA0001.opus', duration_sec: 47 },
        reply_to: null,
        forwarded: false,
        edited: false,
        system_event_type: null,
      },
      {
        message_id: 'msg_007',
        timestamp_raw: '05/09/26, 14:15',
        timestamp_iso: '2026-09-05T14:15:00',
        participant_id: 'p_me',
        type: 'text',
        text: 'Jaja no puedo escuchar ahora. Te escribo después',
        media_ref: null,
        reply_to: null,
        forwarded: false,
        edited: false,
        system_event_type: null,
      },
      {
        message_id: 'msg_008',
        timestamp_raw: '05/09/26, 14:16',
        timestamp_iso: '2026-09-05T14:16:00',
        participant_id: 'p_papa',
        type: 'sticker',
        text: null,
        media_ref: { adapter: 'mock', ref: 'STK-20260905-WA0001.webp' },
        reply_to: null,
        forwarded: false,
        edited: false,
        system_event_type: null,
      },
      {
        message_id: 'msg_009',
        timestamp_raw: '05/09/26, 18:30',
        timestamp_iso: '2026-09-05T18:30:00',
        participant_id: null,
        type: 'system_event',
        text: 'Los mensajes y las llamadas están cifrados de extremo a extremo.',
        media_ref: null,
        reply_to: null,
        forwarded: false,
        edited: false,
        system_event_type: 'encryption_notice',
      },
      {
        message_id: 'msg_010',
        timestamp_raw: '05/09/26, 20:00',
        timestamp_iso: '2026-09-05T20:00:00',
        participant_id: 'p_papa',
        type: 'deleted',
        text: 'Se eliminó este mensaje.',
        media_ref: null,
        reply_to: null,
        forwarded: false,
        edited: false,
        system_event_type: null,
      },
      {
        message_id: 'msg_011',
        timestamp_raw: '05/09/26, 20:05',
        timestamp_iso: '2026-09-05T20:05:00',
        participant_id: 'p_me',
        type: 'text',
        text: '¿Me llamás cuando puedas?',
        media_ref: null,
        reply_to: null,
        forwarded: false,
        edited: true,
        system_event_type: null,
      },
      {
        message_id: 'msg_012',
        timestamp_raw: '05/09/26, 20:10',
        timestamp_iso: '2026-09-05T20:10:00',
        participant_id: 'p_papa',
        type: 'text',
        text: 'Sí, ahora te llamo 🙂',
        media_ref: null,
        reply_to: null,
        forwarded: false,
        edited: false,
        system_event_type: null,
      },
    ],
  },
  {
    chat_id: 'wa_mock_002',
    profile_id: 'local_default',
    metadata: {
      title: 'Familia 🏠',
      chat_type: 'group',
      imported_at: '2026-09-06T10:05:00',
      total_messages: 6,
      participants: [
        {
          participant_id: 'p_me',
          display_name: 'Vos',
          is_me: true,
          avatar_ref: null,
          color: null,
        },
        {
          participant_id: 'p_mama',
          display_name: 'Mamá',
          is_me: false,
          avatar_ref: null,
          color: '#7BC8F6',
        },
        {
          participant_id: 'p_hermana',
          display_name: 'Caro',
          is_me: false,
          avatar_ref: null,
          color: '#A8D8A8',
        },
      ],
    },
    messages: [
      {
        message_id: 'grp_001',
        timestamp_raw: '06/09/26, 08:00',
        timestamp_iso: '2026-09-06T08:00:00',
        participant_id: 'p_mama',
        type: 'text',
        text: 'Buenos días a todos ☀️',
        media_ref: null,
        reply_to: null,
        forwarded: false,
        edited: false,
        system_event_type: null,
      },
      {
        message_id: 'grp_002',
        timestamp_raw: '06/09/26, 08:02',
        timestamp_iso: '2026-09-06T08:02:00',
        participant_id: 'p_hermana',
        type: 'text',
        text: 'Buen día mami ❤️',
        media_ref: null,
        reply_to: null,
        forwarded: false,
        edited: false,
        system_event_type: null,
      },
      {
        message_id: 'grp_003',
        timestamp_raw: '06/09/26, 08:10',
        timestamp_iso: '2026-09-06T08:10:00',
        participant_id: 'p_me',
        type: 'text',
        text: 'Buenos 🙌',
        media_ref: null,
        reply_to: null,
        forwarded: false,
        edited: false,
        system_event_type: null,
      },
      {
        message_id: 'grp_004',
        timestamp_raw: '06/09/26, 10:30',
        timestamp_iso: '2026-09-06T10:30:00',
        participant_id: 'p_mama',
        type: 'image',
        text: 'Cómo quedó el jardín',
        media_ref: { adapter: 'mock', ref: 'IMG-20260906-WA0001.jpg' },
        reply_to: null,
        forwarded: false,
        edited: false,
        system_event_type: null,
      },
      {
        message_id: 'grp_005',
        timestamp_raw: '06/09/26, 10:35',
        timestamp_iso: '2026-09-06T10:35:00',
        participant_id: 'p_hermana',
        type: 'text',
        text: 'Qué lindo! 😍',
        media_ref: null,
        reply_to: 'grp_004',
        forwarded: false,
        edited: false,
        system_event_type: null,
      },
      {
        message_id: 'grp_006',
        timestamp_raw: '06/09/26, 10:36',
        timestamp_iso: '2026-09-06T10:36:00',
        participant_id: null,
        type: 'system_event',
        text: 'Caro cambió el ícono del grupo.',
        media_ref: null,
        reply_to: null,
        forwarded: false,
        edited: false,
        system_event_type: 'group_icon_changed',
      },
    ],
  },
]

/** Devuelve el participante "yo" de un chat */
export function getMe(chat) {
  return chat.metadata.participants.find(p => p.is_me)
}

/** Devuelve un participante por su ID */
export function getParticipant(chat, participantId) {
  return chat.metadata.participants.find(p => p.participant_id === participantId)
}

/** Devuelve el último mensaje no-sistema de un chat (para el preview) */
export function getLastMessage(chat) {
  const msgs = [...chat.messages].reverse()
  return msgs.find(m => m.type !== 'system_event') ?? msgs[0]
}

/** Formatea una hora ISO a "HH:MM" */
export function formatTime(isoString) {
  const d = new Date(isoString)
  return d.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false })
}

/** Texto de preview según tipo de mensaje */
export const MESSAGE_TYPE_PREVIEW = {
  image: '📷 Foto',
  video: '🎥 Video',
  gif: '🎞 GIF',
  audio: '🎤 Audio',
  sticker: '😄 Sticker',
  document: '📎 Documento',
  location: '📍 Ubicación',
  contact_card: '👤 Contacto',
  deleted: '⊘ Mensaje eliminado',
  unsupported: '⚠ Mensaje no compatible',
}
