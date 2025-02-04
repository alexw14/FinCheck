import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Platform } from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../../supabase/supabase';

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: any | null;
}

const initialState: AuthState = {
  user: null,
  session: null,
  loading: false,
  error: null,
};

export const signInWithApple = createAsyncThunk(
  'auth/signInWithApple',
  async (_, thunkAPI) => {
    try {
      if (Platform.OS !== 'ios') {
        throw new Error('Sign in with Apple is only available on iOS devices.');
      }

      // Perform Apple sign-in to get credentials
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      if (!credential.identityToken) {
        throw new Error('No identityToken returned from Apple.');
      }

      // Sign in supabase with apple identity token
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'apple',
        token: credential.identityToken,
      });
      if (error) {
        throw new Error(error.message);
      }

      return {
        user: data.user,
        session: data.session,
      };
    } catch (e: any) {
      if (e.code === 'ERR_REQUEST_CANCELED') {
        return thunkAPI.rejectWithValue('Sign in was canceled by the user.');
      }
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

// restore session on app load
export const restoreSession = createAsyncThunk(
  'auth/restoreSession',
  async (_, thunkAPI) => {
    try {
      const { data, error } = await supabase.auth.getSession();
      console.log(data);
      if (error) throw error;

      if (data?.session) {
        return {
          user: data.session.user,
          session: data.session,
        };
      } else {
        return {
          user: null,
          session: null,
        };
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

// handle session changes dynamically
export const listenToAuthChanges = createAsyncThunk(
  'auth/listenToAuthChanges',
  async (_, thunkAPI) => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        thunkAPI.dispatch(
          authSlice.actions.setSession({
            session,
            user: session.user,
          })
        );
      } else {
        thunkAPI.dispatch(authSlice.actions.signOut());
      }
    });
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut(state) {
      state.user = null;
      state.session = null;
      state.loading = false;
      state.error = null;
    },
    setSession(state, action) {
      state.session = action.payload.session;
      state.user = action.payload.user;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInWithApple.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInWithApple.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.session = action.payload.session;
      })
      .addCase(signInWithApple.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { signOut } = authSlice.actions;
export default authSlice.reducer;
