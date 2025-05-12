import dbConnect from '../../../../utils/mongodb';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();
    const db = mongoose.connection.db;

    // Explicitly use the 'genre' collection
    const genreCollectionName = 'genre';

    // Check if the id is a valid ObjectId
    const isValidObjectId = mongoose.Types.ObjectId.isValid(id);

    // Find the genre
    const genre = await db.collection(genreCollectionName).findOne({
      $or: [
        { id: id }, // Match custom string ID
        ...(isValidObjectId ? [{ _id: new mongoose.Types.ObjectId(id) }] : []) // Only check _id if valid
      ]
    });

    if (!genre) {
      console.log(`Genre with ID ${id} not found in collection ${genreCollectionName}`);
      return res.status(404).json({ message: 'Genre not found' });
    }

    // Find movies with this genre
    const movies = await db.collection('movies').find({
      $or: [
        { genreId: id },
        { genreIds: id },
        { 'genres.id': id },
        { genre_id: id }
      ]
    }).toArray();

    console.log(`Found ${movies.length} movies for genre ${id}`);

    res.status(200).json({
      genreName: genre.name || genre.genreName,
      movies: movies.map(movie => ({
        id: movie.id || movie._id.toString(),
        title: movie.title,
        releaseYear: movie.releaseYear,
        poster: movie.poster,
        description: movie.description
      }))
    });

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ 
      message: 'Internal server error',
      error: error.message 
    });
  }
}