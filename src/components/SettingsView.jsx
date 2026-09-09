/**
 * SettingsView.jsx
 *
 * Vista de Ajustes.
 * Por qué: El usuario necesita poder cambiar el tema oscuro y ver el menú de configuración.
 * Contiene el toggle del modo oscuro, que cambia el atributo 'data-theme' en <html>.
 */
import { useState, useEffect } from 'react'
import Avatar from './Avatar.jsx'
import styles from './SettingsView.module.css'

export default function SettingsView() {
  const [theme, setTheme] = useState(() => {
    return document.documentElement.getAttribute('data-theme') || 'auto'
  })

  // Aplica el tema al html
  useEffect(() => {
    if (theme === 'auto') {
      document.documentElement.removeAttribute('data-theme')
    } else {
      document.documentElement.setAttribute('data-theme', theme)
    }
  }, [theme])

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Ajustes</h1>
      </header>

      <div className={styles.profileCard}>
        <Avatar name="Mi Perfil" size="lg" />
        <div className={styles.profileInfo}>
          <div className={styles.profileName}>Mi Perfil</div>
          <div className={styles.profileDesc}>Perfil local de Rescoldo</div>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Apariencia</h2>
        <div className={styles.option}>
          <label htmlFor="theme-select">Tema</label>
          <select 
            id="theme-select"
            className={styles.select} 
            value={theme} 
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="auto">Automático (Sistema)</option>
            <option value="light">Claro</option>
            <option value="dark">Oscuro</option>
          </select>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Sincronización en la nube</h2>
        <div className={styles.placeholder}>
          Próximamente: conectá tu propia cuenta de Supabase para tener respaldo en la nube.
        </div>
      </div>
    </div>
  )
}
