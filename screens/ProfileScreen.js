import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ProfileScreen = ({navigation}) => {
	return (
		<View style={styles.container}>
			<Text>Profile Screen</Text>
			<Button
				title="Đăng nhập/Đăng ký"
				onPress={() => navigation.navigate("SignUpScreen")}
			/>
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