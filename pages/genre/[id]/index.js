import { useRouter } from 'next/router';
import Link from 'next/link'; // Import Link
import data from '../../../data/movies.json';
import styles from '../../../styles/genredetail.module.css';// make sure this matches your file name!

export default function GenrePage({ filteredMovies }) {
  const router = useRouter();
  const { id } = router.query;

  // Safety check
  if (!filteredMovies) {
    return <p className={styles.noMovies}>Something went wrong loading this genre.</p>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.hero}>
        <h1 className={styles.genreTitle}>Movies in {filteredMovies[0]?.genreName}</h1>
        <p className={styles.subtitle}>Explore top picks from this genre</p>
      </div>

      <div className={styles.cardGrid}>
      {filteredMovies.map((movie) => (
  <Link href={`/movie/${movie.id}`} key={movie.id} style={{ textDecoration: 'none' }}>
    <div className={styles.movieCard}>
      <img
        src={movie.poster}
        alt={movie.title}
        className={styles.poster}
      />
      <div className={styles.info}>
        <h3>{movie.title}</h3>
        <p>{movie.description}</p>
        <p>Year: {movie.releaseYear}</p>
      </div>
    </div>
  </Link>
))}
      </div>
    </div>
  );
}

// ✅ Server-side props for genre filtering
export async function getServerSideProps({ params }) 
{
  const { id } = params;

  const genre = data.genres.find((genre) => String(genre.id) === id); // convert to string just in case
  const filteredMovies = data.movies
    .filter((movie) => String(movie.genreId) === id)
    .map((movie) => ({
      ...movie,
      genreName: genre?.name || 'Unknown Genre',
    }));

  return {
    props: { filteredMovies },
  };
}
