import dbConnect from '../../../utils/mongodb';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();
    const db = mongoose.connection.db;
    
    // Get all genres
    const genres = await db.collection('genre')
      .find({})
      .toArray();

    if (!genres.length) {
      return res.status(404).json({ 
        message: 'No genres found',
        suggestion: 'Check if your collection is named differently (e.g., genres)' 
      });
    }

    // Transform for response
    const response = genres.map(genre => ({
      id: genre.id.toString(),
      name: genre.name || genre.genreName || 'Unnamed Genre',
      
    }));

    res.status(200).json(response);
  } catch (error) {
    console.error('Genre API Error:', error);
    res.status(500).json({ 
      message: 'Internal server error',
      error: error.message
    });
  }
}