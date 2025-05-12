import dbConnect from '../../../utils/mongodb';
import Movie from '../../../models/Movie';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: 'Movie ID is required' });
  }

  try {
    await dbConnect();
    
    const movie = await Movie.findOne({ id }).lean();

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    // Send the exact structure expected by the frontend
    const transformedMovie = {
      id: movie.id,
      title: movie.title,
      releaseYear: movie.releaseYear,
      genreId: movie.genreId,
      directorId: movie.directorId,
      description: movie.description || null,
      poster: movie.poster || null,
      rating: movie.rating || null,
    };

    res.status(200).json(transformedMovie);
  } catch (error) {
    console.error('Error fetching movie details:', error);

    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
}
