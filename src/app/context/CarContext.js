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
  
  // Load wishlist and dark mode from localStorage on component mount
  useEffect(() => {
    // Function to handle initialization
    const initializeAppState = () => {
      // Initialize wishlist
      const savedWishlist = localStorage.getItem('carWishlist');
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
      
      // Initialize dark mode
      const savedDarkMode = localStorage.getItem('darkMode');
      if (savedDarkMode !== null) {
        const isDarkMode = JSON.parse(savedDarkMode);
        setDarkMode(isDarkMode);
        
        // Apply dark mode class to html element
        if (isDarkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    };
    
    // Call initialization function
    initializeAppState();
    
    // Fetch initial car data
    fetchCars();
  }, []);
  
  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('carWishlist', JSON.stringify(wishlist));
  }, [wishlist]);
  
  // Save dark mode preference and update DOM whenever it changes
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
    console.log("Current dark mode state:", darkMode);
    setDarkMode(prev => {
      const newMode = !prev;
      console.log("New dark mode state:", newMode);
      
      // Log the classList before change
      console.log("HTML classes before:", document.documentElement.classList);
      
      if (newMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      // Log the classList after change
      console.log("HTML classes after:", document.documentElement.classList);
      
      return newMode;
    });
  };
  
  // Toggle wishlist item
  // In src/app/context/CarContext.js
// Update the toggleWishlist function:

// Toggle wishlist item
const toggleWishlist = (car) => {
  console.log("Toggling wishlist for car:", car);
  
  setWishlist(prevWishlist => {
    // Check if car is already in wishlist
    const isInWishlist = prevWishlist.some(item => item.id === car.id);
    let newWishlist;
    
    if (isInWishlist) {
      // Remove from wishlist
      console.log("Removing car from wishlist");
      newWishlist = prevWishlist.filter(item => item.id !== car.id);
    } else {
      // Add to wishlist
      console.log("Adding car to wishlist");
      newWishlist = [...prevWishlist, car];
    }
    
    // Update localStorage
    localStorage.setItem('carWishlist', JSON.stringify(newWishlist));
    console.log("New wishlist:", newWishlist);
    
    return newWishlist;
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