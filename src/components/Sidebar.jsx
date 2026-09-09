import { Plus, Users, Image as ImageIcon, Settings, MessageSquare } from 'lucide-react'
import Avatar from './Avatar.jsx'
import SearchBar from './SearchBar.jsx'
import ChatListItem from './ChatListItem.jsx'
import styles from './Sidebar.module.css'

export default function Sidebar({ chats, activeChatId, onSelectChat }) {
  return (
    <aside className={styles.sidebar}>
      <header className={styles.header}>
        <Avatar name="Mi Perfil" size="md" />
        <div className={styles.actions}>
          <button className={styles.iconBtn} aria-label="Nuevo chat">
            <Plus size={24} />
          </button>
        </div>
      </header>

      <SearchBar />

      <nav className={styles.tabs}>
        <button className={`${styles.tab} ${styles.active}`}><MessageSquare size={20}/></button>
        <button className={styles.tab}><Users size={20}/></button>
        <button className={styles.tab}><ImageIcon size={20}/></button>
        <button className={styles.tab}><Settings size={20}/></button>
      </nav>

      <div className={styles.chatList}>
        {chats.map(chat => (
          <ChatListItem 
            key={chat.chat_id}
            chat={chat}
            isActive={chat.chat_id === activeChatId}
            onClick={() => onSelectChat(chat.chat_id)}
          />
        ))}
      </div>
    </aside>
  )
}
