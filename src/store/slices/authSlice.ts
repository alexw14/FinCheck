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

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut(state) {
      state.user = null;
      state.session = null;
      state.loading = false;
      state.error = null;
    }
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
