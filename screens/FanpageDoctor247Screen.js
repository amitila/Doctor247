import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const FanpageDoctor247Screen = ({navigation}) => {
	return (
		// <View style={styles.container}>
		// 	<Text style={{fontSize: 20, marginBottom: 10}}>Đang cập nhật</Text>
		// 	<Button
		// 		title="Về trang chủ"
		// 		onPress={() => navigation.navigate('Home')}
		// 	/>
		// </View>
		<WebView 
			// originWhitelist={['*']}
			source={{ uri: 'https://www.facebook.com/doctor247DHT' }} 
		/>
	);
};

export default FanpageDoctor247Screen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
});