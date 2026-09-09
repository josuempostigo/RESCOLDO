/**
 * ChatListItem.jsx
 * Se agrega el evento onAvatarClick para poder abrir la foto.
 */
import Avatar from './Avatar.jsx'
import { getParticipant, getLastMessage, formatTime, MESSAGE_TYPE_PREVIEW } from '../data/mockChats.js'
import styles from './ChatListItem.module.css'

function buildPreview(chat, lastMsg) {
  if (!lastMsg) return ''
  const typeLabel = MESSAGE_TYPE_PREVIEW[lastMsg.type]
  if (typeLabel) return lastMsg.text ? `${typeLabel} — ${lastMsg.text}` : typeLabel
  return lastMsg.text ?? ''
}

export default function ChatListItem({ chat, isActive = false, onClick, onAvatarClick }) {
  const { metadata } = chat
  const lastMsg = getLastMessage(chat)
  const preview = buildPreview(chat, lastMsg)
  const time = lastMsg ? formatTime(lastMsg.timestamp_iso) : ''

  const otherParticipant = metadata.participants.find(p => !p.is_me)
  const avatarColor = metadata.chat_type === 'individual'
    ? otherParticipant?.color
    : 'var(--color-accent-dark)'

  let fullPreview = preview
  if (metadata.chat_type === 'group' && lastMsg?.participant_id) {
    const sender = getParticipant(chat, lastMsg.participant_id)
    if (sender && !sender.is_me) {
      fullPreview = `${sender.display_name}: ${preview}`
    }
  }

  return (
    <div className={`${styles.item} ${isActive ? styles.active : ''}`}>
      <div 
        className={styles.avatarWrapper} 
        onClick={(e) => { e.stopPropagation(); onAvatarClick && onAvatarClick(); }}
      >
        <Avatar name={metadata.title} color={avatarColor} size="md" />
      </div>
      <div className={styles.content} onClick={onClick}>
        <div className={styles.topRow}>
          <span className={styles.name}>{metadata.title}</span>
          <span className={styles.time}>{time}</span>
        </div>
        <div className={styles.bottomRow}>
          <span className={styles.preview}>{fullPreview}</span>
        </div>
      </div>
    </div>
  )
}
