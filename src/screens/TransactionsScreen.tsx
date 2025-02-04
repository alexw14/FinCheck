import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const TransactionsScreen = () => {
  const { user, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  return (
    <View style={styles.container}>
      <Text>Transactions Screen</Text>
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

export default TransactionsScreen;
