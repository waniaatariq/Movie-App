import dbConnect from '../../../utils/mongodb';
import Director from '../../../models/Director';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const directors = await Director.find();
    return res.status(200).json(directors);
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
