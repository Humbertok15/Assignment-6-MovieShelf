const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL =
  import.meta.env.VITE_TMDB_BASE_URL ||
  "https://api.themoviedb.org/3";

async function fetchMovies(endpoint) {
  if (!API_KEY || API_KEY === "your_api_key_here") {
    throw new Error(
      "Please add a valid TMDB API key to your .env file."
    );
  }

  const separator = endpoint.includes("?") ? "&" : "?";
  const url = `${BASE_URL}${endpoint}${separator}api_key=${encodeURIComponent(API_KEY)}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `TMDB request failed: ${response.status}`
    );
  }

  return response.json();
}

export async function getPopularMovies() {
  const data = await fetchMovies("/movie/popular");
  return data.results ?? [];
}

export async function searchMovies(query) {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return [];
  }

  const data = await fetchMovies(
    `/search/movie?query=${encodeURIComponent(trimmedQuery)}`
  );

  return data.results ?? [];
}
