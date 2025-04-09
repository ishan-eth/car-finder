'use client';

import { createContext, useState, useEffect, useContext } from 'react';

const CarContext = createContext();

export function CarProvider({ children }) {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [filters, setFilters] = useState({
    brand: '',
    minPrice: '',
    maxPrice: '',
    fuelType: '',
    seatingCapacity: '',
    search: '',
    page: 1,
    sort: ''
  });
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0
  });
  
  // Theme state
  const [darkMode, setDarkMode] = useState(false);
  
  // Fetch cars based on filters
  const fetchCars = async () => {
    setLoading(true);
    try {
      // Build query string from filters
      const params = new URLSearchParams();
      
      if (filters.brand) params.append('brand', filters.brand);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
      if (filters.fuelType) params.append('fuelType', filters.fuelType);
      if (filters.seatingCapacity) params.append('seatingCapacity', filters.seatingCapacity);
      if (filters.search) params.append('search', filters.search);
      if (filters.sort) params.append('sort', filters.sort);
      
      params.append('page', filters.page);
      params.append('limit', pagination.limit);
      
      const response = await fetch(`/api/cars?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch cars');
      }
      
      const data = await response.json();
      setCars(data.cars);
      setPagination(data.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  // Load wishlist from localStorage on component mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('carWishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
    
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
    
    fetchCars();
  }, []);
  
  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('carWishlist', JSON.stringify(wishlist));
  }, [wishlist]);
  
  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  
  // Fetch cars when filters change
  useEffect(() => {
    fetchCars();
  }, [filters]);
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  
  // Toggle wishlist item
  const toggleWishlist = (car) => {
    setWishlist(prevWishlist => {
      // Check if car is already in wishlist
      const isInWishlist = prevWishlist.some(item => item.id === car.id);
      
      if (isInWishlist) {
        // Remove from wishlist
        return prevWishlist.filter(item => item.id !== car.id);
      } else {
        // Add to wishlist
        return [...prevWishlist, car];
      }
    });
  };
  
  // Check if a car is in the wishlist
  const isInWishlist = (carId) => {
    return wishlist.some(car => car.id === carId);
  };
  
  // Update filters
  const updateFilters = (newFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
      page: newFilters.page || 1 // Reset page when filters change
    }));
  };
  
  // Change page
  const changePage = (newPage) => {
    setFilters(prev => ({
      ...prev,
      page: newPage
    }));
  };
  
  return (
    <CarContext.Provider value={{
      cars,
      loading,
      error,
      wishlist,
      filters,
      pagination,
      darkMode,
      toggleDarkMode,
      toggleWishlist,
      isInWishlist,
      updateFilters,
      changePage
    }}>
      {children}
    </CarContext.Provider>
  );
}

export function useCars() {
  return useContext(CarContext);
}