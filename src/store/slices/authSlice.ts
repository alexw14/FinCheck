import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../supabase/supabase';
import { Session } from '@supabase/supabase-js';

interface AuthState {
  user: {
    id: string | null;
    email: string | null;
    email_confirmed_at: string | null;
  } | null;
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

export const signUpUser = createAsyncThunk(
  'auth/signUpUser',
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        throw new Error(error.message);
      }
      return data.user;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const verifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async (_, thunkAPI) => {
    try {
      const { data: session, error } = await supabase.auth.getSession();
      if (error) throw error;

      if (session && session.session) {
        const { data: refreshedUser, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;
        if (refreshedUser.user?.email_confirmed_at) {
          return refreshedUser.user;
        } else {
          throw new Error('Email not verified yet');
        }
      }
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        const { id, email, email_confirmed_at } = action.payload || {};
        state.user = action.payload
          ? {
              id: id || null,
              email: email || null,
              email_confirmed_at: email_confirmed_at || null,
            }
          : null;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.loading = false;
        const { id, email, email_confirmed_at } = action.payload || {};
        state.user = action.payload
          ? {
            id: id || null,
            email: email || null,
            email_confirmed_at: email_confirmed_at || null,
            }
          : null;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default authSlice.reducer;
