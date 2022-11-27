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
  'users/login',
  async ({ email, password }) => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
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

// const tutorialSlice = createSlice({
//   name: "tutorial",
//   initialState,
//   extraReducers: {
//     [createTutorial.fulfilled]: (state, action) => {
//       state.push(action.payload);
//     },
//     [retrieveTutorials.fulfilled]: (state, action) => {
//       return [...action.payload];
//     },
//     [updateTutorial.fulfilled]: (state, action) => {
//       const index = state.findIndex(tutorial => tutorial.id === action.payload.id);
//       state[index] = {
//         ...state[index],
//         ...action.payload,
//       };
//     },
//     [deleteTutorial.fulfilled]: (state, action) => {
//       let index = state.findIndex(({ id }) => id === action.payload.id);
//       state.splice(index, 1);
//     },
//     [deleteAllTutorials.fulfilled]: (state, action) => {
//       return [];
//     },
//     [findTutorialsByTitle.fulfilled]: (state, action) => {
//       return [...action.payload];
//     },
//   },
// });

export const { toggleTheme, updateCurrentUser } = applicationSlice.actions;

export default applicationSlice.reducer;
