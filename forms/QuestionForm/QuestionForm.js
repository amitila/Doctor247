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
								uri: images.image_1 ? images.image_1.uri : "https://lh3.googleusercontent.com/js_muW7dgbU1UwFXFswhBPMT4Fe-s5kZb0H_Q2Ea88-AGtALGLaHbn4etsy_nsz9NFr7N6ZZaV6wcdkhDHLhmKyzAas0QIx_gjsDZRKRp6R5nezzlH72y9zM3lLySWM5Ia7McQOy3h06yF2eVB11BJsiAnCRS93GcEw5JpN-qydd62DlihWNssMM8YiyMVfrl_wuQlcImc458s_J8eV7mkvv39oeDAU4DHRsUpo-T-MWHu7FfroXeXA6dO270Lh9GrGnT446x3gCXgH8lRKkp8ecCE68BCrzIy77IUt5AR4XWge_xMkpL21fVmxB9rZXQ4Enp4XqcL6WByZH2OzS6zniqymvwOQXDseoIk8MvyJxmnH0a1g4ogajgl4p57krwp247LxMwlIIO4h_XM54gRPK3lq3A8Iw-2h7NaM0AmbjFCqjOrtjmjpZl72RU-4Ai6fZJpX-lulHOdTae43IvojvwfJXGrJNrNeb-pveU8GNGnADug1fGXpWmS3Pz-dhyBL3bccYtbtaHinnXjZ-LLppVsr1vsHSvXbryQ6xGj36OWcAVoDXKqtiPOqP7lr_gBV1NgXqnW37ZMM-1Lps1bkg-Ye2oKeLEE3Xe-h722DKOH0XiaM8i-QK3dqp1ZB33FSU_t_lUypS7fPPvfypjippGljbKNCeMEvo-yRtmKkKTVyOu_SOev2uBKzT-NnKXzt2BjPrY8yHLGuX92a_CqwvZg=w584-h664-no?authuser=0",
							}}
							onPress={() => { pickImageFromLibrary_1() }}
						/>	
						<Avatar
							size="xlarge"
							source={{
								uri: images.image_2 ? images.image_2.uri : "https://lh3.googleusercontent.com/js_muW7dgbU1UwFXFswhBPMT4Fe-s5kZb0H_Q2Ea88-AGtALGLaHbn4etsy_nsz9NFr7N6ZZaV6wcdkhDHLhmKyzAas0QIx_gjsDZRKRp6R5nezzlH72y9zM3lLySWM5Ia7McQOy3h06yF2eVB11BJsiAnCRS93GcEw5JpN-qydd62DlihWNssMM8YiyMVfrl_wuQlcImc458s_J8eV7mkvv39oeDAU4DHRsUpo-T-MWHu7FfroXeXA6dO270Lh9GrGnT446x3gCXgH8lRKkp8ecCE68BCrzIy77IUt5AR4XWge_xMkpL21fVmxB9rZXQ4Enp4XqcL6WByZH2OzS6zniqymvwOQXDseoIk8MvyJxmnH0a1g4ogajgl4p57krwp247LxMwlIIO4h_XM54gRPK3lq3A8Iw-2h7NaM0AmbjFCqjOrtjmjpZl72RU-4Ai6fZJpX-lulHOdTae43IvojvwfJXGrJNrNeb-pveU8GNGnADug1fGXpWmS3Pz-dhyBL3bccYtbtaHinnXjZ-LLppVsr1vsHSvXbryQ6xGj36OWcAVoDXKqtiPOqP7lr_gBV1NgXqnW37ZMM-1Lps1bkg-Ye2oKeLEE3Xe-h722DKOH0XiaM8i-QK3dqp1ZB33FSU_t_lUypS7fPPvfypjippGljbKNCeMEvo-yRtmKkKTVyOu_SOev2uBKzT-NnKXzt2BjPrY8yHLGuX92a_CqwvZg=w584-h664-no?authuser=0",
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