import useSWR from 'swr';
import Link from 'next/link';
import { useRouter } from 'next/router'; // Import useRouter
import styles from '../styles/Directors.module.css';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function DirectorsPage() {
  const router = useRouter(); // Initialize useRouter

  // Fetch data from the main API endpoint
  const { data: directors, error } = useSWR('/api/directors', fetcher);

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
          <DirectorCard key={d.id} director={d} />
        ))}
      </div>
    </div>
  );
}

function DirectorCard({ director }) {
  // Fetch movies for the specific director
  const { data, error } = useSWR(`/api/directors/${director.id}`, fetcher);

  if (error) return <p className={styles.error}>Failed to load movies for {director.name}.</p>;
  if (!data) return <p className={styles.loading}>Loading movies for {director.name}...</p>;

  const movies = data.movies || [];

  return (
    <div className={styles.card}>
      <h2 className={styles.name}>{director.name}</h2>
      <p className={styles.bio}>{director.biography || 'No biography available.'}</p>
      <h3 className={styles.moviesHeader}>Movies:</h3>
      <ul className={styles.movieList}>
        {movies.length > 0 ? (
          movies.map((m) => (
            <li key={m.id}>
              <Link href={`/movies/${m.id}`} className={styles.movieLink}>
                {m.title}
              </Link>
            </li>
          ))
        ) : (
          <li>No movies available.</li>
        )}
      </ul>
    </div>
  );
}