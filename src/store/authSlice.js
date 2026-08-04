import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: false,
  userData: null, // flat user object: { _id, name, email, bio, profileImageId, profileImageUrl, isVerified, ... }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      // Accept either a bare user object or { userData: user }
      const payload = action.payload;
      state.status = true;
      state.userData =
        payload && payload.userData && typeof payload.userData === 'object' && !payload._id
          ? payload.userData
          : payload;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
    updateUser: (state, action) => {
      if (state.userData) {
        state.userData = { ...state.userData, ...action.payload };
      }
    },
  },
});

export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
