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
import DatePicker from './DatePicker';
import moment from 'moment';
import APIService from '../../utils/APIService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

const bookingTime = [
	'07h30 - 08h00',
	'08h30 - 09h00',
	'09h30 - 10h00',
	'10h30 - 11h00',
	'11h00 - 11h30',
	'11h30 - 12h00',
	'13h00 - 13h30',
	"13h30 - 14h00",
	'14h00 - 14h30',
	'14h30 - 15h00',
	'15h00 - 15h30',
	'15h30 - 16h00',
	'16h00 - 16h30',
	"16h30 - 17h00",
];

const BookingForm = (props) => {
	
	const [data, setData] = useState({
		id: '',
		name: '',
		date: '',
		hour: '',
		doctor: '',
		description: '',
		guardianId: props.id,
		doctorId: '',
		dayTime: '',
	});

	const { patients, doctorId } = props;

	const [date, setDate] = useState('2021-11-11');
	const [hour, setHour] = useState('');
	const [dateTime, setDateTime] = useState(new Date())
	const [selectedGuardian, setSelectedGuardian] = useState(patients[0].userTwoId ? patients[0].userTwoId : '' );
	const [isHaveChange, setIsHaveChange] = useState(-1)
	const [images, setImages] = useState({
		image_1: '',
		image_2: ''
	})

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
	const registerHandle = () => {
		AsyncStorage.getItem('token')
			.then((token) => {
				const arrImage = [];
				if(images.image_1) arrImage.push(images.image_1);
				if(images.image_2) arrImage.push(images.image_2);
				APIService.postAppointment(
					token,
					{
						guardianId: selectedGuardian,
						doctorId: doctorId,
						dayTime: dateTime.toString(),
						description: data.description,
						images: arrImage,
					},
					(success, json) => {
						if (success && json.result) {
							setIsHaveChange(0);
							props.onClose();
							return alert("Đặt lịch THÀNH CÔNG!");
						} else {
							return alert("THẤT BẠI");
						}
					}
				)
			})
	}

	const getBirthday = () => {
		var birthday = new Date();
		var value = date;
		birthday.setDate(parseInt(value.slice(8, 10)));
		birthday.setMonth(parseInt(value.slice(5, 7)) - 1);
		birthday.setFullYear(parseInt(value.slice(0, 4)));
		return birthday;
	}

	const handleChangeDate = (selectedDate) => {
		var month = selectedDate.getMonth() + 1; //months from 1-12
		var day = selectedDate.getDate();
		var year = selectedDate.getFullYear();
		console.log(year + "-" + (month < 10 ? '0' + month : month) + "-" + day);
		return setDate(year + "-" + (month < 10 ? '0' + month : month) + "-" + day);
		// setDate(selectedDate.slice(0,10))
		// return console.log(selectedDate.toString().slice(0,10))
	}

	useEffect(() => {
		if(date) {
			dateTime.setDate(parseInt(date.slice(8,10)));
			dateTime.setMonth(parseInt(date.slice(5,7) -1));
			dateTime.setFullYear(parseInt(date.slice(0,4)));
		}
		if(hour) {
			dateTime.setHours(parseInt(hour.slice(0,2)));
			dateTime.setMinutes(parseInt(hour.slice(3,5)));
			dateTime.setSeconds(0);
		}
	},[date, hour])

	return (
		<View style={styles.container}>
			<StatusBar backgroundColor='#036ffc' barStyle="light-content" />
			<View style={styles.header}>
				<Text style={styles.text_header}>Đặt lịch khám</Text>
			</View>
			<Animatable.View
				animation="fadeInUpBig"
				style={styles.footer}
			>
				<ScrollView>
					<Text style={[styles.text_footer, {
						marginTop: 0
					}]}>Khám cho ai</Text>
					<View style={styles.action}>
						<Picker
							selectedValue={selectedGuardian}
							style={{ height: 50, width: 300 }}
							onValueChange={(itemValue, itemIndex) => setSelectedGuardian(itemValue)}
						>
							{
								patients.map((item, index) => {
									return <Picker.Item label={item.name} value={item.userTwoId} key={index} />
								})
							}
						</Picker>
					</View>

					<Text style={[styles.text_footer, {
						marginTop: 35
					}]}>Ngày khám</Text>
					<View style={styles.action}>
						<DatePicker date={getBirthday()} handleChangeDate={handleChangeDate} />
					</View>

					<Text style={[styles.text_footer, {
						marginTop: 35
					}]}>Giờ khám</Text>
					<View style={styles.action}>
						<Picker
							selectedValue={hour}
							style={{ height: 50, width: 300 }}
							onValueChange={(itemValue, itemIndex) => setHour(itemValue)}
						>
							{
								bookingTime.map((item, index) => {
									return <Picker.Item label={item} value={item} key={index} />
								})
							}
						</Picker>
					</View>

					<Text style={[styles.text_footer, {
						marginTop: 30
					}]}>Lý do đăng ký khám</Text>
					<View style={styles.action}>
						<TextInput
                            multiline={true}
                            numberOfLines={4}
                            placeholder="Lý do đăng ký khám"
							value={data.description}
							style={styles.textInput}
							autoCapitalize="none"
							onChangeText={(val) => setData({
								...data,
								description: val
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

					<View style={styles.textPrivate}>
						<Text style={styles.color_textPrivate}>
							Trước khi đăng ký, bạn chăc chắn rằng
						</Text>
						<Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>{" "}Số điện thọai</Text>
						<Text style={styles.color_textPrivate}>{" "}và</Text>
						<Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>{" "}Email đăng ký{" "}</Text>
						<Text style={styles.color_textPrivate}>
							là chính xác.
						</Text>
					</View>
					<View style={styles.button}>
						<TouchableOpacity
							style={[styles.signIn, {
								borderColor: '#036ffc',
								borderWidth: 1,
								marginTop: 15
							}]}
							onPress={() => { registerHandle() }}
						>
							<Text style={[styles.textSign, {
								color: '#036ffc'
							}]}>Xác nhận đăng ký</Text>
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

export default BookingForm;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#2196f3'
	},
	header: {
		flex: 0.6,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 0,
		paddingBottom: 0
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