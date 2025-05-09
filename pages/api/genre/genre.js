import dbConnect from '../../../utils/mongodb';
import Genre from '../../../models/Genre';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const genres = await Genre.find();
    return res.status(200).json(genres);
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
