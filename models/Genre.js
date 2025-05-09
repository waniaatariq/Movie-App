const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },  // e.g. "g1"
  name: { type: String, required: true }
});

module.exports = mongoose.model('Genre', genreSchema);