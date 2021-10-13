import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const NotificationScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<Text>Notification Screen</Text>
			<Button
				title="Go to details screen...again"
				onPress={() => navigation.push("Notification")}
			/>
			<Button
				title="Go to home"
				onPress={() => navigation.navigate("Home")}
			/>
			<Button
				title="Go back"
				onPress={() => navigation.goBack()}
			/>
		</View>
	);
};

export default NotificationScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
});