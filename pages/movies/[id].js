import { useRouter } from 'next/router';
import Link from 'next/link'; // Import Link
import data from '../../data/movies.json';
import styles from '../../styles/MovieDetail.module.css';

export default function MovieDetails({ movie, genre, director }) {
  const router = useRouter();

  if (router.isFallback) {
    return <p className={styles.loading}>Loading…</p>;
  }

  return (
    <div className={styles.container}>
      <button className={styles.back} onClick={() => router.back()}>
        ← Back
      </button>

      <div className={styles.content}>
        {/* Poster */}
        {movie.poster && (
          <img
            src={movie.poster}
            alt={movie.title}
            className={styles.posterImage}
          />
        )}

        {/* Details */}
        <div className={styles.details}>
          <h1 className={styles.title}>{movie.title}</h1>
          <p className={styles.meta}>
            {movie.releaseYear} · {genre?.name} · ⭐ {movie.rating}
          </p>
          <p className={styles.description}>{movie.description}</p>

          {/* Corrected Link */}
          <Link href={`/movies/${movie.id}/director`} className="text-blue-600 font-medium hover:underline">
              Learn more about the director →
          </Link>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = data.movies.map((m) => ({
    params: { id: m.id },
  }));

  return {
    paths,
    fallback: false, // only these IDs will be generated
  };
}

export async function getStaticProps({ params }) {
  const movie = data.movies.find((m) => m.id === params.id);

  if (!movie) {
    return { notFound: true };
  }

  const genre = data.genres.find((g) => g.id === movie.genreId) || null;
  const director = data.directors.find((d) => d.id === movie.directorId) || null;

  return {
    props: { movie, genre, director },
    revalidate: 10, // optional ISR
  };
}