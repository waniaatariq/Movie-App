import moviesData from '../../../data/movies.json';
import styles from '../../../styles/genredetail.module.css';

export default function GenreDetailPage({ genre, movies }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.hero}>
        <h1 className={styles.genreTitle}>{genre} Movies</h1>
        <p className={styles.subtitle}>Explore all the iconic titles under {genre}</p>
      </div>

      <div className={styles.cardGrid}>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div className={styles.movieCard} key={movie.id}>
              <img src={movie.poster} alt={movie.title} className={styles.poster} />
              <div className={styles.info}>
                <h3>{movie.title}</h3>
                <p>{movie.releaseYear}</p>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noMovies}>No movies found in this genre.</p>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const { id } = params;

  const filtered = moviesData.movies.filter((movie) => movie.genre === id);

  return {
    props: {
      genre: id,
      movies: filtered,
    },
  };
}
