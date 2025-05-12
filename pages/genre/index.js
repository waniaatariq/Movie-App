import Link from 'next/link';
import styles from '../../styles/genre.module.css';

export default function GenresPage({ genres }) {
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

// Fetch genres from the API endpoint
export async function getServerSideProps() {
  try {
    const res = await fetch('http://localhost:3000/api/genre'); // Replace with your API endpoint
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Failed to fetch genres');
    }

    return {
      props: {
        genres: data, // Pass the genres data to the component
      },
    };
  } catch (error) {
    console.error('Error fetching genres:', error.message);
    return {
      props: {
        genres: [], // Return an empty array if there's an error
      },
    };
  }
}