import React, { useEffect, useState } from "react";
import { Button, StyleSheet, View, TextInput } from "react-native";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

// Show notifications when the app is in foreground
Notifications.setNotificationHandler({
	handleNotification: async () => {
		return {
			shouldShowAlert: true,
		};
	},
});

const PushNotificationForm = (props) => {
	// const title = 'Lịch khám số 1';
	// const body = 'Bạn đang có lịch khám với bác sĩ Tâm vào lúc 10h30 hôm nay!';

	useEffect(() => {
		// Permission for iOS
		Permissions.getAsync(Permissions.NOTIFICATIONS)
			.then((statusObj) => {
				// Check if we already have permission
				if (statusObj.status !== "granted") {
					// If permission is not there, ask for the same
					return Permissions.askAsync(Permissions.NOTIFICATIONS);
				}
				return statusObj;
			})
			.then((statusObj) => {
				// If permission is still not given throw error
				if (statusObj.status !== "granted") {
					throw new Error("Permission not granted");
				}
			})
			.catch((err) => {
				return null;
			});
	}, []);

	useEffect(() => {
		const receivedSubscription = Notifications.addNotificationReceivedListener(
			(notification) => {
				console.log("Notification Received!");
				console.log(notification);
			}
		);
		const responseSubscription = Notifications.addNotificationResponseReceivedListener(
			(response) => {
				console.log("Notification Clicked!");
				console.log(response);
			}
		);
		return () => {
			receivedSubscription.remove();
			responseSubscription.remove();
		};
	}, []);

	const triggerLocalNotificationHandler = () => {
		Notifications.scheduleNotificationAsync({
			content: {
				title: props.title,
				body: props.body,
			},
			trigger: { seconds: 5 },
		});
	};

	useEffect(() => {
		triggerLocalNotificationHandler()
	}, [])

	return (
		<View>
			{/* <View style={styles.container}>
				<Button
					title="Nhận thông báo"
					onPress={triggerLocalNotificationHandler}
				/>
			</View> */}
		</View>
	);
}

export default PushNotificationForm;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	textInput: {
		borderBottomWidth: 1,
		padding: 5,
		margin: 15,
		width: "80%",
	},
});
