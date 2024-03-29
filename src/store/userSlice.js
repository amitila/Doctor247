import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	role: '',
	id: '',
	relationship: '',
	email: '',
	password: '',
	avatar: '',
	name: '',
	gender: '',
	birthday: '',
	bhyt: '',
	phone: '',
	province: '',
	address: '',
	myid: ''
};

// Config slice
export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		updateRole: (state, action) => {
			state.role = action.payload || initialState.role;
		},
		updateId: (state, action) => {
			state.id = action.payload || initialState.id;
		},
		updateRelationship: (state, action) => {
			state.relationship = action.payload || initialState.relationship;
		},
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
		updateMyid: (state, action) => {
			state.myid = action.payload || initialState.myid;
		},
	}
});

// Export actions
export const {
	updateRole,
	updateId,
	updateRelationship,
	updateEmail,
	updatePassword,
	updateAvatar,
	updateName,
	updateGender,
	updateBirthday,
	updateBhyt,
	updatePhone,
	updateProvince,
	updateAddress,
	updateMyid
} = userSlice.actions;

// Select state username from slice
export const selectRole = state => state.user.role;
export const selectId = state => state.user.id;
export const selectRelationship = state => state.user.relationship;
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
export const selectMyid = state => state.user.myid;

// Export reducer
export default userSlice.reducer;
