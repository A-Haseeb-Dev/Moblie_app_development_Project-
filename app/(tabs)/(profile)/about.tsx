import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Linking, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Heart, Github, Twitter, ExternalLink } from 'lucide-react-native';

export default function AboutScreen() {
  const { theme } = useTheme();
  
  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.logoContainer}>
        <Image 
          source={{ uri: 'https://images.pexels.com/photos/3935702/pexels-photo-3935702.jpeg' }} 
          style={styles.logo}
        />
        <Text style={[styles.appName, { color: theme.text }]}>Wanderlust</Text>
        <Text style={[styles.version, { color: theme.subtext }]}>Version 1.0.0</Text>
      </View>
      
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.cardTitle, { color: theme.text }]}>About Wanderlust</Text>
        <Text style={[styles.cardText, { color: theme.subtext }]}>
          Wanderlust is a travel companion app designed to help users discover amazing destinations, 
          plan their trips, and share their experiences with others.
        </Text>
        <Text style={[styles.cardText, { color: theme.subtext }]}>
          Our mission is to make travel planning simpler and more enjoyable, 
          connecting travelers with authentic experiences around the world.
        </Text>
      </View>
      
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.cardTitle, { color: theme.text }]}>Features</Text>
        <View style={styles.featureList}>
          <View style={styles.featureItem}>
            <View style={[styles.bullet, { backgroundColor: theme.primary }]} />
            <Text style={[styles.featureText, { color: theme.text }]}>
              Discover trending destinations
            </Text>
          </View>
          <View style={styles.featureItem}>
            <View style={[styles.bullet, { backgroundColor: theme.primary }]} />
            <Text style={[styles.featureText, { color: theme.text }]}>
              Save your favorite places
            </Text>
          </View>
          <View style={styles.featureItem}>
            <View style={[styles.bullet, { backgroundColor: theme.primary }]} />
            <Text style={[styles.featureText, { color: theme.text }]}>
              Create and manage trip itineraries
            </Text>
          </View>
          <View style={styles.featureItem}>
            <View style={[styles.bullet, { backgroundColor: theme.primary }]} />
            <Text style={[styles.featureText, { color: theme.text }]}>
              Share your travel experiences
            </Text>
          </View>
        </View>
      </View>
      
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.cardTitle, { color: theme.text }]}>Connect With Us</Text>
        <View style={styles.socialLinks}>
          <TouchableOpacity 
            style={[styles.socialButton, { backgroundColor: theme.primary }]}
            onPress={() => Linking.openURL('https://github.com')}
          >
            <Github size={24} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.socialButton, { backgroundColor: theme.primary }]}
            onPress={() => Linking.openURL('https://twitter.com')}
          >
            <Twitter size={24} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.socialButton, { backgroundColor: theme.primary }]}
            onPress={() => Linking.openURL('https://www.wanderlust.example.com')}
          >
            <ExternalLink size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: theme.subtext }]}>
          Made with <Heart size={14} color={theme.accent} fill={theme.accent} /> in React Native
        </Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.example.com/privacy')}>
          <Text style={[styles.footerLink, { color: theme.primary }]}>
            Privacy Policy
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.example.com/terms')}>
          <Text style={[styles.footerLink, { color: theme.primary }]}>
            Terms of Service
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginBottom: 16,
  },
  appName: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    marginBottom: 4,
  },
  version: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    marginBottom: 12,
  },
  cardText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
  },
  featureList: {
    marginTop: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  featureText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  socialLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  socialButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  footer: {
    alignItems: 'center',
    marginTop: 24,
  },
  footerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerLink: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginVertical: 4,
  },
});