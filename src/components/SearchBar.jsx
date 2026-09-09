import { Search, Filter } from 'lucide-react'
import styles from './SearchBar.module.css'

export default function SearchBar() {
  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        <Search className={styles.icon} size={18} />
        <input 
          type="text" 
          placeholder="Buscar un chat o iniciar uno nuevo" 
          className={styles.input}
        />
      </div>
      <button className={styles.filterBtn} aria-label="Filtro de chats no leídos">
        <Filter size={20} />
      </button>
    </div>
  )
}
