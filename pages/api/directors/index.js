import dbConnect from '../../../utils/mongodb';
import Director from '../../../models/Directors';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const directors = await Director.find();

    // Transform the data to include only the `id` and other desired fields
    const transformedDirectors = directors.map(director => ({
      id: director.id, // Include only the custom `id`
      name: director.name,
      biography: director.biography || 'No biography available', // Add a default value if biography is missing
    }));

    

    return res.status(200).json(transformedDirectors);
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}