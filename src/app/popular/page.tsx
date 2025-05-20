'use client';

import React, { useEffect, useState } from "react";
import { getPopularMovies } from "@/services/movies/getPopularMovies";
import MovieList from "@/components/MovieList/MovieList";
import Pagination from "@/components/Pagination/Pagination";

const PopularClientPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    fetchMovies();
  }, [currentPage]);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const data = await getPopularMovies(currentPage);
      setMovies(data.results);
      setTotalPages(Math.min(data.total_pages, 500)); // Límite de API de 500 páginas
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

  return (
      <div className="max-w-7xl mx-auto p-4 space-y-8">
        <h3 className="text-3xl font-bold mb-6 text-center sm:text-left">Popular Movies</h3>

        {/* Loading Indicator */}
        {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        ) : (
            <>
              {/* Movie List (Responsive Grid) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                <MovieList movies={movies} />
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

export default PopularClientPage;
