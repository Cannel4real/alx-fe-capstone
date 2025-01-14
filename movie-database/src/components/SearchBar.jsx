/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import axios from 'axios';
import MovieList from './MovieList';
import MovieDetails from './MovieDetails';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState(null);

  const fetchMovies = async () => {
    if (!query) return;
    const API_KEY = '21393866';
    try {
      const response = await axios.get(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
      if (response.data.Response === 'True') {
        setMovies(response.data.Search);
        setError(null);
      } else {
        setError(response.data.Error);
        setMovies([]);
      }
    } catch (err) {
      setError('Failed to fetch movies. Please try again later.');
    }
  };

  const fetchMovieDetails = async (id) => {
    const API_KEY = '21393866';
    try {
      const response = await axios.get(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
      setSelectedMovie(response.data);
    } catch (err) {
      setError('Failed to fetch movie details.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      
      <div className="container mx-auto px-4">
        {/* Search Bar */}
        <div className="relative top-5">
          <div className="flex items-center justify-center">
            <input
              type="text"
              className="w-full md:w-1/2 px-4 py-2 rounded-lg bg-gray-800 text-white"
              placeholder="Search for a movie..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              onClick={fetchMovies}
              className="ml-2 px-4 py-2 bg-customOrange rounded-lg text-white"
            >
              Search
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-center text-red-500 mt-4">
            {error}
          </p>
        )}

        {/* Movie List */}
        <div className="mt-8">
          {movies.length > 0 ? (
            <MovieList movies={movies} fetchMovieDetails={fetchMovieDetails} />
          ) : (
            <p className="text-center text-gray-400 mt-4">
              {error ? '' : 'Search for movies to see results here.'}
            </p>
          )}
        </div>

        {/* Movie Details Modal */}
        {selectedMovie && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white text-gray-900 rounded-lg p-6 max-w-md w-full shadow-lg">
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                onClick={() => setSelectedMovie(null)}
              >
                ✖
              </button>
              <MovieDetails movie={selectedMovie} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
