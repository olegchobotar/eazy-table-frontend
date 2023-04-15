import { ToastAndroid } from 'react-native';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';

type ApplicationSliceState = {
  isLoading: boolean;
  theme: 'light' | 'dark';
  currentUser: object;
};

const initialState: ApplicationSliceState = {
  isLoading: false,
  theme: 'light',
  currentUser: {},
};

export const authenticateUser = createAsyncThunk(
  'users/signUp',
  async ({ email, password }) => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          ToastAndroid.show(
            'That email address is already in use!',
            ToastAndroid.TOP,
          );
        }

        if (error.code === 'auth/invalid-email') {
          ToastAndroid.show('That email address is invalid!', ToastAndroid.TOP);
        }
      });
  },
);

export const loginUser = createAsyncThunk(
  'users/login',
  async ({ email, password }) => {
    console.log('')
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          ToastAndroid.show(
            'That email address is already in use!',
            ToastAndroid.TOP,
          );
        }

        if (error.code === 'auth/invalid-email') {
          ToastAndroid.show('That email address is invalid!', ToastAndroid.TOP);
        }
        if (error.code === 'auth/user-not-found') {
          ToastAndroid.show('User with this email has not found', ToastAndroid.TOP);
        }

      });
  },
);



export const signOutUser = createAsyncThunk('users/signOut', async () => {
  auth()
    .signOut()
    .then(() => console.log('User signed out!'));
});

export const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    updateCurrentUser: (state, { payload }) => {
      state.currentUser = {
        name: payload.displayName,
        email: payload.email,
        phoneNumber: payload.phoneNumber,
      };
    },
  },
});

export const { toggleTheme, updateCurrentUser } = applicationSlice.actions;

export default applicationSlice.reducer;
