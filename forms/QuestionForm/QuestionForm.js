import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	Button,
	TouchableOpacity,
	Dimensions,
	TextInput,
	Platform,
	StyleSheet,
	ScrollView,
	StatusBar,
	Alert,
	Picker
} from 'react-native';
import * as Animatable from 'react-native-animatable';
// import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import RadioForm from 'react-native-radio-form';
import { Avatar } from 'react-native-elements';
import moment from 'moment';
import APIService from '../../utils/APIService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

const QuestionForm = (props) => {
	
	const [data, setData] = useState({
		title: '',
        content: '',
		images: '',
	});
	const [images, setImages] = useState({
		image_1: '',
		image_2: ''
	})
	
	const [isHaveChange, setIsHaveChange] = useState(-1)

	// upload image to server
	const pickImageFromLibrary_1 = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});
		if (!result.cancelled) {
			setImages(preData => ({ ...preData, image_1: result }))
			// setImages(result)
		}
	};

	const pickImageFromLibrary_2 = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});
		if (!result.cancelled) {
			setImages(preData => ({ ...preData, image_2: result }))
			// setImages(result)
		}
	};
	//////////////////////////
	const postQuestion = () => {
		const arrImage = [];
		if(images.image_1) arrImage.push(images.image_1);
		if(images.image_2) arrImage.push(images.image_2);
		AsyncStorage.getItem('token')
			.then((token) => {
				return APIService.postQuestion(
					token,
					{
						title: data.title,
						content: data.content, 
                        images: arrImage
						
					},
					(success, json) => {
						if (success && json.result) {
							// dispatch(updateName(json.result.customer.lastName));
							// APIService.getProfile(token, (success, json) => {
							// 	if(success && json.result){
							// 		dispatch(updateAvatar(json.result.customer.avatarURL));
							// 	}
							// }) 
							setIsHaveChange(0);
							props.onClose();
							return alert("THÀNH CÔNG !");
						} else {
							return console.log("Cập nhật thay đổi THẤT BẠI !");
						}
					})
			})
	}

	return (
		<View style={styles.container}>
			<StatusBar backgroundColor='#036ffc' barStyle="light-content" />
			<View style={styles.header}>
				<Text style={styles.text_header}>Tạo câu hỏi</Text>
			</View>
			<Animatable.View
				animation="fadeInUpBig"
				style={styles.footer}
			>
				<ScrollView>
					<Text style={[styles.text_footer, {
						marginTop: 0
					}]}>Tiêu đề</Text>
					<View style={styles.action}>
						<TextInput
							placeholder="Tiêu đề"
							value={data.title}
							style={styles.textInput}
							autoCapitalize="none"
							onChangeText={(val) => setData({
								...data,
								title: val
							})}
						/>
					</View>

					<Text style={[styles.text_footer, {
						marginTop: 30
					}]}>Nội dung</Text>
					<View style={styles.action}>
						<TextInput
                            multiline={true}
                            numberOfLines={4}
                            placeholder="Tiêu đề"
							value={data.content}
							style={styles.textInput}
							autoCapitalize="none"
							onChangeText={(val) => setData({
								...data,
								content: val
							})}
                        />
					</View>

					<Text style={[styles.text_footer, {
						marginTop: 30
					}]}>Ảnh minh họa</Text>
					<View style={styles.images}>
						<Avatar
							size="xlarge"
							source={{
								uri: images.image_1 ? images.image_1.uri : "https://lh3.googleusercontent.com/ZQYmsqAF6NkCW1vyVSX5SpLlCCrH3ZKC-wLOMqwCKuu6XowD0V1x0OYpgm0F2Af47X3jMwQqzJlSKFMoQhkEw7E4d1sBoxOfHhbEsXSaQEgMQV7-P5um6MmxPOP7t46bn_6ErpvCsWaIif4HgTlifknybF0ctTxlgrkt35DxSDdNZ793Xyvd6tyOZjp7YmCO5wd16VGbhjphKtHNHQ-q_0LOuvlM3bBlIRFIxHJiVNLDE11y-XS-a91yn1dGxiagUnhlFTHf_U8_lqdoRGiizy4_w34n_H8w5B8o9P278QrS-gdsW70B_LGwU0wx-TkdAkqSM-O5gNLlCe982mnNJD3PHOfcFyx_VBZ1kg4k0O5GyE6AszhGWaH1Emsi1Ce1W2IfmkMx8jDkvBQMqzJ6q4L7tTR0nA_WckPC3T42uPxnPkTZlnK51g4Qvwr92VtAY5kjqhDTjWge119-7RudJYCOwmrUOYDKzJL9MXgvkGYLqBL8wjhOMpm8w3oRT7g_0eY40ujLrWh3LBD3lrOIJ4gH8CjWY9trjdQRt16J-iyQuHoOlKCrq0tmFm8TiIWmJgnuNEq3IuUerT5KJn2XCpuxkxk23k90BxN0FmMMfiMagYC5ddHIiclkC_WQUk4cJAKclmt9gG3AxftyHY2vaevAlbjR6YXP5p_qP1MU3buYNA9zdmrUMkLAKrvs__Keyg1YbMHAV17zGxvMt9EiCS3WPg=w584-h664-no?authuser=0",
							}}
							onPress={() => { pickImageFromLibrary_1() }}
						/>	
						<Avatar
							size="xlarge"
							source={{
								uri: images.image_2 ? images.image_2.uri : "https://lh3.googleusercontent.com/ZQYmsqAF6NkCW1vyVSX5SpLlCCrH3ZKC-wLOMqwCKuu6XowD0V1x0OYpgm0F2Af47X3jMwQqzJlSKFMoQhkEw7E4d1sBoxOfHhbEsXSaQEgMQV7-P5um6MmxPOP7t46bn_6ErpvCsWaIif4HgTlifknybF0ctTxlgrkt35DxSDdNZ793Xyvd6tyOZjp7YmCO5wd16VGbhjphKtHNHQ-q_0LOuvlM3bBlIRFIxHJiVNLDE11y-XS-a91yn1dGxiagUnhlFTHf_U8_lqdoRGiizy4_w34n_H8w5B8o9P278QrS-gdsW70B_LGwU0wx-TkdAkqSM-O5gNLlCe982mnNJD3PHOfcFyx_VBZ1kg4k0O5GyE6AszhGWaH1Emsi1Ce1W2IfmkMx8jDkvBQMqzJ6q4L7tTR0nA_WckPC3T42uPxnPkTZlnK51g4Qvwr92VtAY5kjqhDTjWge119-7RudJYCOwmrUOYDKzJL9MXgvkGYLqBL8wjhOMpm8w3oRT7g_0eY40ujLrWh3LBD3lrOIJ4gH8CjWY9trjdQRt16J-iyQuHoOlKCrq0tmFm8TiIWmJgnuNEq3IuUerT5KJn2XCpuxkxk23k90BxN0FmMMfiMagYC5ddHIiclkC_WQUk4cJAKclmt9gG3AxftyHY2vaevAlbjR6YXP5p_qP1MU3buYNA9zdmrUMkLAKrvs__Keyg1YbMHAV17zGxvMt9EiCS3WPg=w584-h664-no?authuser=0",
							}}
							onPress={() => { pickImageFromLibrary_2() }}
						/>						
					</View>

					<View style={styles.button}>
						<TouchableOpacity
							style={[styles.signIn, {
								borderColor: '#036ffc',
								borderWidth: 1,
								marginTop: 15
							}]}
							onPress={() => { postQuestion() }}
						>
							<Text style={[styles.textSign, {
								color: '#036ffc'
							}]}>Đăng câu hỏi</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={[styles.signIn, {
								borderColor: '#036ffc',
								borderWidth: 1,
								marginTop: 15
							}]}
							onPress={() => { props.onClose() }}
						>
							<Text style={[styles.textSign, {
								color: '#036ffc'
							}]}>Quay về</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</Animatable.View>
		</View>
	);
};

export default QuestionForm;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#2196f3'
	},
	header: {
		flex: 0.6,
		justifyContent: 'flex-end',
		alignItems: 'center',
		paddingHorizontal: 80,
		paddingBottom: 18
	},
	footer: {
		flex: Platform.OS === 'ios' ? 3 : 5,
		backgroundColor: '#fff',
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		paddingHorizontal: 20,
		paddingVertical: 30
	},
	text_header: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 30
	},
	text_footer: {
		color: '#05375a',
		fontSize: 18
	},
	action: {
		flexDirection: 'row',
		marginTop: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#f2f2f2',
		paddingBottom: 5
	},
	textInput: {
		flex: 1,
		marginTop: Platform.OS === 'ios' ? 0 : -12,
		paddingLeft: 10,
		color: '#05375a',
	},
	button: {
		alignItems: 'center',
		marginTop: 50
	},
	signIn: {
		width: '100%',
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10
	},
	textSign: {
		fontSize: 18,
		fontWeight: 'bold'
	},
	textPrivate: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginTop: 20
	},
	color_textPrivate: {
		color: 'grey'
	},
	datePickerStyle: {
		width: 250,
		marginTop: 20,
	},
	avatar: {
		flexDirection: 'column',
		marginTop: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#f2f2f2',
		paddingBottom: 5,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 50,
	},
	images: {
		flexDirection: 'row',
	}
});