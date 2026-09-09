import { useState, useEffect } from 'react'
import { Moon, Sun, Monitor, Cloud, Edit2 } from 'lucide-react'
import Avatar from './Avatar.jsx'
import styles from './SettingsView.module.css'

export default function SettingsView({ avatarOverrides, onUpdateAvatar }) {
  const [theme, setTheme] = useState(() => {
    return document.documentElement.getAttribute('data-theme') || 'auto'
  })

  useEffect(() => {
    if (theme === 'auto') document.documentElement.removeAttribute('data-theme')
    else document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0])
      onUpdateAvatar('Mi Perfil', url)
    }
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Ajustes</h1>
      </header>

      <div className={styles.profileCard}>
        <div className={styles.avatarContainer}>
          <Avatar name="Mi Perfil" size="lg" customUrl={avatarOverrides['Mi Perfil']} />
          <label className={styles.editBadge}>
            <Edit2 size={12} color="#fff" />
            <input type="file" accept="image/*" onChange={handleAvatarChange} hidden />
          </label>
        </div>
        <div className={styles.profileInfo}>
          <div className={styles.profileName}>Mi Perfil</div>
          <div className={styles.profileDesc}>Perfil local de Rescoldo</div>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Apariencia</h2>
        <div className={styles.themeSelector}>
          <button className={`${styles.themeBtn} ${theme === 'light' ? styles.activeTheme : ''}`} onClick={() => setTheme('light')}>
            <Sun size={20} /> Claro
          </button>
          <button className={`${styles.themeBtn} ${theme === 'dark' ? styles.activeTheme : ''}`} onClick={() => setTheme('dark')}>
            <Moon size={20} /> Oscuro
          </button>
          <button className={`${styles.themeBtn} ${theme === 'auto' ? styles.activeTheme : ''}`} onClick={() => setTheme('auto')}>
            <Monitor size={20} /> Auto
          </button>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}><Cloud size={16} /> Respaldo en la Nube</h2>
        <div className={styles.placeholder}>
          Próximamente: conectá tu propia cuenta de Supabase.
        </div>
      </div>
    </div>
  )
}
