import { useRouter } from 'next/router';
import Link from 'next/link'; // Import Link
import styles from '../../../styles/genredetail.module.css'; // Ensure this matches your file name!

export default function GenrePage({ genreName, filteredMovies }) {
  const router = useRouter();

  // Safety check
  if (!filteredMovies || filteredMovies.length === 0) {
    return <p className={styles.noMovies}>No movies found for this genre.</p>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.hero}>
        <h1 className={styles.genreTitle}>Movies in {genreName}</h1>
        <p className={styles.subtitle}>Explore top picks from this genre</p>
      </div>

      <div className={styles.cardGrid}>
        {filteredMovies.map((movie) => (
          <Link href={`/movies/${movie.id}`} key={movie.id} style={{ textDecoration: 'none' }}>
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
export async function getServerSideProps({ params }) {
  const { id } = params;

  try {
    const res = await fetch(`http://localhost:3000/api/genre/${id}/movies`);
    const contentType = res.headers.get('content-type');

    if (!contentType || !contentType.includes('application/json')) {
      const text = await res.text(); // Log the response text for debugging
      console.error('Unexpected response:', text);
      throw new Error('Invalid JSON response');
    }

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Failed to fetch genre data');
    }

    return {
      props: {
        genreName: data.genreName, // Pass the genre name
        filteredMovies: data.movies, // Pass the movies
      },
    };
  } catch (error) {
    console.error('Error fetching genre data:', error.message);
    return {
      props: {
        genreName: 'Unknown Genre', // Fallback genre name
        filteredMovies: [], // Empty movies array on error
      },
    };
  }
}