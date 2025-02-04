import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { AppDispatch, RootState } from '../store/store';
import { signOutUser } from '../store/slices/authSlice';

const SettingsScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const handleSignOut = async () => {
    try {
      await dispatch(signOutUser());
      navigation.navigate('SignIn');
    } catch (error) {
      console.error('Sign out error: ', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.signOutBtn} onPress={handleSignOut}>
        <Text style={styles.signOutBtnText}>Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems:'center',
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  signOutBtn: {
    backgroundColor: '#FF4D4D',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  signOutBtnText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  }
});

export default SettingsScreen;
