/**
 * App.jsx — Componente raíz de Rescoldo
 *
 * Por ahora es solo un esqueleto de bienvenida.
 * La estructura real de layout (panel doble en escritorio,
 * columna única en celular) se construye en la Fase 5.
 */

import styles from './App.module.css'

export default function App() {
  return (
    <div className={styles.welcome}>
      <div className={styles.logo}>
        <span className={styles.flame} aria-hidden="true">🔥</span>
        <h1>Rescoldo</h1>
      </div>
      <p className={styles.subtitle}>
        Tus conversaciones, como las recordás.
      </p>
      <p className={styles.hint}>
        Fase 0 completada — el proyecto está listo para construir.
      </p>
    </div>
  )
}
