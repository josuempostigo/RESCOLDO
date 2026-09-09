import Avatar from './Avatar.jsx'
import MessageBubble from './MessageBubble.jsx'
import { getParticipant } from '../data/mockChats.js'
import styles from './ChatArea.module.css'

export default function ChatArea({ chat, onViewMedia, onShowInfo, avatarOverrides }) {
  if (!chat) return null
  const { metadata, messages } = chat
  
  const otherParticipant = metadata.participants.find(p => !p.is_me)
  const avatarColor = metadata.chat_type === 'individual' ? otherParticipant?.color : 'var(--color-accent-dark)'

  return (
    <main className={styles.chatArea}>
      <header className={styles.header} onClick={onShowInfo}>
        <div onClick={(e) => { e.stopPropagation(); onViewMedia({ name: metadata.title, color: avatarColor, url: avatarOverrides[metadata.title] }); }}>
          <Avatar name={metadata.title} color={avatarColor} size="md" customUrl={avatarOverrides[metadata.title]} />
        </div>
        <div className={styles.headerInfo}>
          <h2 className={styles.title}>{metadata.title}</h2>
          <span className={styles.subtitle}>
            {metadata.chat_type === 'group' ? `${metadata.participants.length} participantes` : 'Toca para info del contacto'}
          </span>
        </div>
      </header>
      
      <div className={styles.messageList}>
        {messages.map(msg => {
          const participant = getParticipant(chat, msg.participant_id)
          // Busca el mensaje al que se está respondiendo para enviarle el texto original en lugar del ID
          const repliedMsg = msg.reply_to ? messages.find(m => m.message_id === msg.reply_to) : null
          const repliedSender = repliedMsg ? getParticipant(chat, repliedMsg.participant_id) : null

          return (
            <MessageBubble 
              key={msg.message_id} 
              message={msg} 
              participant={participant} 
              isGroup={metadata.chat_type === 'group'} 
              repliedMessage={repliedMsg}
              repliedSender={repliedSender}
            />
          )
        })}
      </div>
    </main>
  )
}
