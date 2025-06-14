import React, { useReducer, useMemo, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { useDestinationStore } from '@/store/destinationStore';
import { useFavorites } from '@/hooks/useFavorites';
import { useLocalSearchParams, router } from 'expo-router';
import { Filter, Search, SlidersHorizontal } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DestinationCard from '@/components/DestinationCard';
import { useState } from 'react';


// Define the filter state type
type FilterState = {
  searchQuery: string;
  selectedCategory: string;
  priceRange: [number, number];
  difficulty: string;
  sortBy: 'rating' | 'price' | 'name';
};

// Define the filter action type
type FilterAction = 
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_CATEGORY'; payload: string }
  | { type: 'SET_PRICE_RANGE'; payload: [number, number] }
  | { type: 'SET_DIFFICULTY'; payload: string }
  | { type: 'SET_SORT_BY'; payload: 'rating' | 'price' | 'name' }
  | { type: 'RESET' };

// Initial filter state
const initialFilterState: FilterState = {
  searchQuery: '',
  selectedCategory: 'all',
  priceRange: [0, 3000],
  difficulty: 'all',
  sortBy: 'rating',
};

// Filter reducer function
function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case 'SET_SEARCH':
      return { ...state, searchQuery: action.payload };
    case 'SET_CATEGORY':
      return { ...state, selectedCategory: action.payload };
    case 'SET_PRICE_RANGE':
      return { ...state, priceRange: action.payload };
    case 'SET_DIFFICULTY':
      return { ...state, difficulty: action.payload };
    case 'SET_SORT_BY':
      return { ...state, sortBy: action.payload };
    case 'RESET':
      return initialFilterState;
    default:
      return state;
  }
}

const categories = [
  { id: 'all', name: 'All' },
  { id: 'beach', name: 'Beach' },
  { id: 'mountain', name: 'Mountain' },
  { id: 'city', name: 'City' },
  { id: 'cultural', name: 'Cultural' },
  { id: 'countryside', name: 'Countryside' },
];

const difficulties = [
  { id: 'all', name: 'All Levels' },
  { id: 'easy', name: 'Easy' },
  { id: 'moderate', name: 'Moderate' },
  { id: 'challenging', name: 'Challenging' },
];

const sortOptions = [
  { id: 'rating', name: 'Rating' },
  { id: 'price', name: 'Price' },
  { id: 'name', name: 'Name' },
];

export default function ExploreScreen() {
  const { theme } = useTheme();
  const { category } = useLocalSearchParams<{ category?: string }>();
  const { destinations } = useDestinationStore();
  const { favorites, toggleFavorite } = useFavorites();
  const [filterState, dispatch] = useReducer(filterReducer, initialFilterState);
  const [showFilters, setShowFilters] = useState(false);

  // Set initial category from params
  useEffect(() => {
    if (category && category !== 'all') {
      dispatch({ type: 'SET_CATEGORY', payload: category });
    }
  }, [category]);

  // Filter and sort destinations
  const filteredDestinations = useMemo(() => {
    let filtered = destinations.filter(destination => {
      const matchesSearch = filterState.searchQuery === '' || 
        destination.name.toLowerCase().includes(filterState.searchQuery.toLowerCase()) ||
        destination.country.toLowerCase().includes(filterState.searchQuery.toLowerCase());
      
      const matchesCategory = filterState.selectedCategory === 'all' || 
        destination.category === filterState.selectedCategory;
      
      const matchesPrice = destination.price >= filterState.priceRange[0] && 
        destination.price <= filterState.priceRange[1];
      
      const matchesDifficulty = filterState.difficulty === 'all' || 
        destination.difficulty === filterState.difficulty;
      
      return matchesSearch && matchesCategory && matchesPrice && matchesDifficulty;
    });

    // Sort destinations
    filtered.sort((a, b) => {
      switch (filterState.sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price':
          return a.price - b.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [destinations, filterState]);

  const handleDestinationPress = (destinationId: string) => {
    router.push(`/destination/${destinationId}`);
  };

  const renderDestination = ({ item }: { item: any }) => (
    <TouchableOpacity onPress={() => handleDestinationPress(item.id)}>
      <DestinationCard
        destination={item}
        isFavorite={favorites.includes(item.id)}
        onToggleFavorite={() => toggleFavorite(item.id)}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Explore</Text>
        <TouchableOpacity
          style={[styles.filterButton, { backgroundColor: theme.card }]}
          onPress={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal size={20} color={theme.text} />
        </TouchableOpacity>
      </View>

      <View style={[styles.searchContainer, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Search size={20} color={theme.subtext} />
        <TextInput
          style={[styles.searchInput, { color: theme.text }]}
          placeholder="Search destinations..."
          placeholderTextColor={theme.subtext}
          value={filterState.searchQuery}
          onChangeText={(text) => dispatch({ type: 'SET_SEARCH', payload: text })}
        />
      </View>

      {showFilters && (
        <View style={[styles.filtersContainer, { backgroundColor: theme.card }]}>
          <View style={styles.filterSection}>
            <Text style={[styles.filterTitle, { color: theme.text }]}>Category</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterOptions}
            >
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.filterOption,
                    { 
                      backgroundColor: 
                        filterState.selectedCategory === cat.id ? theme.primary : theme.background,
                    }
                  ]}
                  onPress={() => dispatch({ type: 'SET_CATEGORY', payload: cat.id })}
                >
                  <Text 
                    style={[
                      styles.filterOptionText,
                      { color: filterState.selectedCategory === cat.id ? '#ffffff' : theme.text }
                    ]}
                  >
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.filterSection}>
            <Text style={[styles.filterTitle, { color: theme.text }]}>Difficulty</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterOptions}
            >
              {difficulties.map((diff) => (
                <TouchableOpacity
                  key={diff.id}
                  style={[
                    styles.filterOption,
                    { 
                      backgroundColor: 
                        filterState.difficulty === diff.id ? theme.primary : theme.background,
                    }
                  ]}
                  onPress={() => dispatch({ type: 'SET_DIFFICULTY', payload: diff.id })}
                >
                  <Text 
                    style={[
                      styles.filterOptionText,
                      { color: filterState.difficulty === diff.id ? '#ffffff' : theme.text }
                    ]}
                  >
                    {diff.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.filterSection}>
            <Text style={[styles.filterTitle, { color: theme.text }]}>Sort By</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterOptions}
            >
              {sortOptions.map((sort) => (
                <TouchableOpacity
                  key={sort.id}
                  style={[
                    styles.filterOption,
                    { 
                      backgroundColor: 
                        filterState.sortBy === sort.id ? theme.primary : theme.background,
                    }
                  ]}
                  onPress={() => dispatch({ type: 'SET_SORT_BY', payload: sort.id as any })}
                >
                  <Text 
                    style={[
                      styles.filterOptionText,
                      { color: filterState.sortBy === sort.id ? '#ffffff' : theme.text }
                    ]}
                  >
                    {sort.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <TouchableOpacity
            style={[styles.resetButton, { backgroundColor: theme.error }]}
            onPress={() => dispatch({ type: 'RESET' })}
          >
            <Text style={styles.resetButtonText}>Reset Filters</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.resultsHeader}>
        <Text style={[styles.resultsCount, { color: theme.text }]}>
          {filteredDestinations.length} destination{filteredDestinations.length !== 1 ? 's' : ''} found
        </Text>
      </View>

      <FlatList
        data={filteredDestinations}
        renderItem={renderDestination}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: theme.text }]}>
              No destinations found
            </Text>
            <Text style={[styles.emptySubtext, { color: theme.subtext }]}>
              Try adjusting your filters
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    marginLeft: 8,
    paddingVertical: 4,
  },
  filtersContainer: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  filterSection: {
    marginBottom: 16,
  },
  filterTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    marginBottom: 8,
  },
  filterOptions: {
    paddingRight: 16,
  },
  filterOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  filterOptionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  resetButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#ffffff',
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
  resultsHeader: {
    marginBottom: 16,
  },
  resultsCount: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    marginBottom: 8,
  },
  emptySubtext: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
});