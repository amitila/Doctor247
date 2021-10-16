import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from './HomeScreen';
import NotificationScreen from './NotificationScreen';
import ReminderScreen from './ReminderScreen';
import ProfileScreen from './ProfileScreen';

const HomeStack = createStackNavigator();
const NotificationStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
	<Tab.Navigator
		initialRouteName="Home"
		activeColor="#fff"
	>
		<Tab.Screen
			name="Home"
			component={HomeScreen}
			options={{
				tabBarLabel: 'Trang chủ',
				tabBarColor: '#036ffc',
				tabBarIcon: ({ color }) => (
					<Icon name="ios-home" color={color} size={26} />
				),
			}}
		/>
		<Tab.Screen
			name="Reminder"
			display={false}
			component={ReminderScreen}
			options={{
				tabBarLabel: 'Nhắc lịch',
				tabBarColor: '#036ffc',
				tabBarIcon: ({ color }) => (
					<Icon name="alarm" color={color} size={28} />
				),
			}}
		/>
		<Tab.Screen
			name="Notification"
			component={NotificationScreen}
			options={{
				tabBarLabel: 'Thông báo',
				tabBarColor: '#036ffc',
				tabBarIcon: ({ color }) => (
					<Icon name="ios-notifications" color={color} size={26} />
				),
			}}
		/>
		<Tab.Screen
			name="Profile"
			component={ProfileScreen}
			options={{
				tabBarLabel: 'Cá nhân',
				tabBarColor: '#036ffc',
				tabBarIcon: ({ color }) => (
					<Icon name="ios-person" color={color} size={26} />
				),
			}}
		/>
	</Tab.Navigator>
);

export default MainTabScreen;

// const HomeStackScreen = ({ navigation }) => (
// 	<HomeStack.Navigator screenOptions={{
// 		headerStyle: {
// 			backgroundColor: '#009387',
// 		},
// 		headerTintColor: '#fff',
// 		headerTitleStyle: {
// 			fontWeight: 'bold'
// 		}
// 	}}>
// 		<HomeStack.Screen name="Home" component={HomeScreen} options={{
// 			title: 'Overview',
// 			// headerLeft: () => (
// 			// 	<Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
// 			// )
// 		}} />
// 	</HomeStack.Navigator>
// );

// const NotificationStackScreen = ({ navigation }) => (
// 	<NotificationStack.Navigator screenOptions={{
// 		headerStyle: {
// 			backgroundColor: '#1f65ff',
// 		},
// 		headerTintColor: '#fff',
// 		headerTitleStyle: {
// 			fontWeight: 'bold'
// 		}
// 	}}>
// 		<NotificationStack.Screen name="Notification" component={NotificationScreen} options={{
// 			// headerLeft: () => (
// 			// 	<Icon.Button name="ios-menu" size={25} backgroundColor="#1f65ff" onPress={() => navigation.openDrawer()}></Icon.Button>
// 			// )
// 		}} />
// 	</NotificationStack.Navigator>
// );
