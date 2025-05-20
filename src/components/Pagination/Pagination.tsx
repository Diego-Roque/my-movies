import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    // Calculate which page numbers to display
    const getPageNumbers = () => {
        const range = [];
        const displayedPages = 5; // How many page numbers to show

        let start = Math.max(1, currentPage - Math.floor(displayedPages / 2));
        const end = Math.min(totalPages, start + displayedPages - 1);

        // Adjust start if we're near the end
        if (end === totalPages) {
            start = Math.max(1, end - displayedPages + 1);
        }

        for (let i = start; i <= end; i++) {
            range.push(i);
        }

        return range;
    };

    return (
        <nav className="flex justify-center mt-8 mb-4">
            <ul className="flex space-x-1">
                {/* Previous button */}
                <li>
                    <button
                        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-md ${
                            currentPage === 1
                                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                        }`}
                    >
                        &laquo; Prev
                    </button>
                </li>

                {/* First page if not in view */}
                {getPageNumbers()[0] > 1 && (
                    <>
                        <li>
                            <button
                                onClick={() => onPageChange(1)}
                                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md"
                            >
                                1
                            </button>
                        </li>
                        {getPageNumbers()[0] > 2 && (
                            <li>
                                <span className="px-3 py-2 text-gray-500">...</span>
                            </li>
                        )}
                    </>
                )}

                {/* Page numbers */}
                {getPageNumbers().map(page => (
                    <li key={page}>
                        <button
                            onClick={() => onPageChange(page)}
                            className={`px-4 py-2 rounded-md ${
                                currentPage === page
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                            }`}
                        >
                            {page}
                        </button>
                    </li>
                ))}

                {/* Last page if not in view */}
                {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
                    <>
                        {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && (
                            <li>
                                <span className="px-3 py-2 text-gray-500">...</span>
                            </li>
                        )}
                        <li>
                            <button
                                onClick={() => onPageChange(totalPages)}
                                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md"
                            >
                                {totalPages}
                            </button>
                        </li>
                    </>
                )}

                {/* Next button */}
                <li>
                    <button
                        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-md ${
                            currentPage === totalPages
                                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                        }`}
                    >
                        Next &raquo;
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;