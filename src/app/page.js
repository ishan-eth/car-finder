'use client';

import { useState } from 'react';
import { useCars } from './context/CarContext';
import { Search, Filter, Sun, Moon, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

// Components
const Navbar = () => {
  const { darkMode, toggleDarkMode } = useCars();
  
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md p-4 transition-colors duration-300">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          Car Finder
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/wishlist" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
            Wishlist
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
      </div>
    </nav>
  );
};

// Search and Filter Component
const SearchFilters = () => {
  const { filters, updateFilters } = useCars();
  const [localFilters, setLocalFilters] = useState({
    search: filters.search,
    brand: filters.brand,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    fuelType: filters.fuelType,
    seatingCapacity: filters.seatingCapacity,
    sort: filters.sort
  });
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    updateFilters(localFilters);
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6 transition-colors duration-300">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-grow">
            <input
              type="text"
              name="search"
              value={localFilters.search}
              onChange={handleFilterChange}
              placeholder="Search cars..."
              className="w-full p-2 pl-10 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          
          {/* Brand */}
          <div className="w-full md:w-1/4">
            <select
              name="brand"
              value={localFilters.brand}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">All Brands</option>
              <option value="Toyota">Toyota</option>
              <option value="Honda">Honda</option>
              <option value="Tesla">Tesla</option>
              <option value="Ford">Ford</option>
              <option value="BMW">BMW</option>
              <option value="Hyundai">Hyundai</option>
              <option value="Chevrolet">Chevrolet</option>
              <option value="Audi">Audi</option>
              <option value="Mazda">Mazda</option>
              <option value="Mercedes-Benz">Mercedes-Benz</option>
              <option value="Kia">Kia</option>
              <option value="Subaru">Subaru</option>
              <option value="Lexus">Lexus</option>
              <option value="Volkswagen">Volkswagen</option>
              <option value="Nissan">Nissan</option>
            </select>
          </div>
          
          {/* Sort */}
          <div className="w-full md:w-1/4">
            <select
              name="sort"
              value={localFilters.sort}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">Sort By</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          {/* Price Range */}
          <div className="w-full md:w-1/4">
            <input
              type="number"
              name="minPrice"
              value={localFilters.minPrice}
              onChange={handleFilterChange}
              placeholder="Min Price"
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div className="w-full md:w-1/4">
            <input
              type="number"
              name="maxPrice"
              value={localFilters.maxPrice}
              onChange={handleFilterChange}
              placeholder="Max Price"
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          
          {/* Fuel Type */}
          <div className="w-full md:w-1/4">
            <select
              name="fuelType"
              value={localFilters.fuelType}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">All Fuel Types</option>
              <option value="Gasoline">Gasoline</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Electric">Electric</option>
            </select>
          </div>
          
          {/* Seating Capacity */}
          <div className="w-full md:w-1/4">
            <select
              name="seatingCapacity"
              value={localFilters.seatingCapacity}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">All Seating</option>
              <option value="2">2 Seats</option>
              <option value="4">4 Seats</option>
              <option value="5">5 Seats</option>
              <option value="6">6 Seats</option>
              <option value="7">7 Seats</option>
              <option value="8">8 Seats</option>
            </select>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </form>
    </div>
  );
};

// Car Card Component
const CarCard = ({ car }) => {
  const { toggleWishlist, isInWishlist } = useCars();
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={car.image || "https://via.placeholder.com/300x200?text=No+Image"}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover"
        />
        <button
          onClick={() => toggleWishlist(car)}
          className={`absolute top-2 right-2 p-2 rounded-full ${
            isInWishlist(car.id)
              ? 'bg-red-500 text-white'
              : 'bg-white text-gray-700 dark:bg-gray-700 dark:text-white'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill={isInWishlist(car.id) ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>
      <div className="p-4">
        <Link href={`/car/${car.id}`}>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {car.brand} {car.model}
          </h3>
        </Link>
        <p className="text-gray-600 dark:text-gray-300">{car.year}</p>
        <div className="flex justify-between items-center mt-2">
          <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
            ${car.price.toLocaleString()}
          </p>
          <div className="flex items-center">
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded">
              {car.fuelType}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center mt-2 text-sm text-gray-600 dark:text-gray-400">
          <span>Seats: {car.seatingCapacity}</span>
          <span>{car.mileage}</span>
        </div>
      </div>
    </div>
  );
};

// Pagination Component
const Pagination = () => {
  const { pagination, changePage } = useCars();
  
  const renderPageNumbers = () => {
    const pages = [];
    const { page, totalPages } = pagination;
    
    // Always show first page
    pages.push(
      <button
        key={1}
        onClick={() => changePage(1)}
        className={`px-3 py-1 rounded-md ${
          page === 1
            ? 'bg-blue-600 text-white'
            : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300'
        }`}
      >
        1
      </button>
    );
    
    // Show ellipsis if not showing page 2
    if (page > 3) {
      pages.push(
        <span key="ellipsis1" className="px-3 py-1">
          ...
        </span>
      );
    }
    
    // Show current page and neighbors
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
      if (i === 1 || i === totalPages) continue; // Skip first and last pages (handled separately)
      pages.push(
        <button
          key={i}
          onClick={() => changePage(i)}
          className={`px-3 py-1 rounded-md ${
            page === i
              ? 'bg-blue-600 text-white'
              : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          {i}
        </button>
      );
    }
    
    // Show ellipsis if not showing second-to-last page
    if (page < totalPages - 2) {
      pages.push(
        <span key="ellipsis2" className="px-3 py-1">
          ...
        </span>
      );
    }
    
    // Always show last page if it exists
    if (totalPages > 1) {
      pages.push(
        <button
          key={totalPages}
          onClick={() => changePage(totalPages)}
          className={`px-3 py-1 rounded-md ${
            page === totalPages
              ? 'bg-blue-600 text-white'
              : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          {totalPages}
        </button>
      );
    }
    
    return pages;
  };
  
  if (pagination.totalPages <= 1) return null;
  
  return (
    <div className="flex justify-center mt-6 gap-2">
      <button
        onClick={() => changePage(Math.max(1, pagination.page - 1))}
        disabled={pagination.page === 1}
        className="flex items-center px-3 py-1 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      
      {renderPageNumbers()}
      
      <button
        onClick={() => changePage(Math.min(pagination.totalPages, pagination.page + 1))}
        disabled={pagination.page === pagination.totalPages}
        className="flex items-center px-3 py-1 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

// Main Component
export default function Home() {
  const { cars, loading, error } = useCars();
  
  return (
    <main>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
          Find Your Perfect Car
        </h1>
        
        <SearchFilters />
        
        {loading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 text-red-700 p-4 rounded-md text-center">
            {error}
          </div>
        ) : cars.length === 0 ? (
          <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 p-4 rounded-md text-center">
            No cars found. Try adjusting your filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
        
        <Pagination />
      </div>
    </main>
  );
}