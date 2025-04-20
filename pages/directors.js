import useSWR from 'swr';
import Link from 'next/link';
import { useRouter } from 'next/router'; // Import useRouter
import styles from '../styles/Directors.module.css';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function DirectorsPage() {
  const router = useRouter(); // Initialize useRouter

  const { data: directors, error } = useSWR('/api/director', fetcher);

  if (error) return <p className={styles.error}>Failed to load directors.</p>;
  if (!directors) return <p className={styles.loading}>Loading directors...</p>;

  return (
    <div className={styles.container}>
      {/* Back Button */}
      <button className={styles.backButton} onClick={() => router.push('/')}>
        ← Back
      </button>

      <h1 className={styles.title}>🎬 Directors</h1>
      <div className={styles.list}>
        {directors.map((d) => (
          <div key={d.id} className={styles.card}>
            <h2 className={styles.name}>{d.name}</h2>
            <p className={styles.bio}>{d.biography}</p>
            <h3 className={styles.moviesHeader}>Movies:</h3>
            <ul className={styles.movieList}>
              {d.movies.map((m) => (
                <li key={m.id}>
                  <Link href={`/movies/${m.id}`} className={styles.movieLink}>
                    {m.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}