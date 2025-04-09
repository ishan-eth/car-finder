// Sample car data
// Add this code to the top of the file, before the GET function

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    
    // Extract filter parameters
    const id = searchParams.get('id');
    const brand = searchParams.get('brand');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const fuelType = searchParams.get('fuelType');
    const seatingCapacity = searchParams.get('seatingCapacity');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const sort = searchParams.get('sort');
    
    // Filter cars based on parameters
    let filteredCars = [...cars];
    
    if (id) {
      // If ID is provided, we'll still return all matching cars but usually there will be only one
      filteredCars = filteredCars.filter(car => car.id === parseInt(id));
      
      return Response.json({
        cars: filteredCars,
        pagination: {
          total: filteredCars.length,
          page: 1,
          limit: filteredCars.length,
          totalPages: 1
        }
      });
    }
    
    // The rest of the existing filter code remains the same
    if (brand) {
      // ...existing code
    }
    
    // ...rest of the existing function
  }
  
const cars = [
    {
      id: 1,
      brand: "Toyota",
      model: "Camry",
      year: 2023,
      price: 25000,
      fuelType: "Hybrid",
      seatingCapacity: 5,
      mileage: "39 mpg",
      image: "/images/toyota-camry.jpg",
      description: "The reliable and fuel-efficient sedan with modern features."
    },
    {
      id: 2,
      brand: "Honda",
      model: "Civic",
      year: 2023,
      price: 22000,
      fuelType: "Gasoline",
      seatingCapacity: 5,
      mileage: "36 mpg",
      image: "/images/honda-civic.jpg",
      description: "Sporty and economical compact car with excellent reliability."
    },
    {
      id: 3,
      brand: "Tesla",
      model: "Model 3",
      year: 2023,
      price: 43000,
      fuelType: "Electric",
      seatingCapacity: 5,
      mileage: "132 MPGe",
      image: "/images/tesla-model3.jpg",
      description: "All-electric vehicle with advanced autopilot capabilities."
    },
    {
      id: 4,
      brand: "Ford",
      model: "F-150",
      year: 2023,
      price: 35000,
      fuelType: "Gasoline",
      seatingCapacity: 6,
      mileage: "25 mpg",
      image: "/images/ford-f150.jpg",
      description: "America's best-selling pickup truck with powerful performance."
    },
    {
      id: 5,
      brand: "BMW",
      model: "3 Series",
      year: 2023,
      price: 45000,
      fuelType: "Gasoline",
      seatingCapacity: 5,
      mileage: "30 mpg",
      image: "/images/bmw-3series.jpg",
      description: "Luxury sedan with dynamic handling and premium features."
    },
    {
      id: 6,
      brand: "Hyundai",
      model: "Tucson",
      year: 2023,
      price: 27000,
      fuelType: "Hybrid",
      seatingCapacity: 5,
      mileage: "38 mpg",
      image: "/images/hyundai-tucson.jpg",
      description: "Compact SUV with modern design and excellent warranty."
    },
    {
      id: 7,
      brand: "Chevrolet",
      model: "Bolt",
      year: 2023,
      price: 32000,
      fuelType: "Electric",
      seatingCapacity: 5,
      mileage: "120 MPGe",
      image: "/images/chevrolet-bolt.jpg",
      description: "Affordable all-electric vehicle with surprising range."
    },
    {
      id: 8,
      brand: "Audi",
      model: "Q5",
      year: 2023,
      price: 48000,
      fuelType: "Gasoline",
      seatingCapacity: 5,
      mileage: "25 mpg",
      image: "/images/audi-q5.jpg",
      description: "Premium compact SUV with sophisticated technology."
    },
    {
      id: 9,
      brand: "Mazda",
      model: "CX-5",
      year: 2023,
      price: 29000,
      fuelType: "Gasoline",
      seatingCapacity: 5,
      mileage: "28 mpg",
      image: "/images/mazda-cx5.jpg",
      description: "Stylish crossover with engaging driving dynamics."
    },
    {
      id: 10,
      brand: "Mercedes-Benz",
      model: "E-Class",
      year: 2023,
      price: 60000,
      fuelType: "Hybrid",
      seatingCapacity: 5,
      mileage: "30 mpg",
      image: "/images/mercedes-eclass.jpg",
      description: "Luxury vehicle with cutting-edge technology and comfort."
    },
    {
      id: 11,
      brand: "Kia",
      model: "Telluride",
      year: 2023,
      price: 35000,
      fuelType: "Gasoline",
      seatingCapacity: 8,
      mileage: "24 mpg",
      image: "/images/kia-telluride.jpg",
      description: "Award-winning midsize SUV with generous space."
    },
    {
      id: 12,
      brand: "Subaru",
      model: "Outback",
      year: 2023,
      price: 28000,
      fuelType: "Gasoline",
      seatingCapacity: 5,
      mileage: "29 mpg",
      image: "/images/subaru-outback.jpg",
      description: "Versatile wagon with standard all-wheel drive."
    },
    {
      id: 13,
      brand: "Lexus",
      model: "RX",
      year: 2023,
      price: 46000,
      fuelType: "Hybrid",
      seatingCapacity: 5,
      mileage: "31 mpg",
      image: "/images/lexus-rx.jpg",
      description: "Refined luxury SUV with excellent reliability."
    },
    {
      id: 14,
      brand: "Volkswagen",
      model: "ID.4",
      year: 2023,
      price: 38000,
      fuelType: "Electric",
      seatingCapacity: 5,
      mileage: "112 MPGe",
      image: "/images/volkswagen-id4.jpg",
      description: "Electric SUV with practical range and spacious interior."
    },
    {
      id: 15,
      brand: "Nissan",
      model: "Rogue",
      year: 2023,
      price: 27000,
      fuelType: "Gasoline",
      seatingCapacity: 5,
      mileage: "33 mpg",
      image: "/images/nissan-rogue.jpg",
      description: "Popular compact SUV with good fuel economy."
    }
  ];
  
  export async function GET(request) {
    const { searchParams } = new URL(request.url);
    
    // Extract filter parameters
    const brand = searchParams.get('brand');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const fuelType = searchParams.get('fuelType');
    const seatingCapacity = searchParams.get('seatingCapacity');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const sort = searchParams.get('sort');
    
    // Filter cars based on parameters
    let filteredCars = [...cars];
    
    if (brand) {
      filteredCars = filteredCars.filter(car => car.brand.toLowerCase() === brand.toLowerCase());
    }
    
    if (minPrice) {
      filteredCars = filteredCars.filter(car => car.price >= parseInt(minPrice));
    }
    
    if (maxPrice) {
      filteredCars = filteredCars.filter(car => car.price <= parseInt(maxPrice));
    }
    
    if (fuelType) {
      filteredCars = filteredCars.filter(car => car.fuelType.toLowerCase() === fuelType.toLowerCase());
    }
    
    if (seatingCapacity) {
      filteredCars = filteredCars.filter(car => car.seatingCapacity === parseInt(seatingCapacity));
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      filteredCars = filteredCars.filter(car => 
        car.brand.toLowerCase().includes(searchLower) || 
        car.model.toLowerCase().includes(searchLower)
      );
    }
    
    // Sort cars if requested
    if (sort) {
      switch (sort) {
        case 'price_asc':
          filteredCars.sort((a, b) => a.price - b.price);
          break;
        case 'price_desc':
          filteredCars.sort((a, b) => b.price - a.price);
          break;
        default:
          break;
      }
    }
    
    // Calculate pagination
    const totalCars = filteredCars.length;
    const totalPages = Math.ceil(totalCars / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedCars = filteredCars.slice(startIndex, endIndex);
    
    return Response.json({
      cars: paginatedCars,
      pagination: {
        total: totalCars,
        page,
        limit,
        totalPages
      }
    });
  }