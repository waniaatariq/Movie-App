import { useRouter } from 'next/router';
import useSWR from 'swr';
import styles from '../../styles/MovieDetail.module.css';
import Link from 'next/link';

// SWR fetcher
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function MovieDetail() {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR(id ? `/api/movies/${id}` : null, fetcher);

  if (router.isFallback) return <p>Loading...</p>;
  if (error) return <p className={styles.error}>Failed to load movie.</p>;
  if (!data) return <p className={styles.loading}>Loading...</p>;

  const { movie, genre, director } = data;

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => router.back()}>
        ← Back
      </button>

      <div className={styles.detail}>
        <div className={styles.posterWrapper}>
          <img src={movie.poster} alt={movie.title} className={styles.poster} />
        </div>

        <div className={styles.info}>
          <h1 className={styles.title}>{movie.title}</h1>
          <p className={styles.meta}>
            {genre?.name || 'Unknown'} • {movie.releaseYear} • ⭐ {movie.rating}
          </p>
          <p className={styles.description}>{movie.description}</p>

          <div className={styles.director}>
            <Link href={`/movies/${movie.id}/director`} className={styles.director}>
              Know the Director »
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
