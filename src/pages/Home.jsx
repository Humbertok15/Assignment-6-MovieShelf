import { useEffect, useState } from "react";
import { getPopularMovies } from "../services/movieService";
import MovieGrid from "../components/MovieGrid";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

function Home({ searchResults }) {
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadMovies() {
      try {
        setLoading(true);
        setError("");

        const movies = await getPopularMovies();

        if (isMounted) {
          setPopularMovies(movies);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Unable to load movies.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadMovies();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  const movies = searchResults ?? popularMovies;

  return (
    <main className="home-page">
      <h1>
        {searchResults !== null
          ? "Search Results"
          : "Popular Movies"}
      </h1>

      {movies.length === 0 ? (
        <p>No movies found. Try another search.</p>
      ) : (
        <MovieGrid movies={movies} />
      )}
    </main>
  );
}

export default Home;
