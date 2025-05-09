import dbConnect from '../../../utils/mongodb';
import Movie from '../../../models/Movie.js';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const movies = await Movie.find();
    return res.status(200).json(movies);
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
