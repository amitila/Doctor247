import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const SettingsScreen = ({navigation}) => {
	return (
		<View style={styles.container}>
			<Text style={{fontSize: 20, marginBottom: 10}}>Đang cập nhật</Text>
			<Button
				title="Về trang chủ"
				onPress={() => navigation.navigate('Home')}
			/>
		</View>
	);
};

export default SettingsScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
});