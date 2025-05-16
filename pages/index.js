import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import moviesData from '../data/movies.json';
import MovieCard from '../components/moviecard';
import Navbar from '../components/navbar';
import { useContext } from 'react';
import { ThemeContext } from '../context/themecontext';

export default function Home({ movies = [] }) {
  const router = useRouter();
  const { darkMode } = useContext(ThemeContext);

  return (
    <>
      <Navbar />
      <main className={`${styles.container} ${darkMode ? 'dark' : 'light'}`}>
        {/* Title with a glowing effect */}
        <h1 className={styles.title}>🎬 Welcome to Cineverse</h1>
        {/* Subtitle */}
        <p className={styles.subtitle}>Your Escape to the Cinematic Universe</p>

        {/* Browse Genres Button */}
        <div className={styles.browseButtonWrapper}>
          <Link href="/genre" passHref >
            <button className={styles.browseButton}>
              Browse Genres
            </button>
          </Link>
        </div>

        <section>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Now Streaming</h2>
          <div className={styles.grid}>
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export async function getStaticProps() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movies`);
    const movies = await res.json();

    return {
      props: {
        movies,
      },
      revalidate: 10, // ISR
    };
  } catch (error) {
    console.error('Error fetching movies:', error);
    return {
      props: {
        movies: [],
      },
    };
  }
}