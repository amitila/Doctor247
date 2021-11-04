import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import ProfileForm from '../forms/ProfileForm/ProfileForm';

const ProfileScreen = ({navigation}) => {
	return (
		<View style={styles.container}>
			<ProfileForm/>
			{/* <Button
				title="Đăng nhập/Đăng ký"
				onPress={() => navigation.navigate("SignUpScreen")}
			/> */}
		</View>
	);
};

export default ProfileScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
});