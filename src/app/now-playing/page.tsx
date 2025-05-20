'use client';

import React, { useEffect, useState } from "react";
import { getNowPlayingMovies } from "@/services/movies/getNowPlayingMovies";
import MovieCard from "@/components/MovieCard/MovieCard";
import Pagination from "@/components/Pagination/Pagination";
import { useRouter } from "next/navigation";

const NowPlayingClientPage = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  useEffect(() => {
    fetchMovies();
  }, [currentPage]);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const data = await getNowPlayingMovies(currentPage);
      setMovies(data.results);
      setTotalPages(Math.min(data.total_pages, 500)); // API tiene un límite de 500 páginas
    } catch (err) {
      console.error("Error loading movies: ", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToMovie = (id: number) => {
    router.push(`/movie/${id}`);
  };

  return (
      <div className="max-w-7xl mx-auto p-4 space-y-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-3xl font-bold">Now Playing</h3>
        </div>

        {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        ) : (
            <>
              {/* Responsive Grid Layout */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {movies?.map((movie) => (
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

              {/* Pagination component */}
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

export default NowPlayingClientPage;
