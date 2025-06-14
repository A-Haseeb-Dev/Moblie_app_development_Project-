import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Mail, MapPin, Edit2, Camera } from 'lucide-react-native';

// Sample user data
const userData = {
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  location: 'San Francisco, CA',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
  trips: 12,
  countries: 8,
  reviews: 24,
};

export default function ProfileScreen() {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }
  
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: userData.avatar }} style={styles.avatar} />
          <TouchableOpacity 
            style={[styles.cameraButton, { backgroundColor: theme.primary }]}
          >
            <Camera size={16} color="#ffffff" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.profileInfo}>
          <Text style={[styles.name, { color: theme.text }]}>{userData.name}</Text>
          
          <View style={styles.infoRow}>
            <Mail size={16} color={theme.subtext} />
            <Text style={[styles.infoText, { color: theme.subtext }]}>{userData.email}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <MapPin size={16} color={theme.subtext} />
            <Text style={[styles.infoText, { color: theme.subtext }]}>{userData.location}</Text>
          </View>
        </View>
        
        <TouchableOpacity style={[styles.editButton, { backgroundColor: theme.card }]}>
          <Edit2 size={20} color={theme.text} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: theme.card }]}>
          <Text style={[styles.statNumber, { color: theme.primary }]}>{userData.trips}</Text>
          <Text style={[styles.statLabel, { color: theme.text }]}>Trips</Text>
        </View>
        
        <View style={[styles.statCard, { backgroundColor: theme.card }]}>
          <Text style={[styles.statNumber, { color: theme.primary }]}>{userData.countries}</Text>
          <Text style={[styles.statLabel, { color: theme.text }]}>Countries</Text>
        </View>
        
        <View style={[styles.statCard, { backgroundColor: theme.card }]}>
          <Text style={[styles.statNumber, { color: theme.primary }]}>{userData.reviews}</Text>
          <Text style={[styles.statLabel, { color: theme.text }]}>Reviews</Text>
        </View>
      </View>
      
      <View style={[styles.section, { borderBottomColor: theme.border }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>About Me</Text>
        <Text style={[styles.sectionContent, { color: theme.subtext }]}>
          Passionate traveler and photographer. I love exploring new cultures and capturing moments through my lens. Always looking for the next adventure!
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Interests</Text>
        <View style={styles.tagsContainer}>
          <View style={[styles.tag, { backgroundColor: theme.card }]}>
            <Text style={[styles.tagText, { color: theme.text }]}>Photography</Text>
          </View>
          <View style={[styles.tag, { backgroundColor: theme.card }]}>
            <Text style={[styles.tagText, { color: theme.text }]}>Hiking</Text>
          </View>
          <View style={[styles.tag, { backgroundColor: theme.card }]}>
            <Text style={[styles.tagText, { color: theme.text }]}>Food</Text>
          </View>
          <View style={[styles.tag, { backgroundColor: theme.card }]}>
            <Text style={[styles.tagText, { color: theme.text }]}>Culture</Text>
          </View>
          <View style={[styles.tag, { backgroundColor: theme.card }]}>
            <Text style={[styles.tagText, { color: theme.text }]}>Adventure</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    marginBottom: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  infoText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginLeft: 8,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  statNumber: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    marginBottom: 12,
  },
  sectionContent: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 24,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
});