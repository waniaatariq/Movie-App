import { useRouter } from 'next/router';
import useSWR from 'swr';
import styles from '../../styles/MovieDetail.module.css';
import Link from 'next/link';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function MovieDetail() {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR(id ? `/api/movies/${id}` : null, fetcher);

  if (router.isFallback) return <p>Loading...</p>;
  if (error) return <p className={styles.error}>Failed to load movie.</p>;
  if (!data) return <p className={styles.loading}>Loading...</p>;

  const { id: movieId, title, poster, description, releaseYear, rating, genre, directorId } = data;

  if (!title) return <p className={styles.error}>Movie not found.</p>;

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => router.back()}>← Back</button>

      <div className={styles.detail}>
        <div className={styles.posterWrapper}>
          {poster ? (
            <img src={poster} alt={title} className={styles.poster} />
          ) : (
            <div className={styles.noPoster}>Poster not available</div>
          )}
        </div>

        <div className={styles.info}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.meta}>
            {(genre?.join(', ') || 'Unknown')} • {releaseYear} • ⭐ {rating}
          </p>
          <p className={styles.description}>{description}</p>

          <div className={styles.director}>
            <Link href={`/movies/${movieId}/director`}  className={styles.director}>
              Know the Director »
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
