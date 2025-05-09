import dbConnect from '../../../utils/mongodb';
import Director from '../../../models/Director';
import Movie from '../../../models/Movie';

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === 'GET') {
    const director = await Director.findOne({ id });
    if (!director) return res.status(404).json({ message: 'Director not found' });

    const movies = await Movie.find({ directorId: id });

    return res.status(200).json({
      director,
      movies
    });
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
