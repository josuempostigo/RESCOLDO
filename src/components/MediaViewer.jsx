/**
 * MediaViewer.jsx
 *
 * Modal a pantalla completa para visualizar fotos de perfil y archivos multimedia.
 * Por qué: Es esencial para poder hacer zoom o ver en detalle la media, igual 
 * que en WhatsApp. Si el usuario toca un avatar, se abre este componente.
 */
import { X } from 'lucide-react'
import styles from './MediaViewer.module.css'

export default function MediaViewer({ media, onClose }) {
  if (!media) return null

  // Si no hay avatar real en el mock, mostramos un fallback amigable
  const isFallback = !media.url
  
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.toolbar} onClick={e => e.stopPropagation()}>
        <div className={styles.title}>{media.name}</div>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar visor">
          <X size={24} />
        </button>
      </div>
      
      <div className={styles.content} onClick={e => e.stopPropagation()}>
        {isFallback ? (
          <div className={styles.fallbackAvatar} style={{ backgroundColor: media.color || 'var(--color-accent)' }}>
            {media.initials || '?'}
          </div>
        ) : (
          <img src={media.url} alt={media.name} className={styles.image} />
        )}
      </div>
    </div>
  )
}
