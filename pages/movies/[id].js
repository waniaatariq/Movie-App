// pages/movies/[id].js
import { useRouter } from 'next/router';
import Link from 'next/link';
import data from '../../data/movies.json';
import styles from '../../styles/MovieDetail.module.css';

export default function MovieDetail({ movie, genre, director }) {
  const router = useRouter();

  // Show a loading state if fallback blocking is used
  if (router.isFallback) return <p>Loading...</p>;
  if (!movie) return <p className={styles.error}>Movie not found</p>;

  return (
    <div className={styles.container}>
    <button className={styles.backButton} onClick={() => router.back()}>
      ← Back
    </button>
  
    <div className={styles.detail}>
      <div className={styles.posterWrapper}>
        <img src={movie.poster} alt={movie.title} className={styles.poster} />
      </div>
  
      <div className={styles.info}>
        <h1 className={styles.title}>{movie.title}</h1>
        <p className={styles.meta}>
          {genre.name} • {movie.releaseYear} • ⭐ {movie.rating}
        </p>
        <p className={styles.description}>{movie.description}</p>
  
        <div className={styles.director}>
        <Link href={`/movies/${movie.id}/director`} className={styles.director}>Know the Director »
</Link>
        </div>
      </div>
    </div>
  </div>
  );
}

// 1) Tell Next.js which movie IDs to statically generate
export async function getStaticPaths() {
  const paths = data.movies.map((m) => ({
    params: { id: m.id }
  }));
  return {
    paths,
    fallback: true  // or 'blocking' if you prefer
  };
}

// 2) Fetch data for one movie based on the URL
export async function getStaticProps({ params }) {
  const movie = data.movies.find((m) => m.id === params.id) || null;
  if (!movie) {
    return { notFound: true };
  }

  const genre = data.genres.find((g) => g.id === movie.genreId) || { name: 'Unknown' };
  const director = data.directors.find((d) => d.id === movie.directorId) || { name: 'Unknown', biography: '' };

  return {
    props: {
      movie,
      genre,
      director
    },
    revalidate: 10
  };
}
