import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const OnboardingScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <View style={styles.container}>
      <Text>FinCheck</Text>
      <TouchableOpacity
        style={styles.createAccountBtn}
        onPress={() => navigation.navigate('Signup')}
      >
        <Text style={styles.createAccountBtnText}>Create Account</Text>
      </TouchableOpacity>
      <View style={styles.signInContainer}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.signInText}>Sign in.</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  createAccountBtn: {
    backgroundColor: '#007BFF',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 20,
  },
  createAccountBtnText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signInText: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
});

export default OnboardingScreen;
