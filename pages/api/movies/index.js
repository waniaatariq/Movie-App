import dbConnect from '../../../utils/mongodb';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // 1. Connect to database
    await dbConnect();

    // 2. Access the native MongoDB collection directly
    const moviesCollection = mongoose.connection.db.collection('movies');

    // 3. Find all documents (with projection if needed)
    const movies = await moviesCollection.find({}).toArray();

    console.log('Raw MongoDB documents:', movies); // Debug log

    if (!movies || movies.length === 0) {
      console.warn('No documents found in movies collection');
      return res.status(404).json({ message: 'No movies found' });
    }

    // 4. Transform documents for response
    const transformedMovies = movies.map(movie => ({
      id: movie.id || movie._id.toString(), // Use custom `id` or fallback to `_id`
      title: movie.title || 'Untitled', // Default to 'Untitled' if title is missing
      releaseYear: movie.releaseYear || null, // Use `releaseYear` instead of `year`
      genre: movie.genreId || 'Unknown', // Use `genreId` or default to 'Unknown'
      director: movie.directorId || 'Unknown', // Use `directorId` or default to 'Unknown'
      description: movie.description || 'No description available', // Default description
      poster: movie.poster || 'https://via.placeholder.com/300x450?text=No+Poster', // Fallback poster
      rating: movie.rating || 'N/A', // Default rating
    }));

    console.log('Transformed movies:', transformedMovies); // Debug log

    res.status(200).json(transformedMovies);
  } catch (error) {
    console.error('Full error:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
}