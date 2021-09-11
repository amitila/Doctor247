import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  password: '',
  avatar: 'https://scr.vn/wp-content/uploads/2020/08/H%C3%ACnh-g%C3%A1i-%C4%91%E1%BA%B9p-t%C3%B3c-d%C3%A0i-ng%E1%BA%A7u.jpg',
  name: '',
  gender: '',
  birthday: '',
  bhyt: '',
  phone: '',
  province: '',
  address: ''
};

// Config slice
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateEmail: (state, action) => {
      state.email = action.payload || initialState.email;
    },
    updatePassword: (state, action) => {
      state.password = action.payload || initialState.password;
    },
    updateAvatar: (state, action) => {
      state.avatar = action.payload || initialState.avatar;
    },
    updateName: (state, action) => {
      state.name = action.payload || initialState.name;
    },
    updateGender: (state, action) => {
      state.gender = action.payload || initialState.gender;
    },
    updateBirthday: (state, action) => {
      state.birthday = action.payload;
    },
    updateBhyt: (state, action) => {
      state.bhyt = action.payload || initialState.bhyt;
    },
    updatePhone: (state, action) => {
      state.phone = action.payload || initialState.phone;
    },
    updateProvince: (state, action) => {
      state.province = action.payload || initialState.province;
    },
    updateAddress: (state, action) => {
      state.address = action.payload || initialState.address;
    },
  }
});

// Export actions
export const { 
  updateEmail, 
  updatePassword,
  updateAvatar,
  updateName,
  updateGender,
  updateBirthday,
  updateBhyt,
  updatePhone,
  updateProvince,
  updateAddress
} = userSlice.actions;

// Select state username from slice
export const selectEmail = state => state.user.email;
export const selectPassword = state => state.user.password; 
export const selectAvatar = state => state.user.avatar;
export const selectName = state => state.user.name; 
export const selectGender = state => state.user.gender;
export const selectBirthday = state => state.user.birthday; 
export const selectBhyt = state => state.user.bhyt;
export const selectPhone = state => state.user.phone; 
export const selectProvince = state => state.user.province;
export const selectAddress = state => state.user.address; 

// Export reducer
export default userSlice.reducer;
