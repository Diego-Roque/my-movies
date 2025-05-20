'use client';

import React, { useEffect, useState, useCallback } from "react";
import { getPopularMovies } from "@/services/movies/getPopularMovies";
import MovieList from "@/components/MovieList/MovieList";
import Pagination from "@/components/Pagination/Pagination";

const PopularClientPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<never[]>([]); // Changed from never[] to any[]
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Optimized fetchMovies with useCallback
  const fetchMovies = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getPopularMovies(currentPage);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
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

  return (
      <div className={"max-w-7xl mx-auto p-4 space-y-8"}>
        <h3 className="text-3xl font-bold mb-6">Popular Movies</h3>

        {/* Loading indicator */}
        {loading ? (
            <h5 className="text-lg text-gray-500">Loading...</h5>
        ) : (
            <MovieList movies={movies} />
        )}

        {/* Pagination Component */}
        <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
        />
      </div>
  );
};

export default PopularClientPage;
