import React, { useState, useEffect } from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function UploadImage(props) {
	const [image, setImage] = useState(props.url);
	useEffect(() => {
		setImage(props.url);
	}, [props.url]);

	const addImage = async () => {
		let _image = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		if (!_image.cancelled) {
			const response = await fetch(_image.uri);
			const blob = await response.blob();
			setImage(_image.uri);
			props.getUri(_image, blob);
		}
	};

	const checkForCameraRollPermission = async () => {
		const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
		if (status !== 'granted') {
			alert("Vui lòng cấp quyền cho camera bên trong cài đặt hệ thống của bạn");
		} else {
			console.log('Quyền phương tiện đã được cấp')
		}
	}

	useEffect(() => {
		checkForCameraRollPermission()
	}, []);

	return (
		<View style={imageUploaderStyles.container}>
			{
				image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
			}

			<View style={imageUploaderStyles.uploadBtnContainer}>
				<TouchableOpacity onPress={addImage} style={imageUploaderStyles.uploadBtn} >
					<Text>{image ? 'Thay đổi' : 'Cập nhật'} Ảnh đại diện</Text>
					<AntDesign name="camera" size={20} color="black" />
				</TouchableOpacity>
			</View>
		</View>

	);
}

const imageUploaderStyles = StyleSheet.create({
	container: {
		elevation: 2,
		height: 200,
		width: 200,
		backgroundColor: '#efefef',
		position: 'relative',
		borderRadius: 999,
		overflow: 'hidden',
	},
	uploadBtnContainer: {
		opacity: 0.7,
		position: 'absolute',
		right: 0,
		bottom: 0,
		backgroundColor: 'lightgrey',
		width: '100%',
		height: '25%',
	},
	uploadBtn: {
		display: 'flex',
		alignItems: "center",
		justifyContent: 'center'
	}
})