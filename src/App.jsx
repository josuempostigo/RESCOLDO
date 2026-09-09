import { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import ChatArea from './components/ChatArea.jsx'
import EmptyState from './components/EmptyState.jsx'
import MediaViewer from './components/MediaViewer.jsx'
import ChatInfoPane from './components/ChatInfoPane.jsx'
import { MOCK_CHATS } from './data/mockChats.js'
import styles from './App.module.css'

export default function App() {
  const [activeChatId, setActiveChatId] = useState(null)
  const [viewMedia, setViewMedia] = useState(null)
  const [showInfo, setShowInfo] = useState(false)
  const [avatarOverrides, setAvatarOverrides] = useState({})
  
  const activeChat = MOCK_CHATS.find(c => c.chat_id === activeChatId)

  const handleUpdateAvatar = (name, url) => {
    setAvatarOverrides(prev => ({ ...prev, [name]: url }))
  }

  const handleSelectChat = (id) => {
    setActiveChatId(id)
    setShowInfo(false) // Al cambiar de chat, cerramos la info
  }

  return (
    <div className={styles.appContainer}>
      {/* 1. Barra Lateral */}
      <div className={`${styles.sidebarWrapper} ${activeChatId ? styles.hideOnMobile : ''}`}>
        <Sidebar 
          chats={MOCK_CHATS} 
          activeChatId={activeChatId}
          onSelectChat={handleSelectChat}
          onViewMedia={setViewMedia}
          avatarOverrides={avatarOverrides}
          onUpdateAvatar={handleUpdateAvatar}
        />
      </div>
      
      {/* 2. Área de Chat */}
      <div className={`${styles.chatWrapper} ${!activeChatId ? styles.hideOnMobile : ''} ${(showInfo && activeChatId) ? styles.hideOnMobile : ''}`}>
        {activeChatId && (
          <button className={styles.mobileBackButton} onClick={() => handleSelectChat(null)} aria-label="Volver">← Volver</button>
        )}
        
        {activeChat ? (
          <ChatArea 
            chat={activeChat} 
            onViewMedia={setViewMedia} 
            onShowInfo={() => setShowInfo(true)}
            avatarOverrides={avatarOverrides}
          />
        ) : (
          <EmptyState type="no-selection" />
        )}
      </div>

      {/* 3. Panel de Info de Contacto/Grupo */}
      {showInfo && activeChatId && (
        <div className={styles.infoWrapper}>
          <ChatInfoPane 
            chat={activeChat} 
            onClose={() => setShowInfo(false)} 
            avatarOverrides={avatarOverrides}
            onUpdateAvatar={handleUpdateAvatar}
          />
        </div>
      )}

      {/* Modal Visor de Multimedia */}
      {viewMedia && (
        <MediaViewer media={viewMedia} onClose={() => setViewMedia(null)} />
      )}
    </div>
  )
}
