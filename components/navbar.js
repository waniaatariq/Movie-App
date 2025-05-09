import { useRouter } from 'next/router';
import styles from '../styles/Navbar.module.css';
import { useContext } from 'react';
import { ThemeContext } from '@/context/themecontext';

export default function Navbar() {
  const router = useRouter();
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>🎬 Cineverse</div>
      <div className={styles.navLinks}>
        <button className={styles.navButton} onClick={toggleTheme}> {darkMode ? 'Light Mode' : 'Dark Mode'}</button>
        <button className={styles.navButton} onClick={() => router.push('/directors')}>Directors</button>
        <button className={styles.navButton} onClick={() => router.push('/help/faqs')}>FAQ</button>
        <button className={styles.navButton} onClick={() => router.push('/help/contact')}>Contact</button>
        <button className={styles.navButton} onClick={() => router.push('/help/privacy')}>Privacy Policy</button>
      </div>
    </nav>
  );
}