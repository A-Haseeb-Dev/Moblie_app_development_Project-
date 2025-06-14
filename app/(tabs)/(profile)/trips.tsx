import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Calendar, MapPin } from 'lucide-react-native';

// Sample trips data
const tripsData = [
  {
    id: '1',
    destination: 'Tokyo, Japan',
    image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg',
    date: 'May 10 - May 20, 2023',
    status: 'completed',
  },
  {
    id: '2',
    destination: 'Rome, Italy',
    image: 'https://images.pexels.com/photos/532263/pexels-photo-532263.jpeg',
    date: 'Aug 15 - Aug 25, 2023',
    status: 'completed',
  },
  {
    id: '3',
    destination: 'Bali, Indonesia',
    image: 'https://images.pexels.com/photos/1878293/pexels-photo-1878293.jpeg',
    date: 'Dec 10 - Dec 20, 2025',
    status: 'upcoming',
  },
];

export default function TripsScreen() {
  const { theme } = useTheme();
  
  const renderTripItem = ({ item }: { item: typeof tripsData[0] }) => {
    const isUpcoming = item.status === 'upcoming';
    
    return (
      <TouchableOpacity 
        style={[styles.tripCard, { backgroundColor: theme.card }]}
        activeOpacity={0.8}
      >
        <Image source={{ uri: item.image }} style={styles.tripImage} />
        <View style={styles.tripInfo}>
          <Text style={[styles.tripDestination, { color: theme.text }]}>
            {item.destination}
          </Text>
          
          <View style={styles.tripMeta}>
            <View style={styles.metaItem}>
              <Calendar size={14} color={theme.subtext} />
              <Text style={[styles.metaText, { color: theme.subtext }]}>
                {item.date}
              </Text>
            </View>
          </View>
          
          <View style={[
            styles.statusTag, 
            { 
              backgroundColor: isUpcoming ? theme.primary : theme.accent,
              opacity: isUpcoming ? 1 : 0.8,
            }
          ]}>
            <Text style={styles.statusText}>
              {isUpcoming ? 'Upcoming' : 'Completed'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={tripsData}
        renderItem={renderTripItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
  },
  tripCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  tripImage: {
    width: '100%',
    height: 160,
  },
  tripInfo: {
    padding: 16,
  },
  tripDestination: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    marginBottom: 8,
  },
  tripMeta: {
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  metaText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginLeft: 6,
  },
  statusTag: {
    position: 'absolute',
    top: 16,
    right: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#ffffff',
  },
});