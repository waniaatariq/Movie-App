import Link from 'next/link';
import moviesData from '../../data/movies.json';
import styles from '../../styles/genre.module.css';

export default function GenresPage() {
  const genres = moviesData.genres;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🎭 Browse Genres</h1>
      <div className={styles.genreList}>
        {genres.length === 0 ? (
          <p className={styles.noGenres}>No genres available.</p>
        ) : (
          genres.map((genre) => (
            <Link href={`/genre/${genre.id}`} key={genre.id} passHref style={{ textDecoration: 'none' }}>
              <div className={styles.genreBlock}>
                <span className={styles.genreHeading}>{genre.name}</span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
