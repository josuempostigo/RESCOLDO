/**
 * Sidebar.jsx
 *
 * Barra lateral con lista de chats, pestañas y menú superior.
 * Por qué: Incorpora estado para la búsqueda, el menú '+' y pestañas.
 */
import { useState, useMemo } from 'react'
import { Plus, Users, Image as ImageIcon, Settings, MessageSquare, MoreVertical } from 'lucide-react'
import Avatar from './Avatar.jsx'
import SearchBar from './SearchBar.jsx'
import ChatListItem from './ChatListItem.jsx'
import SettingsView from './SettingsView.jsx'
import styles from './Sidebar.module.css'

export default function Sidebar({ chats, activeChatId, onSelectChat, onViewMedia }) {
  const [activeTab, setActiveTab] = useState('chats') // chats | personas | media | settings
  const [searchTerm, setSearchTerm] = useState('')
  const [showPlusMenu, setShowPlusMenu] = useState(false)

  // Filtrado básico de chats
  const filteredChats = useMemo(() => {
    if (!searchTerm) return chats
    return chats.filter(c => c.metadata.title.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [chats, searchTerm])

  return (
    <aside className={styles.sidebar}>
      <header className={styles.header}>
        {/* Avatar propio clicable para ver la foto */}
        <div onClick={() => onViewMedia({ name: 'Mi Perfil', color: 'var(--color-accent)' })} style={{cursor:'pointer'}}>
          <Avatar name="Mi Perfil" size="md" />
        </div>
        
        <div className={styles.actions}>
          <div className={styles.plusMenuContainer}>
            <button 
              className={styles.iconBtn} 
              aria-label="Menú de importación"
              onClick={() => setShowPlusMenu(!showPlusMenu)}
            >
              <Plus size={24} />
            </button>
            {/* Dropdown del menú + (Opciones de la spec 7.4) */}
            {showPlusMenu && (
              <>
                <div className={styles.menuBackdrop} onClick={() => setShowPlusMenu(false)} />
                <div className={styles.dropdown}>
                  <button onClick={() => setShowPlusMenu(false)}>Importar un chat</button>
                  <button onClick={() => setShowPlusMenu(false)}>Importar varios a la vez</button>
                  <button onClick={() => setShowPlusMenu(false)}>Vincular una carpeta local</button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Solo mostramos la búsqueda si estamos en la pestaña de chats o personas */}
      {(activeTab === 'chats' || activeTab === 'personas') && (
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      )}

      {/* Pestañas (Spec 5.1) */}
      <nav className={styles.tabs}>
        <button 
          className={`${styles.tab} ${activeTab === 'chats' ? styles.active : ''}`}
          onClick={() => setActiveTab('chats')}
          aria-label="Chats"
        ><MessageSquare size={20}/></button>
        
        <button 
          className={`${styles.tab} ${activeTab === 'personas' ? styles.active : ''}`}
          onClick={() => setActiveTab('personas')}
          aria-label="Personas (Mock)"
        ><Users size={20}/></button>
        
        <button 
          className={`${styles.tab} ${activeTab === 'media' ? styles.active : ''}`}
          onClick={() => setActiveTab('media')}
          aria-label="Multimedia (Mock)"
        ><ImageIcon size={20}/></button>
        
        <button 
          className={`${styles.tab} ${activeTab === 'settings' ? styles.active : ''}`}
          onClick={() => setActiveTab('settings')}
          aria-label="Ajustes"
        ><Settings size={20}/></button>
      </nav>

      <div className={styles.contentArea}>
        {activeTab === 'chats' && (
          <div className={styles.chatList}>
            {filteredChats.map(chat => (
              <ChatListItem 
                key={chat.chat_id}
                chat={chat}
                isActive={chat.chat_id === activeChatId}
                onClick={() => onSelectChat(chat.chat_id)}
                onAvatarClick={() => onViewMedia({ 
                  name: chat.metadata.title, 
                  color: chat.metadata.chat_type === 'individual' ? chat.metadata.participants.find(p => !p.is_me)?.color : 'var(--color-accent-dark)' 
                })}
              />
            ))}
            {filteredChats.length === 0 && (
              <div className={styles.emptySearch}>No se encontraron chats</div>
            )}
          </div>
        )}

        {activeTab === 'settings' && <SettingsView />}
        
        {/* Placeholders para las otras pestañas de la fase 1 */}
        {activeTab === 'personas' && <div className={styles.placeholderTab}>Listado de personas (Próximamente)</div>}
        {activeTab === 'media' && <div className={styles.placeholderTab}>Galería multimedia global (Próximamente)</div>}
      </div>
    </aside>
  )
}
