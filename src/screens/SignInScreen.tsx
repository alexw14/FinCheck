import React, { useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Platform, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as AppleAuthentication from 'expo-apple-authentication';
import { AppDispatch, RootState } from '../store/store';
import { signInWithApple } from '../store/slices/authSlice';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';

const SignInScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  // navigate to dashboard if user is signed in
  useEffect(() => {
    if (user) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Dashboard' }],
      });
    }
  }, [user, navigation]);

  const handleAppleSignIn = async () => {
    dispatch(signInWithApple());
  };

  const appleSignInBtn =
    Platform.OS === 'ios' ? (
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        style={styles.appleButton}
        onPress={handleAppleSignIn}
      />
    ) : null;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sign in to FinCheck</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        appleSignInBtn
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  appleButton: {
    width: 200,
    height: 64,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default SignInScreen;
