/**
 * MessageBubble.jsx
 *
 * Componente que renderiza un mensaje individual en la conversación.
 * Maneja los diferentes tipos de mensajes (texto, media, sistema).
 */

import { formatTime } from '../data/mockChats.js'
import styles from './MessageBubble.module.css'

export default function MessageBubble({ message, participant, isGroup }) {
  const isMe = participant?.is_me
  const isSystem = message.type === 'system_event'

  if (isSystem) {
    return (
      <div className={styles.systemWrapper}>
        <span className={styles.systemEvent}>{message.text}</span>
      </div>
    )
  }

  const time = formatTime(message.timestamp_iso)
  const showSenderName = isGroup && !isMe && participant

  return (
    <div className={`${styles.wrapper} ${isMe ? styles.mine : styles.other}`}>
      <div className={styles.bubble}>
        {showSenderName && (
          <div className={styles.senderName} style={{ color: participant.color }}>
            {participant.display_name}
          </div>
        )}

        {message.reply_to && (
          <div className={styles.replyPlaceholder}>
            Respuesta a: {message.reply_to}
          </div>
        )}

        {/* Placeholder para contenido multimedia */}
        {message.media_ref && (
          <div className={styles.mediaPlaceholder}>
            [{message.type.toUpperCase()}] {message.media_ref.ref}
          </div>
        )}

        {message.text && <div className={styles.text}>{message.text}</div>}
        
        {message.type === 'deleted' && (
          <div className={styles.deletedText}>
            🚫 {message.text}
          </div>
        )}

        <div className={styles.metadata}>
          <span className={styles.time}>{time}</span>
          {/* Aquí iría el doble check si fuera necesario, pero en exports de WP no siempre es exacto */}
        </div>
      </div>
    </div>
  )
}
