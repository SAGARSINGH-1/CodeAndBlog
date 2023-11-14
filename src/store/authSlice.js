import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    status: false,
    userData:null,
    isChecked: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {  // <-- Note the correct key here
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        },
        changeCheck: (state) => {
            state.isChecked = !state.isChecked;
        }
    }
});



export const {login,logout,changeCheck} = authSlice.actions;
export default authSlice.reducer;

