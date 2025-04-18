import { useRouter } from 'next/router';
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>🎬 Cineverse</div>
      <div className={styles.navLinks}>
        <button className={styles.navButton} onClick={() => router.push('/')}>Home</button>
        <button className={styles.navButton} onClick={() => router.push('/help/faqs')}>FAQ</button>
        <button className={styles.navButton} onClick={() => router.push('/help/contact')}>Contact</button>
        <button className={styles.navButton} onClick={() => router.push('/help/privacy')}>Privacy Policy</button>
      </div>
    </nav>
  );
}