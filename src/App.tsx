import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import Navigation from './navigation/RootNavigation';
import { store, AppDispatch } from './store/store';
import { restoreSession, listenToAuthChanges } from './store/slices/authSlice';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    // restore session on app load
    dispatch(restoreSession());
    // listen for session changes
    dispatch(listenToAuthChanges());
  }, [dispatch]);

  return <Navigation />;
};

const Root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default Root;
