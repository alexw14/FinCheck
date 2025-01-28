import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';


const DashboardScreen = () => {
  const { user, loading, error } = useSelector(
    (state: RootState) => state.auth
  );
  console.log(user);

  return (
    <View style={styles.container}>
      <Text>{user?.email}</Text>
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
});

export default DashboardScreen;
