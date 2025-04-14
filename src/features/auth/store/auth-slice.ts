import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  error: string | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  error: null,
  isLoading: false,
};

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailed: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    registerStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    registerSuccess: (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    registerFailed: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailed,
  registerStart,
  registerSuccess,
  registerFailed,
  logout,
} = authSlice.actions;

// Thunks for simulating API calls
export const loginUser = (credentials: LoginPayload) => (dispatch: any) => {
  dispatch(loginStart());

  // Simulated API call
  setTimeout(() => {
    // Mock authentication - check if credentials match the sample user
    if (
      credentials.email === 'user@example.com' &&
      credentials.password === 'password'
    ) {
      dispatch(
        loginSuccess({
          id: '1',
          name: 'Test User',
          email: credentials.email,
        })
      );
    } else {
      dispatch(loginFailed('Invalid email or password'));
    }
  }, 1000);
};

export const registerUser = (userData: RegisterPayload) => (dispatch: any) => {
  dispatch(registerStart());

  // Simulated API call
  setTimeout(() => {
    // Basic validation
    if (!userData.name || !userData.email || !userData.password) {
      dispatch(registerFailed('All fields are required'));
      return;
    }

    if (!userData.email.includes('@')) {
      dispatch(registerFailed('Invalid email address'));
      return;
    }

    if (userData.password.length < 6) {
      dispatch(registerFailed('Password must be at least 6 characters'));
      return;
    }

    // Mock successful registration
    dispatch(
      registerSuccess({
        id: Math.random().toString(36).substring(2, 9), // generate random ID
        name: userData.name,
        email: userData.email,
      })
    );
  }, 1000);
};

export default authSlice.reducer;
