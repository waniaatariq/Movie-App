import moviesData from '../../../data/movies.json';
import styles from '../../../styles/Director.module.css';

export default function DirectorPage({ directorName, directorBio }) {
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
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = moviesData.movies.map((movie) => ({
    params: { id: movie.id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const movie = moviesData.movies.find((m) => m.id === params.id);
  if (!movie) return { notFound: true };

  const director = moviesData.directors.find((d) => d.id === movie.directorId);

  return {
    props: {
      directorName: director?.name || 'Unknown Director',
      directorBio: director?.biography || 'No bio available.',
    },
  };
}