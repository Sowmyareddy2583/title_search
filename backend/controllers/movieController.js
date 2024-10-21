const Movie  = require('../models/movieModel')

// Get all movies
 exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find()
    res.status(200).json({
        status: 'success',
        data: movies
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
 }

 exports.createMovie = async (req, res) => {
    try {
      const newMovie = await Movie.create({
        title: req.body.title.toLowerCase(),  
        director: req.body.director,  
        rating: req.body.rating  
      });
  
      res.status(201).json({
        status: 'success',
        data: newMovie
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  
  // Search for a movie by title
 exports.searchMovie = async (req, res) => {
    const { title } = req.query;
    console.log("Searching for movie:", title); 

    try {
        const movie = await Movie.findOne({ title: title.toLowerCase() });
        if (movie) {
            return res.status(200).json({ movieFound: true, movie });
        } else {
            return res.status(404).json({ movieFound: false, message: 'Movie not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


  