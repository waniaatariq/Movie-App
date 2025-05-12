import mongoose from 'mongoose';

const genreSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // Custom ID field
  name: { type: String, required: true },

});

// Check if the model already exists before defining it
export default mongoose.models.Genre || mongoose.model('Genre', genreSchema);