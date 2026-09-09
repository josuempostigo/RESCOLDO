import styles from './Avatar.module.css'

const SIZES = { sm: 32, md: 40, lg: 52, xl: 200 }

function getInitials(name) {
  if (!name) return '?'
  const words = name.trim().split(/\s+/)
  if (words.length === 1) return words[0][0].toUpperCase()
  return (words[0][0] + words[words.length - 1][0]).toUpperCase()
}

export default function Avatar({ name, color, size = 'md', avatarRef = null, customUrl = null }) {
  const px = SIZES[size] ?? SIZES.md
  const bgColor = color ?? 'var(--color-accent)'
  
  // customUrl toma precedencia (usado para cuando el usuario sube su propia foto en el mock)
  const finalSrc = customUrl || avatarRef

  return (
    <div
      className={styles.avatar}
      style={{
        width: px, height: px, fontSize: px * 0.38,
        backgroundColor: finalSrc ? 'transparent' : bgColor,
      }}
      aria-label={name} role="img"
    >
      {finalSrc ? (
        <img src={finalSrc} alt={name} className={styles.img} />
      ) : (
        <span className={styles.initials}>{getInitials(name)}</span>
      )}
    </div>
  )
}
