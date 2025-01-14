/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

function MovieList({ movies, saveToFavorites, removeFromFavorites, fetchMovieDetails }) {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  const handleMovieClick = (movieId) => {
    // Trigger the function to fetch and display movie details
    fetchMovieDetails(movieId);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {movies.map((movie) => {
        const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);
        return (
          <div
            key={movie.imdbID}
            className="bg-gray-800 rounded shadow hover:shadow-lg transition p-2 cursor-pointer"
            onClick={() => handleMovieClick(movie.imdbID)} // Click to view details
          >
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="w-full h-64 object-cover rounded"
            />
            <h2 className="text-lg font-bold mt-2">{movie.Title}</h2>
            <p className="text-sm text-gray-400">Release Year: {movie.Year}</p>
            <button
              className={`mt-2 px-4 py-1 rounded ${
                isFavorite ? 'bg-red-500 hover:bg-red-700' : 'bg-customOrange hover:bg-orange-400'
              }`}
              onClick={(e) => {
                // Prevent the click from bubbling up to the card's onClick handler
                e.stopPropagation();
                isFavorite ? removeFromFavorites(movie.imdbID) : saveToFavorites(movie);
              }}
            >
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default MovieList;
