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

export async function getServerSideProps({ params }) {
  // Fetch movie to get directorId
  const movieRes = await fetch(`http://localhost:3000/api/movies/${params.id}`);
  const movie = await movieRes.json();

  if (!movie || !movie.directorId) return { notFound: true };

  // Fetch director details using the directorId
  const directorRes = await fetch(`http://localhost:3000/api/directors/${movie.directorId}`);
  const director = await directorRes.json();

  return {
    props: {
      directorName: director.name || 'Unknown Director',
      directorBio: director.biography || 'No bio available.',
    },
  };
}
