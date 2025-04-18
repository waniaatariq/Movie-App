import { useRouter } from 'next/router';
import Link from 'next/link'; // Import Link
import data from '../../data/movies.json';
import styles from '../../styles/MovieDetail.module.css';

export default function GenrePage({ filteredMovies }) {
    const router = useRouter();
    const { id } = router.query; // Get the genre ID from the URL
  
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Movies in {filteredMovies[0]?.genreName}</h1>
        <div className={styles.movieList}>
          {filteredMovies.length === 0 ? (
            <p>No movies available for this genre.</p>
          ) : (
            filteredMovies.map((movie) => (
              <div className={styles.movieItem} key={movie.id}>
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className={styles.moviePoster}
                />
                <div className={styles.movieDetails}>
                  <h2 className={styles.movieTitle}>{movie.title}</h2>
                  <p>{movie.description}</p>
                  <p className={styles.releaseYear}>{movie.releaseYear}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
  
  // Fetch the filtered movies for the genre in getServerSideProps
  export async function getServerSideProps({ params }) {
    const { id } = params; // Get the genre ID from the URL
    const genre = moviesData.genres.find((genre) => genre.id === id); // Find the genre by ID
    const filteredMovies = moviesData.movies
      .filter((movie) => movie.genreId === id)
      .map((movie) => ({
        ...movie,
        genreName: genre?.name || 'Unknown Genre', // Add the genre name to the movie
      }));
  
    return {
      props: { filteredMovies },
    };
  }