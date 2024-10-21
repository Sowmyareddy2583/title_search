const express = require('express')
const movieController = require('../controllers/movieController')
const router = express.Router()


router.route('/').get(movieController.getMovies).post(movieController.createMovie)
router.route('/search').get(movieController.searchMovie);




module.exports = router