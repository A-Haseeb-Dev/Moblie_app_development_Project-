import React from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { 
  Bell, Globe, Lock, HelpCircle, LogOut,
  ChevronRight, MoonStar, Sun
} from 'lucide-react-native';

export default function SettingsScreen() {
  const { theme, isDark, toggleTheme } = useTheme();
  
  const renderSettingItem = (
    icon: React.ReactNode,
    title: string,
    rightElement?: React.ReactNode,
    onPress?: () => void
  ) => (
    <TouchableOpacity 
      style={[styles.settingItem, { borderBottomColor: theme.border }]} 
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.settingLeft}>
        {icon}
        <Text style={[styles.settingTitle, { color: theme.text }]}>{title}</Text>
      </View>
      {rightElement}
    </TouchableOpacity>
  );
  
  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.subtext }]}>Preferences</Text>
        
        {renderSettingItem(
          isDark ? 
            <MoonStar size={22} color={theme.text} /> : 
            <Sun size={22} color={theme.text} />,
          'Dark Mode',
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: '#767577', true: theme.primary }}
            thumbColor="#ffffff"
          />
        )}
        
        {renderSettingItem(
          <Bell size={22} color={theme.text} />,
          'Notifications',
          <Switch
            value={true}
            trackColor={{ false: '#767577', true: theme.primary }}
            thumbColor="#ffffff"
          />
        )}
        
        {renderSettingItem(
          <Globe size={22} color={theme.text} />,
          'Language',
          <View style={styles.settingRight}>
            <Text style={[styles.settingValue, { color: theme.subtext }]}>English</Text>
            <ChevronRight size={20} color={theme.subtext} />
          </View>,
          () => {}
        )}
      </View>
      
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.subtext }]}>Security</Text>
        
        {renderSettingItem(
          <Lock size={22} color={theme.text} />,
          'Change Password',
          <ChevronRight size={20} color={theme.subtext} />,
          () => {}
        )}
      </View>
      
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.subtext }]}>Support</Text>
        
        {renderSettingItem(
          <HelpCircle size={22} color={theme.text} />,
          'Help Center',
          <ChevronRight size={20} color={theme.subtext} />,
          () => {}
        )}
      </View>
      
      <TouchableOpacity
        style={[styles.logoutButton, { backgroundColor: theme.error }]}
      >
        <LogOut size={22} color="#ffffff" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
      
      <Text style={[styles.versionText, { color: theme.subtext }]}>
        Version 1.0.0
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginBottom: 8,
    paddingLeft: 8,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    marginLeft: 12,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginRight: 8,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  logoutText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#ffffff',
    marginLeft: 8,
  },
  versionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
});