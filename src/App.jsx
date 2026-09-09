/**
 * App.jsx
 * Se gestiona el estado global del MediaViewer y se corrige el layout
 * para que no existan huecos en blanco entre la barra lateral y el chat.
 */
import { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import ChatArea from './components/ChatArea.jsx'
import EmptyState from './components/EmptyState.jsx'
import MediaViewer from './components/MediaViewer.jsx'
import { MOCK_CHATS } from './data/mockChats.js'
import styles from './App.module.css'

export default function App() {
  const [activeChatId, setActiveChatId] = useState(null)
  
  // Estado para el modal de ver media a pantalla completa
  // viewMedia = { name: string, color: string, url?: string } | null
  const [viewMedia, setViewMedia] = useState(null)
  
  const activeChat = MOCK_CHATS.find(c => c.chat_id === activeChatId)

  return (
    <div className={styles.appContainer}>
      <div className={`${styles.sidebarWrapper} ${activeChatId ? styles.hideOnMobile : ''}`}>
        <Sidebar 
          chats={MOCK_CHATS} 
          activeChatId={activeChatId}
          onSelectChat={setActiveChatId}
          onViewMedia={setViewMedia}
        />
      </div>
      
      <div className={`${styles.chatWrapper} ${!activeChatId ? styles.hideOnMobile : ''}`}>
        {activeChatId && (
          <button 
            className={styles.mobileBackButton}
            onClick={() => setActiveChatId(null)}
            aria-label="Volver a la lista de chats"
          >
            ← Volver
          </button>
        )}
        
        {activeChat ? (
          <ChatArea chat={activeChat} onViewMedia={setViewMedia} />
        ) : (
          <EmptyState type="no-selection" />
        )}
      </div>

      {viewMedia && (
        <MediaViewer media={viewMedia} onClose={() => setViewMedia(null)} />
      )}
    </div>
  )
}
