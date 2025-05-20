import Config from "../../config";
import Image from "next/image";
import React, { useState } from "react";

interface IMovieCard {
    title: string;
    voteAverage?: number;
    posterPath?: string;
    releaseYear: number;
    description: string;
}

const MovieCard: React.FC<IMovieCard> = ({
                                             title,
                                             voteAverage,
                                             posterPath,
                                             releaseYear,
                                             description,
                                         }) => {
    const [isHovered, setIsHovered] = useState(false);
    const posterURL = posterPath
        ? `${Config.IMAGE_SOURCE}${posterPath}`
        : "https://via.placeholder.com/500x750?text=No+Image";

    // Calculate rating color based on score
    const getRatingColor = (score: number) => {
        if (score >= 8) return "text-green-500";
        if (score >= 6) return "text-yellow-500";
        return "text-red-500";
    };

    return (
        <div
            className="flex items-center justify-center h-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className={`mx-auto bg-white rounded-3xl shadow-xl transition-all duration-300 ${
                    isHovered ? "shadow-2xl transform -translate-y-2" : ""
                }`}
            >
                <div className="grid rounded-3xl max-w-[360px] shadow-sm bg-white flex-col group">
                    {/* Poster Image with overlay on hover */}
                    <div className="relative overflow-hidden rounded-t-3xl">
                        <Image
                            src={posterURL}
                            width={360}
                            height={200}
                            className="rounded-t-3xl justify-center grid object-cover h-[300px] w-full"
                            alt={title}
                            unoptimized
                        />

                        {/* Rating badge overlay */}
                        <div className="absolute top-3 right-3 bg-black bg-opacity-75 text-white px-2 py-1 rounded-full text-sm font-bold flex items-center gap-1">
              <span className={getRatingColor(voteAverage ?? 0)}>
                {typeof voteAverage === "number" ? voteAverage.toFixed(1) : "N/A"}
              </span>
                        </div>

                        {/* Year badge overlay */}
                        <div className="absolute top-3 left-3 bg-black bg-opacity-75 text-white px-2 py-1 rounded-full text-sm">
                            {releaseYear}
                        </div>
                    </div>

                    <div className="p-5 z-10">
                        <h3 className="font-bold text-lg line-clamp-1 mb-2 text-gray-800">{title}</h3>
                        <p className="text-sm text-gray-600 line-clamp-3 h-16 mb-4">{description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
