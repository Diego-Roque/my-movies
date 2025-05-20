"use client";

import React, { useEffect, useState, useCallback } from "react";
import { IMovieDetail } from "@/types/IMovieDetail";
import Image from "next/image";
import { getMovieById } from "@/services/movies/getMovieById";
import { useParams } from "next/navigation";
import { getMovieRecommendationsById } from "@/services/movies/getMovieRecommendations";
import Link from "next/link";
import MovieCard from "@/components/MovieCard/MovieCard";

interface FavoriteMovie {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
  release_date: string;
  overview: string;
  genres?: { name: string }[];
}

const MovieDetailPage = () => {
  const params = useParams();
  const id = params.id as string;

  const [movie, setMovie] = useState<IMovieDetail | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [recommendations, setRecommendations] = useState<IMovieDetail[]>([]);

  const fetchMovie = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getMovieById(id);
      setMovie(data);

      const recommendedData = await getMovieRecommendationsById(id);
      setRecommendations(recommendedData.results || []);
    } catch (error) {
      console.error("Error loading movie details:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const checkIfFavorite = useCallback(() => {
    try {
      const storedFavorites = localStorage.getItem("favoriteMovies");
      const favoriteMovies: FavoriteMovie[] = storedFavorites ? JSON.parse(storedFavorites) : [];
      setIsFavorite(favoriteMovies.some((fav) => fav.id === Number(id)));
    } catch (error) {
      console.error("Error checking favorite status:", error);
    }
  }, [id]);

  const handleToggleFavorite = useCallback(() => {
    if (!movie) return;

    try {
      const storedFavorites = localStorage.getItem("favoriteMovies");
      const favoriteMovies: FavoriteMovie[] = storedFavorites ? JSON.parse(storedFavorites) : [];

      if (isFavorite) {
        const updatedFavorites = favoriteMovies.filter((fav) => fav.id !== movie.id);
        localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));
      } else {
        const newFavorite: FavoriteMovie = {
          id: movie.id,
          title: movie.title,
          vote_average: movie.vote_average,
          poster_path: movie.poster_path,
          release_date: movie.release_date,
          overview: movie.overview,
          genres: movie.genres,
        };
        favoriteMovies.push(newFavorite);
        localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
      }

      setIsFavorite((prev) => !prev);
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  }, [movie, isFavorite]);

  useEffect(() => {
    if (id) {
      (async () => {
        await fetchMovie();
      })();
    }
  }, [fetchMovie, id]);



  useEffect(() => {
    if (movie) {
      checkIfFavorite();
    }
  }, [movie, checkIfFavorite]);

  if (loading) {
    return <div className="text-center py-10">Loading movie details...</div>;
  }

  if (!movie) {
    return <div className="text-center py-10">No movie found.</div>;
  }

  return (
      <div className="max-w-7xl mx-auto p-4 space-y-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Movie Poster */}
          <div className="w-full lg:w-1/3 flex justify-center lg:justify-start">
            <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded-lg shadow-lg w-full max-w-sm"
                width={400}
                height={600}
                priority
            />
          </div>

          {/* Movie Information */}
          <div className="flex flex-col flex-1 space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">{movie.title}</h1>
            {movie.tagline && <p className="text-gray-500 italic">{movie.tagline}</p>}
            <p className="text-gray-700">{movie.overview}</p>

            <div className="flex flex-wrap gap-4 mt-4">
              <div><strong>Genres:</strong> {movie.genres?.map((g) => g.name).join(", ")}</div>
              <div><strong>Release:</strong> {movie.release_date}</div>
              <div><strong>Rating:</strong> <span className="text-yellow-500">{movie.vote_average.toFixed(1)}</span></div>
            </div>

            {/* Favorite Button */}
            <button
                onClick={handleToggleFavorite}
                className={`px-4 py-2 rounded-md text-white font-bold transition-transform transform hover:scale-105 ${
                    isFavorite ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
                }`}
            >
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          </div>
        </div>

        {/* Recommended Movies */}
        <div className="mt-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Recommended Movies</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {recommendations.length > 0 ? (
                recommendations.slice(0, 10).map((rec) => (
                    <Link key={rec.id} href={`/movie/${rec.id}`}>
                      <MovieCard
                          title={rec.title}
                          voteAverage={rec.vote_average}
                          posterPath={rec.poster_path}
                          releaseYear={new Date(rec.release_date).getFullYear()}
                          description={rec.overview}
                      />
                    </Link>
                ))
            ) : (
                <p className="text-center col-span-full text-gray-500">No recommendations available.</p>
            )}
          </div>
        </div>
      </div>
  );
};

export default MovieDetailPage;
