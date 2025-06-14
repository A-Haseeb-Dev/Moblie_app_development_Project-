import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { useFavorites } from '@/hooks/useFavorites';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, Star, Trash2 } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Sample data (same as in index.tsx for simplicity)
const allDestinations = [
  {
    id: '1',
    name: 'Santorini, Greece',
    image: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg',
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Kyoto, Japan',
    image: 'https://images.pexels.com/photos/5769382/pexels-photo-5769382.jpeg',
    rating: 4.7,
  },
  {
    id: '3',
    name: 'Bali, Indonesia',
    image: 'https://images.pexels.com/photos/1878293/pexels-photo-1878293.jpeg',
    rating: 4.6,
  },
  {
    id: '4',
    name: 'Paris, France',
    image: 'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg',
    rating: 4.5,
  },
  {
    id: '5',
    name: 'New York, USA',
    image: 'https://images.pexels.com/photos/802024/pexels-photo-802024.jpeg',
    rating: 4.4,
  },
];

export default function SavedScreen() {
  const { theme } = useTheme();
  const { favorites, toggleFavorite, clearFavorites } = useFavorites();
  
  // Filter destinations to only show favorites
  const favoriteDestinations = useMemo(() => {
    return allDestinations.filter(dest => favorites.includes(dest.id));
  }, [favorites]);

  // Render each favorite destination
  const renderItem = ({ item }: { item: typeof allDestinations[0] }) => (
    <View style={[styles.card, { backgroundColor: theme.card }]}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.7)']}
        style={styles.gradient}
      />
      <View style={styles.cardContent}>
        <View>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <View style={styles.ratingContainer}>
            <Star size={14} color="#FFC107" fill="#FFC107" />
            <Text style={styles.rating}>{item.rating}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.removeButton, { backgroundColor: theme.error }]}
          onPress={() => toggleFavorite(item.id)}
        >
          <Trash2 size={16} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Saved</Text>
        {favorites.length > 0 && (
          <TouchableOpacity
            style={[styles.clearButton, { backgroundColor: theme.card }]}
            onPress={clearFavorites}
          >
            <Text style={[styles.clearButtonText, { color: theme.error }]}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Heart size={60} color={theme.subtext} />
          <Text style={[styles.emptyText, { color: theme.text }]}>
            No saved destinations yet
          </Text>
          <Text style={[styles.emptySubtext, { color: theme.subtext }]}>
            Your favorite destinations will appear here
          </Text>
        </View>
      ) : (
        <FlatList
          data={favoriteDestinations}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
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
    fontFamily: 'Inter-Bold',
    fontSize: 28,
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  clearButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 16,
  },
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    height: 200,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
  },
  cardContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: 16,
  },
  cardTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#ffffff',
    marginLeft: 4,
  },
  removeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
});