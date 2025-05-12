import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // Custom ID field
  title: { type: String, required: true },
  releaseYear: { type: Number },
  genreId: { type: String },
  directorId: { type: String },
  description: { type: String },
  poster: { type: String },
  rating: { type: Number },
  
  // Add other fields as needed
}, {
  timestamps: true
});

// If the model already exists, use that, otherwise create a new one
export default mongoose.models.Movie || mongoose.model('Movie', movieSchema);