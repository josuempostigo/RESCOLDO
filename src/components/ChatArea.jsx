import Avatar from './Avatar.jsx'
import MessageBubble from './MessageBubble.jsx'
import { getParticipant } from '../data/mockChats.js'
import styles from './ChatArea.module.css'

export default function ChatArea({ chat }) {
  if (!chat) return null

  const { metadata, messages } = chat
  
  // Para grupos, el color genérico; para individuales, el del otro contacto
  const otherParticipant = metadata.participants.find(p => !p.is_me)
  const avatarColor = metadata.chat_type === 'individual'
    ? otherParticipant?.color
    : 'var(--color-accent-dark)'

  return (
    <main className={styles.chatArea}>
      <header className={styles.header}>
        <Avatar name={metadata.title} color={avatarColor} size="md" />
        <div className={styles.headerInfo}>
          <h2 className={styles.title}>{metadata.title}</h2>
          <span className={styles.subtitle}>
            {metadata.chat_type === 'group' 
              ? `${metadata.participants.length} participantes` 
              : 'Toca para info del contacto'}
          </span>
        </div>
      </header>
      
      <div className={styles.messageList}>
        {messages.map(msg => {
          const participant = getParticipant(chat, msg.participant_id)
          return (
            <MessageBubble 
              key={msg.message_id} 
              message={msg} 
              participant={participant} 
              isGroup={metadata.chat_type === 'group'} 
            />
          )
        })}
      </div>
    </main>
  )
}
