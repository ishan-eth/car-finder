'use client';

import { useCars } from '../../context/CarContext';
import { ArrowLeft, Sun, Moon } from 'lucide-react';
import Link from 'next/link';

// Car Card Component for Wishlist
const WishlistCard = ({ car }) => {
  const { toggleWishlist } = useCars();
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-1/3 h-48">
          <img
            src={car.image || "https://via.placeholder.com/300x200?text=No+Image"}
            alt={`${car.brand} ${car.model}`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="sm:w-2/3 p-4">
          <div className="flex justify-between items-start">
            <Link href={`/car/${car.id}`}>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {car.brand} {car.model}
              </h3>
            </Link>
            <button
              onClick={() => toggleWishlist(car)}
              className="p-2 rounded-full bg-red-500 text-white"
              aria-label="Remove from wishlist"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300">{car.year}</p>
          
          <div className="mt-2">
            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
              ${car.price.toLocaleString()}
            </p>
          </div>
          
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded">
              {car.fuelType}
            </span>
            <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded">
              {car.seatingCapacity} Seats
            </span>
            <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded">
              {car.mileage}
            </span>
          </div>
          
          <p className="mt-2 text-gray-600 dark:text-gray-300 line-clamp-2">
            {car.description}
          </p>
          
          <div className="mt-3">
            <Link 
              href={`/car/${car.id}`}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Wishlist Component
export default function Wishlist() {
  const { wishlist, darkMode, toggleDarkMode } = useCars();
  
  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <nav className="bg-white dark:bg-gray-800 shadow-md p-4 transition-colors duration-300">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            Car Finder
          </Link>
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700" />
            )}
          </button>
        </div>
      </nav>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Link href="/" className="flex items-center text-blue-600 hover:underline mr-4">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Cars
            </Link>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              My Wishlist ({wishlist.length})
            </h1>
          </div>
          
          {wishlist.length > 0 && (
            <button 
              onClick={() => {
                // Clear all wishlist items
                localStorage.setItem('carWishlist', JSON.stringify([]));
                window.location.reload();
              }}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Clear Wishlist
            </button>
          )}
        </div>
        
        {wishlist.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mt-4">
              Your wishlist is empty
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Add cars to your wishlist to keep track of your favorites.
            </p>
            <Link href="/" className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors">
              Explore Cars
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {wishlist.map(car => (
              <WishlistCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}