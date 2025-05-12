import styles from '../../../styles/Director.module.css';

export default function DirectorPage({ directorName, directorBio, movies }) {
  return (
    <div className={styles.card}>
      <div className={styles.container}>
        <h1 className={styles.heading}>🎬 Director Spotlight</h1>
        <h2 className={styles.subheading}>{directorName}</h2>
        <p className={styles.bio}>
          {directorBio.split('\n').map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </p>
        <h3 className={styles.moviesHeading}>Movies by {directorName}:</h3>
        <ul className={styles.movieList}>
          {movies.length > 0 ? (
            movies.map((movie) => (
              <li key={movie.id}>
                <strong>{movie.title}</strong> ({movie.releaseYear})
              </li>
            ))
          ) : (
            <li>No movies available.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  // Fetch movie to get directorId
  const movieRes = await fetch(`http://localhost:3000/api/movies/${params.id}`);
  const movie = await movieRes.json();

  if (!movie || !movie.directorId) return { notFound: true };

  // Fetch director details using the directorId
  const directorRes = await fetch(`http://localhost:3000/api/directors/${movie.directorId}`);
  const directorData = await directorRes.json();

  if (!directorData || !directorData.director) return { notFound: true };

  const { director, movies } = directorData;

  return {
    props: {
      directorName: director.name || 'Unknown Director',
      directorBio: director.biography || 'No bio available.',
      movies: movies || [], // Pass the movies directed by the director
    },
  };
}