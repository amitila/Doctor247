import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const ChatAndVideoCallScreen = ({navigation}) => {
	return (
		// <View style={styles.container}>
		// 	<Text style={{fontSize: 20, marginBottom: 10}}>Đang cập nhật</Text>
		// 	<Button
		// 		title="Về trang chủ"
		// 		onPress={() => navigation.navigate('Home')}
		// 	/>
		// 	<WebView source={{ uri: 'https://reactnative.dev/' }} />
		// </View>
		<WebView 
			originWhitelist={['*']}
			source={{ uri: 'https://doctor247-web.herokuapp.com/home' }} 
			style={{marginTop: -60}}
		/>
	);
};

export default ChatAndVideoCallScreen; 

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
});