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
		const arrImage = [images.image_1 ? images.image_1 : null, images.image_2 ? images.image_2 : null]
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
								uri: images.image_1 ? images.image_1.uri : 'https://lh3.googleusercontent.com/J75ZIT3AoS_hrXIvMRCVToYdTx-xNRDjgCAjhhDYLf5viwskkWy3jFqKEqjdw8bgQveU_BJiXM4bOf7dshSzT8BVdfaXHhKdrzjt6XeCer_oTH9zPJBdnkiwerGRTNpfsf_oUgSRXD1iU7NibaBxxM9iYzrBPO75fGWS5w8uJJoDOJWJSpOadVxk3ui8v1bEWRTVpwZBOHQDi25TdzXJHljF_GJFE8Sh8VLibRyGrRvewn_BwDci3LgStNiTOMAsrXfKj02eT27sGKTXboQOo-NhDHiZn3yyZNE-lKm5G6_SDXjcfioRVjDcr_fnHhWp3976LCEP_RfAxe_ZGq9b5_OgeQVPPrjrtAVb4N6noG1cJNEHMWbR7MpPp7oaa2lel8blP8rVs4PktQdgTyVjg0skCPZtG_mG1QHsSAe9sT0vB_-6m9HyHUmlf0bfEzHQj1Nh9GhIGtb7aH0DN1hLm1ug5hpsQimCMd-m7m40TjaU5iSYd6Rj0UuiuFUT022M9xGPIDj_Fhc1FsB6PIgFzZZIXywU8hcts5f01tTPtlUg3E0MYSV3dhonBk1UZqRE9EJ01vTae20lnETgZX_I_f6tt1hf98roJzxkrhBWqXPXsc-FZqgvyMc-LLyep1qvz36vxCbIVXiLYKm1mxqn7gYwdrIyR_5in5Wd6M4y9h97xpXtr7PrvS34ZvNq5LpAM7F0wljHNynF4xZ8hYeW2Izkmg=w584-h664-no?authuser=0',
							}}
							onPress={() => { pickImageFromLibrary_1() }}
						/>	
						<Avatar
							size="xlarge"
							source={{
								uri: images.image_2 ? images.image_2.uri : 'https://lh3.googleusercontent.com/J75ZIT3AoS_hrXIvMRCVToYdTx-xNRDjgCAjhhDYLf5viwskkWy3jFqKEqjdw8bgQveU_BJiXM4bOf7dshSzT8BVdfaXHhKdrzjt6XeCer_oTH9zPJBdnkiwerGRTNpfsf_oUgSRXD1iU7NibaBxxM9iYzrBPO75fGWS5w8uJJoDOJWJSpOadVxk3ui8v1bEWRTVpwZBOHQDi25TdzXJHljF_GJFE8Sh8VLibRyGrRvewn_BwDci3LgStNiTOMAsrXfKj02eT27sGKTXboQOo-NhDHiZn3yyZNE-lKm5G6_SDXjcfioRVjDcr_fnHhWp3976LCEP_RfAxe_ZGq9b5_OgeQVPPrjrtAVb4N6noG1cJNEHMWbR7MpPp7oaa2lel8blP8rVs4PktQdgTyVjg0skCPZtG_mG1QHsSAe9sT0vB_-6m9HyHUmlf0bfEzHQj1Nh9GhIGtb7aH0DN1hLm1ug5hpsQimCMd-m7m40TjaU5iSYd6Rj0UuiuFUT022M9xGPIDj_Fhc1FsB6PIgFzZZIXywU8hcts5f01tTPtlUg3E0MYSV3dhonBk1UZqRE9EJ01vTae20lnETgZX_I_f6tt1hf98roJzxkrhBWqXPXsc-FZqgvyMc-LLyep1qvz36vxCbIVXiLYKm1mxqn7gYwdrIyR_5in5Wd6M4y9h97xpXtr7PrvS34ZvNq5LpAM7F0wljHNynF4xZ8hYeW2Izkmg=w584-h664-no?authuser=0',
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