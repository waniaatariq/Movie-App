import dbConnect from '../../../utils/mongodb';
import Movie from '../../../models/Movie';

export default async function handler(req, res) {
  try {
    await dbConnect();
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }

  const { id } = req.query;

  if (req.method === 'GET') {
    const movie = await Movie.findOne({ id });
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    return res.status(200).json(movie);
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}