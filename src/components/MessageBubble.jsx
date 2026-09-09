import { formatTime } from '../data/mockChats.js'
import AudioPlayer from './AudioPlayer.jsx'
import styles from './MessageBubble.module.css'

export default function MessageBubble({ message, participant, isGroup, repliedMessage, repliedSender }) {
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
          <div className={styles.senderName} style={{ color: participant.color }}>{participant.display_name}</div>
        )}

        {/* Reply Context - Ya no muestra IDs crudos */}
        {repliedMessage && (
          <div className={styles.replyPlaceholder}>
            <div className={styles.replySender} style={{ color: repliedSender?.color || 'var(--color-accent-dark)' }}>
              {repliedSender?.display_name || 'Alguien'}
            </div>
            <div className={styles.replyText}>
              {repliedMessage.text || `[${repliedMessage.type.toUpperCase()}]`}
            </div>
          </div>
        )}

        {message.type === 'audio' && message.media_ref && (
          <AudioPlayer durationSec={message.media_ref.duration_sec} />
        )}
        
        {message.type !== 'audio' && message.media_ref && (
          <div className={styles.mediaPlaceholder}>[{message.type.toUpperCase()}] {message.media_ref.ref}</div>
        )}

        {message.text && <div className={styles.text}>{message.text}</div>}
        {message.type === 'deleted' && <div className={styles.deletedText}>🚫 {message.text}</div>}

        <div className={styles.metadata}>
          <span className={styles.time}>{time}</span>
        </div>
      </div>
    </div>
  )
}
