import api from "../api";
import { IMovieDetail } from "@/types/IMovieDetail";
import axios from "axios"; // Ensure axios is imported

interface MovieResponse {
    page: number;
    results: IMovieDetail[];
    total_pages: number;
    total_results: number;
}

export const getNowPlayingMovies = async (page: number = 1): Promise<MovieResponse> => {
    try {
        const response = await api.get<MovieResponse>(`/movie/now_playing?language=en-US&page=${page}`);
        return response.data;
    } catch (err: unknown) {
        // Type guard for Axios error
        if (axios.isAxiosError(err) && err.response) {
            console.error("Error fetching now playing movies:", err.response.data);
            throw err.response.data;
        } else {
            console.error("Network or unexpected error:", err);
            throw new Error("Network error");
        }
    }
};
