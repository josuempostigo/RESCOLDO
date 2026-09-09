import { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import ChatArea from './components/ChatArea.jsx'
import EmptyState from './components/EmptyState.jsx'
import { MOCK_CHATS } from './data/mockChats.js'
import styles from './App.module.css'

export default function App() {
  const [activeChatId, setActiveChatId] = useState(null)
  
  // En mobile, si hay un chat activo, mostramos el ChatArea. 
  // Si no, mostramos el Sidebar.
  // En desktop, mostramos ambos siempre (Sidebar a la izq, ChatArea a la der).
  
  const activeChat = MOCK_CHATS.find(c => c.chat_id === activeChatId)

  return (
    <div className={styles.appContainer}>
      <div className={`${styles.sidebarWrapper} ${activeChatId ? styles.hideOnMobile : ''}`}>
        <Sidebar 
          chats={MOCK_CHATS} 
          activeChatId={activeChatId}
          onSelectChat={setActiveChatId} 
        />
      </div>
      
      <div className={`${styles.chatWrapper} ${!activeChatId ? styles.hideOnMobile : ''}`}>
        {/* Botón de "Volver" solo visible en mobile para cerrar el chat */}
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
          <ChatArea chat={activeChat} />
        ) : (
          <EmptyState type="no-selection" />
        )}
      </div>
    </div>
  )
}
