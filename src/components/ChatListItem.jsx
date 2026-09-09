/**
 * ChatListItem.jsx
 *
 * Ítem de la lista de chats — el "renglón" que se ve en la barra
 * lateral izquierda con: avatar, nombre, preview del último mensaje
 * (con ícono según tipo), hora y un indicador de "no visto".
 *
 * Props:
 *   chat       — objeto chat completo (esquema sección 4.2)
 *   isActive   — bool: si este chat está abierto en este momento
 *   onClick    — función: al hacer clic en el ítem
 */

import Avatar from './Avatar.jsx'
import { getParticipant, getLastMessage, formatTime, MESSAGE_TYPE_PREVIEW } from '../data/mockChats.js'
import styles from './ChatListItem.module.css'

function buildPreview(chat, lastMsg) {
  if (!lastMsg) return ''
  const typeLabel = MESSAGE_TYPE_PREVIEW[lastMsg.type]
  if (typeLabel) {
    // Si hay texto de caption junto al media, lo mostramos también
    return lastMsg.text ? `${typeLabel} — ${lastMsg.text}` : typeLabel
  }
  return lastMsg.text ?? ''
}

export default function ChatListItem({ chat, isActive = false, onClick }) {
  const { metadata } = chat
  const lastMsg = getLastMessage(chat)
  const preview = buildPreview(chat, lastMsg)
  const time = lastMsg ? formatTime(lastMsg.timestamp_iso) : ''

  // Para chats individuales, el avatar/color es el del otro participante
  // Para grupos, usamos el color de acento genérico (foto de grupo no existe en exports)
  const otherParticipant = metadata.participants.find(p => !p.is_me)
  const avatarColor = metadata.chat_type === 'individual'
    ? otherParticipant?.color
    : 'var(--color-accent-dark)'

  // En chats grupales el preview incluye el nombre del remitente
  let fullPreview = preview
  if (metadata.chat_type === 'group' && lastMsg?.participant_id) {
    const sender = getParticipant(chat, lastMsg.participant_id)
    if (sender && !sender.is_me) {
      fullPreview = `${sender.display_name}: ${preview}`
    }
  }

  return (
    <button
      className={`${styles.item} ${isActive ? styles.active : ''}`}
      onClick={onClick}
      aria-label={`Chat con ${metadata.title}`}
      aria-current={isActive ? 'true' : undefined}
    >
      <Avatar
        name={metadata.title}
        color={avatarColor}
        size="md"
      />
      <div className={styles.content}>
        <div className={styles.topRow}>
          <span className={styles.name}>{metadata.title}</span>
          <span className={styles.time}>{time}</span>
        </div>
        <div className={styles.bottomRow}>
          <span className={styles.preview}>{fullPreview}</span>
        </div>
      </div>
    </button>
  )
}
