import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

export default function Footer() {
  const { theme } = useTheme();
  
  return (
    <View style={[styles.footer, { borderTopColor: theme.border }]}>
      <Text style={[styles.footerText, { color: theme.subtext }]}>
        © 2024 K&H Tech. All rights reserved.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    borderTopWidth: 1,
    paddingTop: 20,
    paddingBottom: 40,
    alignItems: 'center',
    marginTop: 32,
  },
  footerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
});