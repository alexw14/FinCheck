import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  return (
    <View>
      <Text>Login</Text>
      <TextInput placeholder="email" />
      <TextInput placeholder="password" secureTextEntry/>
    </View>
  );
};

const styles = StyleSheet.create({});

export default LoginScreen;
