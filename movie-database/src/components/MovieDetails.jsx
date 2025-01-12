/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

function MovieDetails({ movie, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-4 rounded max-w-lg w-full">
        <button
          onClick={onClose}
          className="text-red-500 absolute top-4 right-4"
        >
          Close
        </button>
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="w-full h-96 object-cover rounded"
        />
        <h2 className="text-2xl font-bold mt-4">{movie.Title}</h2>
        <p className="text-gray-300 mt-2">{movie.Plot}</p>
        <p className="text-sm text-gray-400">Genre: {movie.Genre}</p>
        <p className="text-sm text-gray-400">Actors: {movie.Actors}</p>
        <p className="text-sm text-gray-400">Ratings: {movie.Ratings?.map(r => `${r.Source}: ${r.Value}`).join(', ')}</p>
      </div>
    </div>
  );
}

export default MovieDetails;