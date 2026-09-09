/**
 * AudioPlayer.jsx
 *
 * Interfaz para reproducir notas de voz. En la Fase 1 es puramente visual.
 * Por qué: WhatsApp exporta los audios como archivos .opus, y la app necesita
 * renderizarlos en un formato nativo dentro de la burbuja, igual que la app original.
 */
import { Play } from 'lucide-react'
import styles from './AudioPlayer.module.css'

export default function AudioPlayer({ durationSec = 0 }) {
  // Formatea segundos a "M:SS"
  const formatSecs = (s) => {
    const mins = Math.floor(s / 60)
    const secs = s % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className={styles.container}>
      <button className={styles.playBtn} aria-label="Reproducir audio">
        <Play size={20} fill="currentColor" />
      </button>
      <div className={styles.waveform}>
        {/* Línea simulada de progreso de audio */}
        <div className={styles.progressTrack}>
          <div className={styles.progressFill} style={{ width: '0%' }}></div>
          <div className={styles.progressThumb}></div>
        </div>
      </div>
      <div className={styles.duration}>
        {formatSecs(durationSec)}
      </div>
    </div>
  )
}
