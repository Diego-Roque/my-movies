"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import clsx from 'clsx';

const links = [
    { href: "/popular", label: "Popular" },
    { href: "/now-playing", label: "Now Playing" },
    { href: "/top-rated", label: "Top Rated" },
    { href: "/my-favorites", label: "My Favorites" },
];

const Header = () => {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Listen for scroll events
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={clsx(
                "fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300",
                isScrolled ? "bg-white shadow-md py-2" : "bg-white/90 backdrop-blur-sm py-4"
            )}
        >
            <div className='container mx-auto flex items-center justify-between px-4 '>
                <Link href="/" className='flex items-center text-green-500'>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-8 h-8 text-blue-500 mr-2"
                    >
                        <path d="M19.82 2H4.18C2.97 2 2 2.97 2 4.18v15.64C2 21.03 2.97 22 4.18 22h15.64c1.21 0 2.18-.97 2.18-2.18V4.18C22 2.97 21.03 2 19.82 2z" />
                        <path d="M7 2v20" />
                        <path d="M17 2v20" />
                        <path d="M2 12h20" />
                        <path d="M2 7h5" />
                        <path d="M2 17h5" />
                        <path d="M17 17h5" />
                        <path d="M17 7h5" />
                    </svg>
                    <span className='text-xl font-bold text-gray-800 hover:text-blue-500 transition-colors'>
            DR <span className={"text-blue-500"}>Movies</span>
          </span>
                </Link>


                <button
                    className="md:hidden focus:outline-none"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                    </svg>
                </button>

                {/* Desktop navigation */}
                <nav className="hidden md:flex space-x-8">
                    {links.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            className={clsx(
                                "relative font-medium transition-colors hover:text-blue-600 px-2 py-1",
                                pathname === href
                                    ? "text-blue-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-blue-600"
                                    : "text-gray-600"
                            )}
                        >
                            {label}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Mobile navigation */}
            {isMobileMenuOpen && (
                <nav className="md:hidden bg-white border-t mt-2 py-2">
                    <div className="container mx-auto px-4 flex flex-col space-y-3">
                        {links.map(({ href, label }) => (
                            <Link
                                key={href}
                                href={href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={clsx(
                                    "px-4 py-2 rounded-lg font-medium transition-colors",
                                    pathname === href
                                        ? "bg-blue-50 text-blue-600"
                                        : "text-gray-600 hover:bg-gray-50"
                                )}
                            >
                                {label}
                            </Link>
                        ))}
                    </div>
                </nav>
            )}
        </header>
    );
}

export default Header;