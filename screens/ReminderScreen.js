import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ReminderScreen = () => {
	return (
		<View style={styles.container}>
			<Text>QuestionScreen</Text>
			<Button
				title="Click Here"
				onPress={() => alert('Button Clicked!')}
			/>
		</View>
	);
};

export default ReminderScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
});