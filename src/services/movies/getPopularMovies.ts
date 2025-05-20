import api from "../api";
import { IMovieDetail } from "@/types/IMovieDetail";
import axios from "axios";

interface MovieResponse {
    page: number;
    results: IMovieDetail[];
    total_pages: number;
    total_results: number;
}

export const getPopularMovies = async (page: number = 1): Promise<MovieResponse> => {
    try {
        const response = await api.get<MovieResponse>(`/movie/popular?language=en-US&page=${page}`);
        return response.data;
    } catch (err: unknown) {
        if (axios.isAxiosError(err) && err.response) {
            console.error("Error fetching popular movies:", err.response.data);
            throw err.response.data;
        } else {
            console.error("Network or unexpected error:", err);
            throw new Error("Network error");
        }
    }
};
