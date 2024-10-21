const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Movie title is required']
  },
  director: {
    type: String,
    required: [true, 'Director name is required']
  },
  rating: {
    type: Number,
    required: [true, 'Movie rating is required']
  }
});

// Middleware to convert title to lowercase before saving
movieSchema.pre('save', function(next) {
  this.title = this.title.toLowerCase();
  next();
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
