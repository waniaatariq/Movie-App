import Link from 'next/link'
import styles from '../styles/moviecard.module.css'

export default function MovieCard({ movie }) {
  return (
    <div
      className={styles.card}
      style={{ backgroundImage: `url(${movie.poster})` }}
    >
      <Link href={`/movies/${movie.id}`} className={styles.link}>
        <div className={styles.details}>
          <h3 className={styles.title}>{movie.title}</h3>
          <p className={styles.year}>{movie.year}</p>
          <p className={styles.plot}>
            {movie.plot
              ? movie.plot.length > 80
                ? movie.plot.slice(0, 80) + '…'
                : movie.plot
              : 'No description available'}
          </p>
        </div>
      </Link>
    </div>
  )
}
