import styles from './EmptyState.module.css'

export default function EmptyState({ type = 'no-selection' }) {
  if (type === 'no-chats') {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.icon} aria-hidden="true">🔥</span>
          <h2 className={styles.title}>Te damos la bienvenida a Rescoldo</h2>
          <p className={styles.subtitle}>
            Tus conversaciones, como las recordás. Importá tu primer chat para empezar a explorar.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <span className={styles.icon} aria-hidden="true">🔥</span>
        <h2 className={styles.title}>Rescoldo</h2>
        <p className={styles.subtitle}>
          Seleccioná un chat para ver los mensajes
        </p>
      </div>
    </div>
  )
}
