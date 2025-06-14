import React, { useCallback, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Heart, Star } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

type Destination = {
  id: string;
  name: string;
  image: string;
  rating: number;
};

type DestinationCardProps = {
  destination: Destination;
  isFavorite: boolean;
  onToggleFavorite: () => void;
};

export default function DestinationCard({ destination, isFavorite, onToggleFavorite }: DestinationCardProps) {
  const { theme } = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  
  const handlePressIn = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  }, [scaleAnim]);
  
  const handlePressOut = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, [scaleAnim]);
  
  const handleFavoritePress = useCallback(() => {
    onToggleFavorite();
  }, [onToggleFavorite]);

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ scale: scaleAnim }] }
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.touchable}
      >
        <Image source={{ uri: destination.image }} style={styles.image} />
        
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.gradient}
        />
        
        <View style={styles.contentContainer}>
          <View>
            <Text style={styles.name}>{destination.name}</Text>
            <View style={styles.ratingContainer}>
              <Star size={14} color="#FFC107" fill="#FFC107" />
              <Text style={styles.rating}>{destination.rating}</Text>
            </View>
          </View>
          
          <TouchableOpacity
            style={[
              styles.favoriteButton,
              { backgroundColor: isFavorite ? theme.accent : 'rgba(255,255,255,0.2)' }
            ]}
            onPress={handleFavoritePress}
          >
            <Heart
              size={16}
              color={isFavorite ? '#ffffff' : '#ffffff'}
              fill={isFavorite ? '#ffffff' : 'none'}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    height: 200,
  },
  touchable: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  contentContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: 16,
  },
  name: {
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
  favoriteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
});