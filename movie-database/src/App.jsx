/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import NavBar from './components/NavBar';
import SignUpPage from './components/SignUpPage';
import bgPhoto from './assets/background.png';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center text-center text-white"
      style={{
        backgroundImage: `url(${bgPhoto})`,
      }}
    >
      <NavBar />
      <main className="p-4">
        <section className="flex flex-col items-center justify-center relative top-[-95px] w-[864px] space-y-10">
          <h1 className="text-center text-[64px] font-bold font-roboto leading-[73px]">
            Discover Your Next Favorite Movies and TV Shows
          </h1>
          <p>
            Explore a world of films, ratings, and reviews at your fingertips. Dive into the
            magic of cinema with CinemaKey.
          </p>
          <div className="space-x-4">
            <button
              className="bg-customOrange rounded-md px-5 py-1"
              onClick={() => navigate('/search')}
            >
              Explore
            </button>
            <button
              className="bg-customOrange rounded-md px-5 py-1 text-white"
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

function SearchPage() {
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
    <div className="min-h-screen bg-gray-900 text-white">
      <NavBar />
      <main className="p-4">
        <SearchBar query={query} setQuery={setQuery} fetchMovies={fetchMovies} />
        {error && <p className="text-red-500 text-center">{error}</p>}
        <MovieList movies={movies} fetchMovieDetails={fetchMovieDetails} />
        {selectedMovie && (
          <MovieDetails movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
        )}
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
}

export default App;
