import { Search, Filter } from 'lucide-react'
import styles from './SearchBar.module.css'

export default function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        <Search className={styles.icon} size={18} />
        <input 
          type="text" 
          placeholder="Buscar un chat..." 
          className={styles.input}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <button className={styles.filterBtn} aria-label="Filtro de chats (mock)">
        <Filter size={20} />
      </button>
    </div>
  )
}
