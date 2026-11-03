import { useLocation } from 'react-router-dom'
import { navItems } from '../../config/site'
import { NavButton } from '../Button/Button'
import styles from './NavBar.module.css'

type NavBarProps = {
  className?: string
}

/** Nav bar — pílula background/inverse; o item da página atual vira Button Primary. */
export function NavBar({ className }: NavBarProps) {
  const { pathname } = useLocation()
  return (
    <nav aria-label="Principal" className={`${styles.nav} ${className ?? ''}`}>
      <ul className={styles.list}>
        {navItems.map((item) => (
          <li key={item.to} className={styles.listItem}>
            <NavButton to={item.to} active={item.match(pathname)} className={styles.item}>
              {item.label}
            </NavButton>
          </li>
        ))}
      </ul>
    </nav>
  )
}
