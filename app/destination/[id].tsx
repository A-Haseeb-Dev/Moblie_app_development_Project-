import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  Dimensions,
  Share,
  Platform
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { useDestinationStore } from '@/store/destinationStore';
import { useFavorites } from '@/hooks/useFavorites';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  Star, 
  MapPin, 
  Clock, 
  Calendar,
  Users,
  Wifi,
  Car,
  Coffee,
  Camera
} from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  interpolate,
  useAnimatedScrollHandler
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const HEADER_HEIGHT = 300;

export default function DestinationDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { theme } = useTheme();
  const { getDestinationById } = useDestinationStore();
  const { favorites, toggleFavorite } = useFavorites();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const destination = getDestinationById(id!);
  
  if (!destination) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: theme.text }]}>
            Destination not found
          </Text>
          <TouchableOpacity 
            style={[styles.backButton, { backgroundColor: theme.primary }]}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const isFavorite = favorites.includes(destination.id);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT - 100],
      [0, 1],
      'clamp'
    );

    return {
      opacity,
    };
  });

  const imageAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollY.value,
      [-100, 0],
      [1.2, 1],
      'clamp'
    );

    return {
      transform: [{ scale }],
    };
  });

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${destination.name} in ${destination.country}! ${destination.description}`,
        title: destination.name,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleBookNow = () => {
    router.push(`/booking/${destination.id}`);
  };

  const renderAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <Wifi size={16} color={theme.primary} />;
      case 'airport transfer':
      case 'metro access':
        return <Car size={16} color={theme.primary} />;
      case 'restaurant':
        return <Coffee size={16} color={theme.primary} />;
      default:
        return <Camera size={16} color={theme.primary} />;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          <Animated.Image
            source={{ uri: destination.images[selectedImageIndex] }}
            style={[styles.headerImage, imageAnimatedStyle]}
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.3)']}
            style={styles.imageGradient}
          />
          
          {/* Image indicators */}
          <View style={styles.imageIndicators}>
            {destination.images.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.indicator,
                  {
                    backgroundColor: index === selectedImageIndex 
                      ? '#ffffff' 
                      : 'rgba(255,255,255,0.5)'
                  }
                ]}
                onPress={() => setSelectedImageIndex(index)}
              />
            ))}
          </View>
        </View>

        <View style={[styles.content, { backgroundColor: theme.background }]}>
          <View style={styles.titleSection}>
            <View style={styles.titleRow}>
              <View style={styles.titleInfo}>
                <Text style={[styles.title, { color: theme.text }]}>
                  {destination.name}
                </Text>
                <View style={styles.locationRow}>
                  <MapPin size={16} color={theme.subtext} />
                  <Text style={[styles.location, { color: theme.subtext }]}>
                    {destination.country}
                  </Text>
                </View>
              </View>
              <View style={styles.ratingContainer}>
                <Star size={16} color="#FFC107" fill="#FFC107" />
                <Text style={[styles.rating, { color: theme.text }]}>
                  {destination.rating}
                </Text>
                <Text style={[styles.reviewCount, { color: theme.subtext }]}>
                  ({destination.reviewCount})
                </Text>
              </View>
            </View>
            
            <View style={styles.priceRow}>
              <Text style={[styles.price, { color: theme.primary }]}>
                ${destination.price}
              </Text>
              <Text style={[styles.priceUnit, { color: theme.subtext }]}>
                per person
              </Text>
            </View>
          </View>

          <View style={styles.quickInfo}>
            <View style={styles.infoItem}>
              <Clock size={16} color={theme.primary} />
              <Text style={[styles.infoText, { color: theme.text }]}>
                {destination.duration}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Calendar size={16} color={theme.primary} />
              <Text style={[styles.infoText, { color: theme.text }]}>
                {destination.bestTime}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Users size={16} color={theme.primary} />
              <Text style={[styles.infoText, { color: theme.text }]}>
                {destination.difficulty}
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Description
            </Text>
            <Text style={[styles.description, { color: theme.subtext }]}>
              {destination.description}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Highlights
            </Text>
            {destination.highlights.map((highlight, index) => (
              <View key={index} style={styles.highlightItem}>
                <View style={[styles.bullet, { backgroundColor: theme.primary }]} />
                <Text style={[styles.highlightText, { color: theme.text }]}>
                  {highlight}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Amenities
            </Text>
            <View style={styles.amenitiesGrid}>
              {destination.amenities.map((amenity, index) => (
                <View key={index} style={[styles.amenityItem, { backgroundColor: theme.card }]}>
                  {renderAmenityIcon(amenity)}
                  <Text style={[styles.amenityText, { color: theme.text }]}>
                    {amenity}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Tags
            </Text>
            <View style={styles.tagsContainer}>
              {destination.tags.map((tag, index) => (
                <View key={index} style={[styles.tag, { backgroundColor: theme.card }]}>
                  <Text style={[styles.tagText, { color: theme.text }]}>
                    #{tag}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Animated.ScrollView>

      {/* Fixed Header */}
      <Animated.View style={[styles.fixedHeader, headerAnimatedStyle, { backgroundColor: theme.background }]}>
        <SafeAreaView style={styles.headerContent}>
          <TouchableOpacity
            style={[styles.headerButton, { backgroundColor: theme.card }]}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.text }]}>
            {destination.name}
          </Text>
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={[styles.headerButton, { backgroundColor: theme.card }]}
              onPress={handleShare}
            >
              <Share2 size={20} color={theme.text} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.headerButton, { backgroundColor: theme.card }]}
              onPress={() => toggleFavorite(destination.id)}
            >
              <Heart
                size={20}
                color={isFavorite ? theme.accent : theme.text}
                fill={isFavorite ? theme.accent : 'none'}
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Animated.View>

      {/* Floating Header Buttons */}
      <SafeAreaView style={styles.floatingHeader}>
        <TouchableOpacity
          style={[styles.floatingButton, { backgroundColor: 'rgba(0,0,0,0.3)' }]}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#ffffff" />
        </TouchableOpacity>
        <View style={styles.floatingActions}>
          <TouchableOpacity
            style={[styles.floatingButton, { backgroundColor: 'rgba(0,0,0,0.3)' }]}
            onPress={handleShare}
          >
            <Share2 size={20} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.floatingButton, { backgroundColor: 'rgba(0,0,0,0.3)' }]}
            onPress={() => toggleFavorite(destination.id)}
          >
            <Heart
              size={20}
              color="#ffffff"
              fill={isFavorite ? '#ffffff' : 'none'}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Bottom Action Bar */}
      <View style={[styles.bottomBar, { backgroundColor: theme.background, borderTopColor: theme.border }]}>
        <SafeAreaView style={styles.bottomContent}>
          <View style={styles.priceInfo}>
            <Text style={[styles.bottomPrice, { color: theme.primary }]}>
              ${destination.price}
            </Text>
            <Text style={[styles.bottomPriceUnit, { color: theme.subtext }]}>
              per person
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.bookButton, { backgroundColor: theme.primary }]}
            onPress={handleBookNow}
          >
            <Text style={styles.bookButtonText}>Book Now</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    marginBottom: 20,
  },
  backButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#ffffff',
    fontFamily: 'Inter-Medium',
  },
  imageContainer: {
    height: HEADER_HEIGHT,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  imageIndicators: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  fixedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    marginHorizontal: 16,
  },
  headerActions: {
    flexDirection: 'row',
  },
  floatingHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    zIndex: 5,
  },
  floatingButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  floatingActions: {
    flexDirection: 'row',
  },
  content: {
    flex: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  titleSection: {
    marginBottom: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  titleInfo: {
    flex: 1,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    marginLeft: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    marginLeft: 4,
  },
  reviewCount: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginLeft: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
  },
  priceUnit: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    marginLeft: 8,
  },
  quickInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  infoText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginLeft: 6,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    marginBottom: 12,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 24,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 8,
    marginRight: 12,
  },
  highlightText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 24,
    flex: 1,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    margin: 4,
  },
  amenityText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginLeft: 6,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    margin: 4,
  },
  tagText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  bottomBar: {
    borderTopWidth: 1,
    paddingBottom: Platform.OS === 'ios' ? 0 : 16,
  },
  bottomContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  priceInfo: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  bottomPrice: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
  },
  bottomPriceUnit: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginLeft: 6,
  },
  bookButton: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  bookButtonText: {
    color: '#ffffff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
});