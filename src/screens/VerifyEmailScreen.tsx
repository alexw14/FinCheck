import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { verifyEmail } from '../store/slices/authSlice';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const VerifyEmailScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  // trigger email verification check when screen is loaded
  useEffect(() => {
    dispatch(verifyEmail());
  }, [dispatch]);

  // redirect to dashboard screen if user has confirmed email
  useEffect(() => {
    if (user?.email && user?.email_confirmed_at) {
      navigation.navigate('Dashboard');
    }
  }, [user, navigation]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Verifying your email...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity
          style={styles.tryAgainBtn}
          onPress={() => dispatch(verifyEmail())}
        >
          <Text style={styles.tryAgainBtnText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Please verify your email</Text>
      <Text style={styles.message}>
        We've sent you an email to verify your address. Please check your inbox
        (and spam folder!)
      </Text>
      <TouchableOpacity style={styles.resendBtn}>
        <Text style={styles.resendBtnText}>Resend verification email</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#007BFF',
    fontWeight: '600',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
  tryAgainBtn: {
    backgroundColor: '#FF4D4D',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  tryAgainBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
  },
  resendBtn: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  resendBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default VerifyEmailScreen;
