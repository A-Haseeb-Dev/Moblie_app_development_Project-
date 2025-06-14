import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { useDestinationStore } from '@/store/destinationStore';
import { useAuth } from '@/context/AuthContext';
import { Search, ChevronRight, TrendingUp, Award } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFavorites } from '@/hooks/useFavorites';
import { router } from 'expo-router';
import DestinationCard from '@/components/DestinationCard';

const categories = [
  { id: 'beach', name: 'Beaches', icon: '🏖️' },
  { id: 'mountain', name: 'Mountains', icon: '⛰️' },
  { id: 'city', name: 'Cities', icon: '🏙️' },
  { id: 'cultural', name: 'Culture', icon: '🏛️' },
];

export default function DiscoverScreen() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { featuredDestinations, trendingDestinations } = useDestinationStore();
  const { favorites, toggleFavorite } = useFavorites();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleCategoryPress = (categoryId: string) => {
    router.push({
      pathname: '/(tabs)/explore',
      params: { category: categoryId }
    });
  };

  const handleDestinationPress = (destinationId: string) => {
    router.push(`/destination/${destinationId}`);
  };

  if (isLoading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
        <Text style={[styles.loadingText, { color: theme.text }]}>
          Discovering amazing destinations...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={[styles.welcomeText, { color: theme.text }]}>
              {user ? `Welcome back, ${user.name.split(' ')[0]}!` : 'Discover'}
            </Text>
            <Text style={[styles.subtitleText, { color: theme.subtext }]}>
              Find your perfect destination
            </Text>
          </View>
          {user?.membershipTier === 'premium' && (
            <View style={[styles.premiumBadge, { backgroundColor: theme.accent }]}>
              <Award size={16} color="#ffffff" />
              <Text style={styles.premiumText}>Premium</Text>
            </View>
          )}
        </View>
        
        <TouchableOpacity
          style={[styles.searchBar, { backgroundColor: theme.card, borderColor: theme.border }]}
          activeOpacity={0.7}
          onPress={() => router.push('/(tabs)/explore')}
        >
          <Search size={20} color={theme.subtext} />
          <Text style={[styles.searchText, { color: theme.subtext }]}>
            Search destinations...
          </Text>
        </TouchableOpacity>
        
        <View style={styles.categoriesContainer}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Categories</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[styles.categoryItem, { backgroundColor: theme.card }]}
                onPress={() => handleCategoryPress(category.id)}
              >
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={[styles.categoryName, { color: theme.text }]}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        <View style={styles.featuredContainer}>
          <View style={[styles.sectionHeader, styles.featuredHeader]}>
            <View style={styles.sectionTitleContainer}>
              <TrendingUp size={20} color={theme.primary} />
              <Text style={[styles.sectionTitle, { color: theme.text }]}>Trending Now</Text>
            </View>
            <TouchableOpacity 
              style={styles.seeAllButton}
              onPress={() => router.push('/(tabs)/explore')}
            >
              <Text style={[styles.seeAllText, { color: theme.primary }]}>See All</Text>
              <ChevronRight size={16} color={theme.primary} />
            </TouchableOpacity>
          </View>
          
          {trendingDestinations.map((destination) => (
            <TouchableOpacity
              key={destination.id}
              onPress={() => handleDestinationPress(destination.id)}
            >
              <DestinationCard
                destination={destination}
                isFavorite={favorites.includes(destination.id)}
                onToggleFavorite={() => toggleFavorite(destination.id)}
              />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.featuredContainer}>
          <View style={[styles.sectionHeader, styles.featuredHeader]}>
            <View style={styles.sectionTitleContainer}>
              <Award size={20} color={theme.primary} />
              <Text style={[styles.sectionTitle, { color: theme.text }]}>Featured Destinations</Text>
            </View>
            <TouchableOpacity 
              style={styles.seeAllButton}
              onPress={() => router.push('/(tabs)/explore')}
            >
              <Text style={[styles.seeAllText, { color: theme.primary }]}>See All</Text>
              <ChevronRight size={16} color={theme.primary} />
            </TouchableOpacity>
          </View>
          
          {featuredDestinations.map((destination) => (
            <TouchableOpacity
              key={destination.id}
              onPress={() => handleDestinationPress(destination.id)}
            >
              <DestinationCard
                destination={destination}
                isFavorite={favorites.includes(destination.id)}
                onToggleFavorite={() => toggleFavorite(destination.id)}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer */}
        <View style={[styles.footer, { borderTopColor: theme.border }]}>
          <Text style={[styles.footerText, { color: theme.subtext }]}>
            © 2024 K&H Tech. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    marginTop: 16,
  },
  header: {
    marginTop: 16,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  welcomeText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    marginBottom: 4,
  },
  subtitleText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  premiumText: {
    color: '#ffffff',
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    marginLeft: 4,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 24,
  },
  searchText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    marginLeft: 8,
  },
  categoriesContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredHeader: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    marginLeft: 8,
  },
  categoriesScroll: {
    flexDirection: 'row',
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 16,
    padding: 16,
    borderRadius: 12,
    width: 100,
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  categoryName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  featuredContainer: {
    marginBottom: 32,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginRight: 4,
  },
  footer: {
    borderTopWidth: 1,
    paddingTop: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  footerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
});