import { create } from 'zustand';

export interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  images: string[];
  rating: number;
  reviewCount: number;
  price: number;
  currency: string;
  description: string;
  highlights: string[];
  category: 'beach' | 'mountain' | 'city' | 'countryside' | 'cultural';
  duration: string;
  difficulty: 'easy' | 'moderate' | 'challenging';
  bestTime: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  amenities: string[];
  tags: string[];
  featured: boolean;
  trending: boolean;
}

interface DestinationStore {
  destinations: Destination[];
  featuredDestinations: Destination[];
  trendingDestinations: Destination[];
  searchQuery: string;
  selectedCategory: string;
  isLoading: boolean;
  setDestinations: (destinations: Destination[]) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setLoading: (loading: boolean) => void;
  getDestinationById: (id: string) => Destination | undefined;
  getFilteredDestinations: () => Destination[];
}

// Mock data
const mockDestinations: Destination[] = [
  {
    id: '1',
    name: 'Santorini',
    country: 'Greece',
    image: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg',
    images: [
      'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg',
      'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg',
      'https://images.pexels.com/photos/3264723/pexels-photo-3264723.jpeg',
    ],
    rating: 4.8,
    reviewCount: 2847,
    price: 1299,
    currency: 'USD',
    description: 'Experience the magic of Santorini with its iconic blue-domed churches, stunning sunsets, and crystal-clear waters. This volcanic island offers a perfect blend of romance, culture, and natural beauty.',
    highlights: [
      'Breathtaking sunset views from Oia',
      'Traditional Cycladic architecture',
      'World-class wineries',
      'Black sand beaches',
      'Ancient archaeological sites'
    ],
    category: 'beach',
    duration: '5-7 days',
    difficulty: 'easy',
    bestTime: 'April to October',
    coordinates: {
      latitude: 36.3932,
      longitude: 25.4615
    },
    amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Airport Transfer'],
    tags: ['romantic', 'photography', 'wine', 'sunset'],
    featured: true,
    trending: true,
  },
  {
    id: '2',
    name: 'Kyoto',
    country: 'Japan',
    image: 'https://images.pexels.com/photos/5769382/pexels-photo-5769382.jpeg',
    images: [
      'https://images.pexels.com/photos/5769382/pexels-photo-5769382.jpeg',
      'https://images.pexels.com/photos/4151484/pexels-photo-4151484.jpeg',
      'https://images.pexels.com/photos/3408354/pexels-photo-3408354.jpeg',
    ],
    rating: 4.7,
    reviewCount: 1923,
    price: 1599,
    currency: 'USD',
    description: 'Discover the cultural heart of Japan in Kyoto, where ancient temples, traditional gardens, and geisha districts preserve centuries of history and tradition.',
    highlights: [
      'Fushimi Inari Shrine with thousands of torii gates',
      'Bamboo Grove of Arashiyama',
      'Traditional tea ceremonies',
      'Historic Gion district',
      'Zen gardens and temples'
    ],
    category: 'cultural',
    duration: '4-6 days',
    difficulty: 'moderate',
    bestTime: 'March to May, September to November',
    coordinates: {
      latitude: 35.0116,
      longitude: 135.7681
    },
    amenities: ['WiFi', 'Cultural Tours', 'Traditional Accommodation', 'Local Guides'],
    tags: ['culture', 'temples', 'traditional', 'photography'],
    featured: true,
    trending: false,
  },
  {
    id: '3',
    name: 'Bali',
    country: 'Indonesia',
    image: 'https://images.pexels.com/photos/1878293/pexels-photo-1878293.jpeg',
    images: [
      'https://images.pexels.com/photos/1878293/pexels-photo-1878293.jpeg',
      'https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg',
      'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg',
    ],
    rating: 4.6,
    reviewCount: 3156,
    price: 899,
    currency: 'USD',
    description: 'Immerse yourself in the tropical paradise of Bali, where lush rice terraces, ancient temples, and pristine beaches create an unforgettable island experience.',
    highlights: [
      'Tegallalang Rice Terraces',
      'Sacred Monkey Forest Sanctuary',
      'Traditional Balinese temples',
      'World-class surfing spots',
      'Vibrant local markets'
    ],
    category: 'beach',
    duration: '7-10 days',
    difficulty: 'easy',
    bestTime: 'April to October',
    coordinates: {
      latitude: -8.3405,
      longitude: 115.0920
    },
    amenities: ['WiFi', 'Pool', 'Spa', 'Yoga Classes', 'Surfing Lessons'],
    tags: ['tropical', 'surfing', 'temples', 'wellness'],
    featured: true,
    trending: true,
  },
  {
    id: '4',
    name: 'Swiss Alps',
    country: 'Switzerland',
    image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
    images: [
      'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
      'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg',
      'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg',
    ],
    rating: 4.9,
    reviewCount: 1567,
    price: 2299,
    currency: 'USD',
    description: 'Experience the majestic beauty of the Swiss Alps with snow-capped peaks, pristine lakes, and charming mountain villages that offer year-round outdoor adventures.',
    highlights: [
      'Matterhorn mountain views',
      'Scenic train journeys',
      'Alpine hiking trails',
      'Traditional Swiss chalets',
      'World-class skiing'
    ],
    category: 'mountain',
    duration: '6-8 days',
    difficulty: 'challenging',
    bestTime: 'December to March, June to September',
    coordinates: {
      latitude: 46.5197,
      longitude: 7.4815
    },
    amenities: ['WiFi', 'Ski Equipment', 'Mountain Guides', 'Heated Pools'],
    tags: ['skiing', 'hiking', 'mountains', 'adventure'],
    featured: false,
    trending: true,
  },
  {
    id: '5',
    name: 'Paris',
    country: 'France',
    image: 'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg',
    images: [
      'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg',
      'https://images.pexels.com/photos/161853/eiffel-tower-paris-france-tower-161853.jpeg',
      'https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg',
    ],
    rating: 4.5,
    reviewCount: 4521,
    price: 1799,
    currency: 'USD',
    description: 'Fall in love with the City of Light, where world-renowned museums, iconic landmarks, and exquisite cuisine create an unforgettable urban adventure.',
    highlights: [
      'Eiffel Tower and Champs-Élysées',
      'Louvre Museum and Mona Lisa',
      'Notre-Dame Cathedral',
      'Seine River cruises',
      'Montmartre and Sacré-Cœur'
    ],
    category: 'city',
    duration: '4-5 days',
    difficulty: 'easy',
    bestTime: 'April to June, September to October',
    coordinates: {
      latitude: 48.8566,
      longitude: 2.3522
    },
    amenities: ['WiFi', 'Museum Passes', 'City Tours', 'Metro Access'],
    tags: ['art', 'culture', 'romance', 'history'],
    featured: false,
    trending: false,
  },
];

export const useDestinationStore = create<DestinationStore>((set, get) => ({
  destinations: mockDestinations,
  featuredDestinations: mockDestinations.filter(d => d.featured),
  trendingDestinations: mockDestinations.filter(d => d.trending),
  searchQuery: '',
  selectedCategory: 'all',
  isLoading: false,

  setDestinations: (destinations) => set({ destinations }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  setLoading: (isLoading) => set({ isLoading }),

  getDestinationById: (id) => {
    const { destinations } = get();
    return destinations.find(d => d.id === id);
  },

  getFilteredDestinations: () => {
    const { destinations, searchQuery, selectedCategory } = get();
    
    return destinations.filter(destination => {
      const matchesSearch = searchQuery === '' || 
        destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        destination.country.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || 
        destination.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  },
}));