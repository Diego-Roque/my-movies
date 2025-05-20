"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/services/api";
import MovieCard from "@/components/MovieCard/MovieCard";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
    overview: string;
}

const Home = () => {
    const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
    const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
    const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                const [popularResponse, topRatedResponse, upcomingResponse] = await Promise.all([
                    api.get("/movie/popular", { params: { language: "en-US", page: 1 } }),
                    api.get("/movie/top_rated", { params: { language: "en-US", page: 1 } }),
                    api.get("/movie/upcoming", { params: { language: "en-US", page: 1 } }),
                ]);

                setPopularMovies(popularResponse.data.results);
                setTopRatedMovies(topRatedResponse.data.results);
                setUpcomingMovies(upcomingResponse.data.results);
            } catch (error) {
                console.error("Error fetching movies:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    if (loading) return <div className="text-center py-10">Loading movies...</div>;

    return (
        <div className="max-w-7xl mx-auto p-4 space-y-10">
            <h1 className="text-4xl font-bold text-center mb-6">Movie Explorer</h1>

            <section>
                <h2 className="text-2xl font-semibold mb-4">🔥 Popular Movies</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {popularMovies.map((movie) => (
                        <Link key={movie.id} href={`/movie/${movie.id}`}>
                            <MovieCard
                                title={movie.title}
                                voteAverage={movie.vote_average}
                                posterPath={movie.poster_path}
                                releaseYear={new Date(movie.release_date).getFullYear()}
                                description={movie.overview}
                            />
                        </Link>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4">⭐ Top Rated Movies</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {topRatedMovies.map((movie) => (
                        <Link key={movie.id} href={`/movie/${movie.id}`}>
                            <MovieCard
                                title={movie.title}
                                voteAverage={movie.vote_average}
                                posterPath={movie.poster_path}
                                releaseYear={new Date(movie.release_date).getFullYear()}
                                description={movie.overview}
                            />
                        </Link>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4">🎬 Upcoming Movies</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {upcomingMovies.map((movie) => (
                        <Link key={movie.id} href={`/movie/${movie.id}`}>
                            <MovieCard
                                title={movie.title}
                                voteAverage={movie.vote_average}
                                posterPath={movie.poster_path}
                                releaseYear={new Date(movie.release_date).getFullYear()}
                                description={movie.overview}
                            />
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
