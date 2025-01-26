import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { Navigation } from './navigation/RootNavigation';
import { store } from './store/store';

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

const styles = StyleSheet.create({});
