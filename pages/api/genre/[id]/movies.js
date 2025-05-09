import dbConnect from '../../../../utils/mongodb';
import Movie from '../../../../models/Movie';

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === 'GET') {
    const movies = await Movie.find({ genreId: id });
    return res.status(200).json(movies);
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
