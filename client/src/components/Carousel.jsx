/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import header1 from '../assets/header1.jpg';
import header2 from '../assets/header2.jpg';
import header3 from '../assets/header3.jpg';
import header4 from '../assets/header4.jpg';
import header5 from '../assets/header5.jpg';
import header6 from '../assets/header6.jpg';

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const autoPlayDelay = 5000;

    const slides = [
        {
            img: header1,
            title: 'Beautiful House in the Suburbs',
            description: 'A stunning 4 bedroom house located in a peaceful neighborhood.'
        },
        {
            img: header2,
            title: 'Modern Apartment',
            description: 'A luxurious apartment in the heart of the city with a beautiful skyline view.'
        },
        {
            img: header3,
            title: 'Cozy Cottage',
            description: 'A charming cottage surrounded by nature, perfect for a weekend getaway.'
        },
        {
            img: header4,
            title: 'Spacious Villa',
            description: 'A spacious villa with a private pool and garden, perfect for family vacations.'
        },
        {
            img: header5,
            title: 'Rustic Cabin',
            description: 'A cozy cabin nestled in the mountains, ideal for a peaceful retreat.'
        },
        {
            img: header6,
            title: 'Luxury Penthouse',
            description: 'A luxurious penthouse with breathtaking views of the city skylinne.'
        }
    ];

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
    };

    useEffect(() => {
        const autoPlay = setInterval(nextSlide, autoPlayDelay);
        return () => clearInterval(autoPlay);
    }, [currentIndex]);

    return (
        <div className="relative w-full h-[20vh] md:h-[50vh] lg:h-screen overflow-hidden">
            <div className="relative w-full h-full">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {slides.map((slide, index) => (
                        <div key={index} className="w-full flex-shrink-0 relative">
                            <img
                                src={slide.img}
                                alt={slide.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-zinc-200 bg-opacity-45 flex flex-col items-center px-4 text-zinc-800 bg-blend-multiply">
                                <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-8xl font-bold mb-2 font-lobster tracking-wider md:mt-44 mt-8">
                                    Welcome to <span className="text-transparent bg-gradient-to-br from-yellow-200 via-yellow-600 to-yellow-900 bg-clip-text font-extrabold tracking-widest">Elysium</span>
                                </h1>
                                <p className="text-xs sm:text-base md:text-lg lg:text-xl mb-4 font-noto-serif md:mt-1">
                                    Find your dream home with our comprehensive listings.
                                </p>
                                <h2 className="text-lg sm:text-sm md:text-2xl lg:text-5xl font-bold text-zinc-900 font-lobster tracking-wider md:mt-4 sm:mt-8">
                                    {slide.title}
                                </h2>
                                <p className="mt-2 sm:mt-2 text-[10px] sm:text-xs md:text-base lg:text-lg font-noto-serif">
                                    {slide.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <button
                className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 text-white bg-opacity-80 px-3 py-2 rounded-full hover:bg-opacity-100 z-10"
                onClick={prevSlide}
            >
                &#10094;
            </button>
            <button
                className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 text-white bg-opacity-80 px-3 py-2 rounded-full hover:bg-opacity-100 z-10"
                onClick={nextSlide}
            >
                &#10095;
            </button>
        </div>
    );
};

export default Carousel;
