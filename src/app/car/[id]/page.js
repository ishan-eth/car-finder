'use client';
import { useState, useEffect } from 'react';
import { useCars } from '@/context/CarContext';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CarDetails({ params }) {
  const { id } = params;
  const { toggleWishlist, isInWishlist } = useCars();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await fetch(`/api/cars?id=${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch car details');
        }
        
        const data = await response.json();
        
        // Find the car with the matching ID
        const foundCar = data.cars.find(car => car.id === parseInt(id));
        
        if (!foundCar) {
          throw new Error('Car not found');
        }
        
        setCar(foundCar);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCarDetails();
  }, [id]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (error || !car) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 text-red-700 p-4 rounded-md text-center">
          {error || 'Car not found'}
        </div>
        <div className="mt-4 text-center">
          <Link href="/" className="text-blue-600 hover:underline">
            Back to Cars
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="flex items-center text-blue-600 mb-6 hover:underline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Cars
        </Link>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={car.image || "https://via.placeholder.com/600x400?text=No+Image"}
                alt={`${car.brand} ${car.model}`}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-6">
              <div className="flex justify-between items-start">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                  {car.brand} {car.model}
                </h1>
                <button
                  onClick={() => toggleWishlist(car)}
                  className={`p-2 rounded-full ${
                    isInWishlist(car.id)
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-white'
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
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
              
              <p className="text-gray-600 dark:text-gray-300 mt-2">{car.year}</p>
              
              <div className="mt-6">
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  ${car.price.toLocaleString()}
                </p>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
                  <p className="text-gray-500 dark:text-gray-400">Fuel Type</p>
                  <p className="font-semibold text-gray-800 dark:text-white">{car.fuelType}</p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
                  <p className="text-gray-500 dark:text-gray-400">Seating</p>
                  <p className="font-semibold text-gray-800 dark:text-white">{car.seatingCapacity} Seats</p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
                  <p className="text-gray-500 dark:text-gray-400">Mileage</p>
                  <p className="font-semibold text-gray-800 dark:text-white">{car.mileage}</p>
                </div>
              </div>
              
              <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Description</h2>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  {car.description}
                </p>
              </div>
              
              <div className="mt-8">
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md w-full transition-colors">
                  Contact Dealer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}