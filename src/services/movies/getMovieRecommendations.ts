import api from "../api";
export const getMovieRecommendationsById = async (id: string | Array<string> | undefined) => {
    try {
        const { data } = await api.get(`/movie/${id}/recommendations`);
        return data;
    } catch (error) {
        throw error;
    }
};