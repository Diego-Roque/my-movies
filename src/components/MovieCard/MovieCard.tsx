import Config from "../../config";
import Image from "next/image";
import { useState } from "react";

interface IMovieCard {
    title: string;
    voteAverage?: number;
    posterPath: string;
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
    const poster = Config.IMAGE_SOURCE + posterPath;

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
                            src={poster}
                            width="360"
                            height="200"
                            className="rounded-t-3xl justify-center grid object-cover h-[300px] w-full"
                            alt={title}
                        />

                        {/* Rating badge overlay */}
                        <div className="absolute top-3 right-3 bg-black bg-opacity-75 text-white px-2 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                            <span className={getRatingColor(voteAverage ?? 0)}>
                                {typeof voteAverage === "number" ? voteAverage.toFixed(1) : "N/A"}
                            </span>
                            <svg
                                width="16px"
                                height="16px"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className={getRatingColor(voteAverage ?? 0)}
                            >
                                <path
                                    d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612
                                    14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757
                                    7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682
                                    21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096
                                    14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306
                                    17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115
                                    13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248
                                    11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515
                                    21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776Z"
                                    fill="currentColor"
                                />
                            </svg>
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
