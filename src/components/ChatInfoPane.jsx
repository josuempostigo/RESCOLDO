import { X, ChevronRight, Lock, Image as ImageIcon, Star, Edit2 } from 'lucide-react'
import Avatar from './Avatar.jsx'
import styles from './ChatInfoPane.module.css'

export default function ChatInfoPane({ chat, onClose, avatarOverrides, onUpdateAvatar }) {
  const { metadata } = chat
  
  const otherParticipant = metadata.participants.find(p => !p.is_me)
  const isGroup = metadata.chat_type === 'group'
  const avatarColor = isGroup ? 'var(--color-accent-dark)' : otherParticipant?.color
  const chatName = metadata.title

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0])
      onUpdateAvatar(chatName, url)
    }
  }

  return (
    <aside className={styles.container}>
      <header className={styles.header}>
        <button className={styles.closeBtn} onClick={onClose}>
          <X size={24} />
        </button>
        <span className={styles.headerTitle}>Info. del {isGroup ? 'grupo' : 'contacto'}</span>
      </header>

      <div className={styles.content}>
        <div className={styles.hero}>
          <div className={styles.avatarContainer}>
            <Avatar name={chatName} color={avatarColor} size="xl" customUrl={avatarOverrides[chatName]} />
            <label className={styles.editBadge}>
              <Edit2 size={16} color="#fff" />
              <input type="file" accept="image/*" onChange={handleAvatarChange} hidden />
            </label>
          </div>
          <h2 className={styles.title}>{chatName}</h2>
          <span className={styles.subtitle}>
            {isGroup ? `${metadata.participants.length} participantes` : 'Importado: ' + new Date(metadata.imported_at).toLocaleDateString()}
          </span>
        </div>

        <div className={styles.sectionList}>
          <button className={styles.listItem}>
            <div className={styles.listIcon}><ImageIcon size={20} /></div>
            <div className={styles.listText}>Multimedia, enlaces y documentos</div>
            <ChevronRight size={20} color="var(--color-icon)" />
          </button>
          <button className={styles.listItem}>
            <div className={styles.listIcon}><Star size={20} /></div>
            <div className={styles.listText}>Mensajes destacados</div>
            <ChevronRight size={20} color="var(--color-icon)" />
          </button>
          <button className={styles.listItem}>
            <div className={styles.listIcon}><Lock size={20} /></div>
            <div className={styles.listText}>Bloqueo de chat</div>
            <ChevronRight size={20} color="var(--color-icon)" />
          </button>
        </div>

        {isGroup && (
          <div className={styles.groupSection}>
            <div className={styles.sectionHeader}>{metadata.participants.length} participantes</div>
            {metadata.participants.map(p => (
              <div key={p.participant_id} className={styles.participantItem}>
                <Avatar name={p.display_name} color={p.color} size="sm" customUrl={avatarOverrides[p.display_name]} />
                <div className={styles.participantInfo}>
                  <div className={styles.participantName}>{p.display_name}</div>
                  <div className={styles.participantDesc}>{p.is_me ? 'En este dispositivo' : 'En común: 2 grupos'}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  )
}
