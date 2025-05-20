'use client';

import React, { useEffect, useState, useCallback } from "react";
import { getTopRatedMovies } from "@/services/movies/getTopRatedMovies";
import MovieCard from "@/components/MovieCard/MovieCard";
import Pagination from "@/components/Pagination/Pagination";
import { useRouter } from "next/navigation";
import { IMovieDetail } from "@/types/IMovieDetail";

const TopRatedClientPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<IMovieDetail[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const router = useRouter();

  // Optimized fetchMovies with useCallback
  const fetchMovies = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getTopRatedMovies(currentPage);
      setMovies(data.results);
      setTotalPages(Math.min(data.total_pages, 500)); // API limit of 500 pages
    } catch (err) {
      console.error("Error loading movies: ", err);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  // Effect to fetch movies with a properly handled promise
  useEffect(() => {
    (async () => {
      await fetchMovies();
    })();
  }, [fetchMovies]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToMovie = (id: number) => {
    router.push(`/movie/${id}`);
  };

  return (
      <div className="max-w-7xl mx-auto p-4 space-y-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-3xl font-bold text-center sm:text-left">⭐ Top Rated Movies</h3>
        </div>

        {/* Loading Indicator */}
        {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        ) : (
            <>
              {/* Movie List (Responsive Grid) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {movies.map((movie) => (
                    <div
                        key={movie.id}
                        className="cursor-pointer transition-transform transform hover:scale-105 rounded-lg overflow-hidden shadow-lg"
                        onClick={() => navigateToMovie(movie.id)}
                    >
                      <MovieCard
                          title={movie.title}
                          voteAverage={movie.vote_average}
                          posterPath={movie.poster_path}
                          releaseYear={new Date(movie.release_date).getFullYear()}
                          description={movie.overview}
                      />
                    </div>
                ))}
              </div>

              {/* Pagination Component */}
              <div className="flex justify-center mt-8">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
              </div>
            </>
        )}
      </div>
  );
};

export default TopRatedClientPage;
