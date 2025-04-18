import Link from 'next/link';
import moviesData from '../../data/movies.json';
import styles from '../../styles/genre.module.css';

export default function GenresPage() {
  // Get unique genres using genreId from the movies and genres
  const genres = moviesData.genres;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}> 🎭 Browse Genres</h1>
      <div className={styles.genreList}>
        {genres.length === 0 ? (
          <p>No genres available.</p>
        ) : (
          genres.map((genre) => (
            <Link href={`/genres/${genre.id}`} key={genre.id}
              className={styles.genreBlock}>
                <div className={styles.genreHeading}>{genre.name}</div>
            
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
