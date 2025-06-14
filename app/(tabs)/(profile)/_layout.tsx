import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { useTheme } from '@/context/ThemeContext';
import { Settings, Info, MoonStar, Sun, User, Map } from 'lucide-react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function ProfileLayout() {
  const { theme, isDark, toggleTheme } = useTheme();
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          drawerStyle: {
            backgroundColor: theme.background,
          },
          drawerActiveTintColor: theme.primary,
          drawerInactiveTintColor: theme.subtext,
          drawerLabelStyle: {
            fontFamily: 'Inter-Medium',
          },
          headerStyle: {
            backgroundColor: theme.background,
          },
          headerTintColor: theme.text,
          headerTitleStyle: {
            fontFamily: 'Inter-Bold',
          },
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            title: 'Profile',
            drawerLabel: 'Profile',
            headerShown: true,
            drawerIcon: ({ color, size }) => (
              <User size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="trips"
          options={{
            title: 'My Trips',
            drawerLabel: 'My Trips',
            headerShown: true,
            drawerIcon: ({ color, size }) => (
              <Map size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            title: 'Settings',
            drawerLabel: 'Settings',
            headerShown: true,
            drawerIcon: ({ color, size }) => (
              <Settings size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="about"
          options={{
            title: 'About',
            drawerLabel: 'About',
            headerShown: true,
            drawerIcon: ({ color, size }) => (
              <Info size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="theme"
          options={{
            title: 'Theme',
            drawerLabel: isDark ? 'Light Mode' : 'Dark Mode',
            drawerIcon: ({ color, size }) => (
              isDark ? <Sun size={size} color={color} /> : <MoonStar size={size} color={color} />
            ),
          }}
          listeners={() => ({
            tabPress: (e) => {
              e.preventDefault();
              toggleTheme();
            },
          })}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}