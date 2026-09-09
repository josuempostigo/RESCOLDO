/**
 * Avatar.jsx
 *
 * Círculo con foto de perfil o, si no hay foto (lo más común — WhatsApp
 * no exporta fotos de perfil, sección 4.1 de la especificación), muestra
 * las iniciales del nombre sobre un fondo de color.
 *
 * Props:
 *   name     — string: nombre del contacto
 *   color    — string: color CSS del participante (null = usa color de acento)
 *   size     — 'sm' | 'md' | 'lg' (default: 'md')
 *   avatarRef — string|null: referencia a imagen (para Fase 3, cuando se
 *               implemente la capa de almacenamiento real)
 */

import styles from './Avatar.module.css'

const SIZES = {
  sm: 32,
  md: 40,
  lg: 52,
}

function getInitials(name) {
  if (!name) return '?'
  const words = name.trim().split(/\s+/)
  if (words.length === 1) return words[0][0].toUpperCase()
  return (words[0][0] + words[words.length - 1][0]).toUpperCase()
}

export default function Avatar({ name, color, size = 'md', avatarRef = null }) {
  const px = SIZES[size] ?? SIZES.md
  const bgColor = color ?? 'var(--color-accent)'

  return (
    <div
      className={styles.avatar}
      style={{
        width: px,
        height: px,
        fontSize: px * 0.38,
        backgroundColor: avatarRef ? 'transparent' : bgColor,
      }}
      aria-label={name}
      role="img"
    >
      {avatarRef ? (
        // En Fase 3 se resolverá la URL real vía el adaptador de almacenamiento
        <img src={avatarRef} alt={name} className={styles.img} />
      ) : (
        <span className={styles.initials}>{getInitials(name)}</span>
      )}
    </div>
  )
}
