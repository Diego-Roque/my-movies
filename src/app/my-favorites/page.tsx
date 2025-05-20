"use client";

import React, { useEffect, useState } from "react";
import MovieCard from "@/components/MovieCard/MovieCard";
import Link from "next/link";
import { useRouter } from "next/navigation";

const MyFavoritesPage = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    try {
      if (typeof window !== 'undefined') {
        const storedFavorites = localStorage.getItem("favoriteMovies");
        const favoriteMovies = storedFavorites ? JSON.parse(storedFavorites) : [];
        setMovies(favoriteMovies);
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
      setMovies([]);
    }
  };

  const removeFavorite = (id: number, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      const storedFavorites = localStorage.getItem("favoriteMovies");
      const favoriteMovies = storedFavorites ? JSON.parse(storedFavorites) : [];
      const updatedFavorites = favoriteMovies.filter((fav: any) => fav.id !== id);
      localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));
      setMovies(updatedFavorites);
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  return (
      <div className="max-w-7xl mx-auto p-4 space-y-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-3xl font-bold">Mis Películas Favoritas</h3>
        </div>

        {movies.length === 0 ? (
            <div className="text-center mt-10 text-gray-600 bg-gray-100 p-10 rounded-lg">
              <p className="text-xl mb-4">No tienes películas favoritas guardadas.</p>
              <p className="text-sm mb-6">
                Ve a la página de detalles de una película y haz clic en Añadir a favoritos para guardarla.
              </p>
              <button
                  onClick={() => router.push('/')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md"
              >
                Explorar Películas
              </button>
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {movies.map((movie) => (
                  <div key={movie.id} className="relative group">
                    <Link href={`/movie/${movie.id}`}>
                      <div className="transition-transform transform hover:scale-105 rounded-lg overflow-hidden shadow-lg">
                        <MovieCard
                            title={movie.title}
                            voteAverage={movie.voteAverage}
                            posterPath={movie.posterPath}
                            releaseYear={movie.releaseYear}
                            description={movie.description}
                        />
                      </div>
                    </Link>
                    <button
                        onClick={(e) => removeFavorite(movie.id, e)}
                        className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        aria-label="Eliminar de favoritos"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
              ))}
            </div>
        )}
      </div>
  );
};

export default MyFavoritesPage;
