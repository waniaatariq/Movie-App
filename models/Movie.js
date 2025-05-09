// filepath: c:\Web\Applied Programming\Practice\AP\movie-app\models\Movie.js
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  directorId: { type: String, required: true },
  description: { type: String, required: true },
  releaseYear: { type: Number, required: true },
  genreId: { type: String, required: true },
  rating: { type: Number, required: true },
  poster: { type: String, required: true },
});

module.exports = mongoose.models.Movie || mongoose.model('Movie', movieSchema);