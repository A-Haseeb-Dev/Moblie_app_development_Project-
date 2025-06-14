import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Alert,
  Platform
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { useDestinationStore } from '@/store/destinationStore';
import { useAuth } from '@/context/AuthContext';
import { useNotifications } from '@/context/NotificationContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Calendar, Users, CreditCard, Shield, CircleCheck as CheckCircle } from 'lucide-react-native';

export default function BookingScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { theme } = useTheme();
  const { getDestinationById } = useDestinationStore();
  const { user } = useAuth();
  const { scheduleNotification } = useNotifications();
  
  const [selectedDate, setSelectedDate] = useState('');
  const [travelers, setTravelers] = useState('2');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const destination = getDestinationById(id!);
  
  if (!destination) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.errorText, { color: theme.text }]}>
          Destination not found
        </Text>
      </SafeAreaView>
    );
  }

  const totalPrice = destination.price * parseInt(travelers || '1');

  const handleBooking = async () => {
    if (!user) {
      Alert.alert('Login Required', 'Please login to make a booking.');
      router.push('/auth/login');
      return;
    }

    if (!selectedDate) {
      Alert.alert('Date Required', 'Please select a travel date.');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate booking process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Schedule notification
      await scheduleNotification(
        'Booking Confirmed!',
        `Your trip to ${destination.name} has been confirmed for ${selectedDate}.`,
        3
      );

      Alert.alert(
        'Booking Confirmed!',
        `Your trip to ${destination.name} has been successfully booked for ${selectedDate}.`,
        [
          {
            text: 'OK',
            onPress: () => router.push('/(tabs)/(profile)/trips')
          }
        ]
      );
    } catch (error) {
      Alert.alert('Booking Failed', 'Something went wrong. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <TouchableOpacity
          style={[styles.backButton, { backgroundColor: theme.card }]}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Book Your Trip
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.destinationCard, { backgroundColor: theme.card }]}>
          <Text style={[styles.destinationName, { color: theme.text }]}>
            {destination.name}
          </Text>
          <Text style={[styles.destinationCountry, { color: theme.subtext }]}>
            {destination.country}
          </Text>
          <Text style={[styles.destinationPrice, { color: theme.primary }]}>
            ${destination.price} per person
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Travel Details
          </Text>
          
          <View style={[styles.inputGroup, { backgroundColor: theme.card }]}>
            <Calendar size={20} color={theme.primary} />
            <View style={styles.inputContent}>
              <Text style={[styles.inputLabel, { color: theme.subtext }]}>
                Travel Date
              </Text>
              <TextInput
                style={[styles.input, { color: theme.text }]}
                placeholder="Select date (e.g., 2024-06-15)"
                placeholderTextColor={theme.subtext}
                value={selectedDate}
                onChangeText={setSelectedDate}
              />
            </View>
          </View>

          <View style={[styles.inputGroup, { backgroundColor: theme.card }]}>
            <Users size={20} color={theme.primary} />
            <View style={styles.inputContent}>
              <Text style={[styles.inputLabel, { color: theme.subtext }]}>
                Number of Travelers
              </Text>
              <TextInput
                style={[styles.input, { color: theme.text }]}
                placeholder="2"
                placeholderTextColor={theme.subtext}
                value={travelers}
                onChangeText={setTravelers}
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Special Requests
          </Text>
          <View style={[styles.textAreaContainer, { backgroundColor: theme.card }]}>
            <TextInput
              style={[styles.textArea, { color: theme.text }]}
              placeholder="Any special requests or dietary requirements..."
              placeholderTextColor={theme.subtext}
              value={specialRequests}
              onChangeText={setSpecialRequests}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Booking Summary
          </Text>
          <View style={[styles.summaryCard, { backgroundColor: theme.card }]}>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: theme.subtext }]}>
                Destination
              </Text>
              <Text style={[styles.summaryValue, { color: theme.text }]}>
                {destination.name}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: theme.subtext }]}>
                Travelers
              </Text>
              <Text style={[styles.summaryValue, { color: theme.text }]}>
                {travelers} person{parseInt(travelers) > 1 ? 's' : ''}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: theme.subtext }]}>
                Price per person
              </Text>
              <Text style={[styles.summaryValue, { color: theme.text }]}>
                ${destination.price}
              </Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow, { borderTopColor: theme.border }]}>
              <Text style={[styles.totalLabel, { color: theme.text }]}>
                Total
              </Text>
              <Text style={[styles.totalValue, { color: theme.primary }]}>
                ${totalPrice}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={[styles.securityNote, { backgroundColor: theme.card }]}>
            <Shield size={20} color={theme.success} />
            <Text style={[styles.securityText, { color: theme.text }]}>
              Your booking is secured with 256-bit SSL encryption
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { backgroundColor: theme.background, borderTopColor: theme.border }]}>
        <View style={styles.bottomContent}>
          <View style={styles.priceInfo}>
            <Text style={[styles.bottomTotal, { color: theme.text }]}>
              Total: 
            </Text>
            <Text style={[styles.bottomPrice, { color: theme.primary }]}>
              ${totalPrice}
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.bookButton, 
              { 
                backgroundColor: isProcessing ? theme.subtext : theme.primary,
                opacity: isProcessing ? 0.7 : 1
              }
            ]}
            onPress={handleBooking}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <Text style={styles.bookButtonText}>Processing...</Text>
            ) : (
              <>
                <CreditCard size={20} color="#ffffff" />
                <Text style={styles.bookButtonText}>Confirm Booking</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  destinationCard: {
    padding: 16,
    borderRadius: 12,
    marginVertical: 16,
  },
  destinationName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    marginBottom: 4,
  },
  destinationCountry: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    marginBottom: 8,
  },
  destinationPrice: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    marginBottom: 12,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  inputContent: {
    flex: 1,
    marginLeft: 12,
  },
  inputLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginBottom: 4,
  },
  input: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    paddingVertical: 4,
  },
  textAreaContainer: {
    borderRadius: 12,
    padding: 16,
  },
  textArea: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    minHeight: 80,
  },
  summaryCard: {
    padding: 16,
    borderRadius: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  summaryValue: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  totalRow: {
    borderTopWidth: 1,
    paddingTop: 12,
    marginTop: 8,
    marginBottom: 0,
  },
  totalLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
  },
  totalValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  securityText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
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
  bottomTotal: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  bottomPrice: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    marginLeft: 8,
  },
  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
  },
  bookButtonText: {
    color: '#ffffff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    marginLeft: 8,
  },
  errorText: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
    marginTop: 50,
  },
});