import dbConnect from '../../../utils/mongodb';
import Director from '../../../models/Directors';
import Movie from '../../../models/Movie';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { id } = req.query;

  try {
    // 1. First verify the director exists
    const director = await Director.findOne({ id: id });
    
    if (!director) {
      return res.status(404).json({ 
        message: 'Director not found',
        suggestion: 'Check if the director ID is correct' 
      });
    }

    // 2. Find all movies by this director
    const movies = await Movie.find({
      $or: [
        { directorId: id },       // If using direct reference
        { directorIds: id },      // If using array of director IDs
        { 'directors.id': id }    // If using nested director objects
      ]
    });

    // 3. Prepare the response
    const response = {
      director: {
        id: director.id,
        name: director.name,
        biography: director.biography || 'No biography available'
      },
      movies: movies.map(movie => ({
        id: movie.id,
        title: movie.title,
        releaseYear: movie.releaseYear,
        poster: movie.poster || '/placeholder-movie.png',
        description: movie.description || 'No description available'
      }))
    };

    return res.status(200).json(response);

  } catch (error) {
    console.error('Error fetching director movies:', error);
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
}