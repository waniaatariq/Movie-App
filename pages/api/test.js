import dbConnect from '../../utils/mongodb';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  try {
    await dbConnect();
    
    // List all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections:', collections);
    
    // Check if movies collection exists
    const moviesCollectionExists = collections.some(c => c.name === 'movies');
    
    // Count documents in movies collection
    const movieCount = moviesCollectionExists 
      ? await mongoose.connection.db.collection('movies').countDocuments()
      : 0;
    
    res.status(200).json({
      connected: true,
      dbName: mongoose.connection.db.databaseName,
      collections: collections.map(c => c.name),
      moviesCollectionExists,
      movieCount
    });
  } catch (error) {
    console.error('Test error:', error);
    res.status(500).json({ error: error.message });
  }
}