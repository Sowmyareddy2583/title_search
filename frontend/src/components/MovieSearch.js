import React, { useState } from 'react';
import axios from 'axios';
import './MovieSearch.css'; 

const MovieSearch = () => {
    const [title, setTitle] = useState('');
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault(); 

        // Clear previous state
        setError('');
        setMovie(null);

        // Validate input (only allow letters and spaces)
        const isValidTitle = /^[a-zA-Z\s]+$/.test(title);
        if (!isValidTitle) {
            setError('Please enter a valid movie title (letters and spaces only).');
            setTitle('');
            return;
        }

        try {
            // Make the GET request to the backend with the movie title
            const response = await axios.get(`http://localhost:3000/api/movies/search?title=${title}`);

            // Check if the movie was found
            if (response.data.movieFound) {
                setMovie(response.data.movie); // Set the movie details
            } else {
                setError('Movie not found'); // Show "Movie not found" if not found
            }
        } catch (err) {
            // Handle specific cases for 404 or general errors
            if (err.response && err.response.status === 404) {
                setError('Movie not found');
            } else {
                setError('An error occurred while searching for the movie');
            }
        } finally {
            // Clear the input field regardless of success or error
            setTitle('');
        }
    };

    return (
        <div className="container">
            <h1>Movie Search</h1>

            {/* Search form */}
            <form onSubmit={handleSearch} className="form">
                <input
                    type="text"
                    placeholder="Enter movie title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input"
                    required
                />
                <button type="submit" className="button">Search</button>
            </form>

            {/* Display error message */}
            {error && <p className="error">{error}</p>}

            {/* Display movie details if found */}
            {movie && (
                <div className="movie-details">
                    <h2>Movie Found:</h2>
                    <p><strong>Title:</strong> {movie.title}</p>
                    <p><strong>Director:</strong> {movie.director}</p>
                    <p><strong>Rating:</strong> {movie.rating}</p>
                </div>
            )}
        </div>
    );
};

export default MovieSearch;
