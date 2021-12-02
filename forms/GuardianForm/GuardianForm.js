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
import UploadImage from './UploadImage';

var provinces = [];
APIService.getProvinces((success, json) => {
	if (success && json.result) {
		json.result.map(item => {
			return provinces.push(item)
		})
	}
});

const GuardianForm = (props) => {
	
	const [data, setData] = useState({
		relationship: '',
		email: '',
		firstName: '',
		lastName: '',
		birthday: '',
		gender: '',
		phoneNumber: '',
		healthInsuranceCode: '',
		address: '',
		province: '',
		avatar: '',
		tempAvatar: null
	});

	const [date, setDate] = useState('1999-08-18');
	const [selectedValue, setSelectedValue] = useState('');
	const [isHaveChange, setIsHaveChange] = useState(-1)

	/// upload image to server
	// const pickImageFromLibrary = async () => {
	// 	let result = await ImagePicker.launchImageLibraryAsync({
	// 		mediaTypes: ImagePicker.MediaTypeOptions.All,
	// 		allowsEditing: true,
	// 		aspect: [1, 1],
	// 		quality: 1,
	// 	});
	// 	if (!result.cancelled) {
	// 		setData(preData => ({ ...preData, tempAvatar: result }))
	// 	}
	// };
	//////////////////////////
	const registerHandle = () => {
		AsyncStorage.getItem('token')
			.then((token) => {
				APIService.postGuardian(
					token,
					{
						guardianName: data.relationship,
						firstName: data.firstName,
						lastName: data.lastName,
						gender: data.gender,
						birthday: getBirthday().toString(),
						avatar: uriFile ? uriFile : null,
						phoneNumber: data.phoneNumber,
						provinceId: selectedValue,
						address: data.address
					},
					(success, json) => {
						if (success && json.result) {
							setIsHaveChange(0);
							props.onClose();
							return alert("THÀNH CÔNG !");
						} else {
							return alert(json.error);
						}
					})
			})
	}

	const mockData = [
		{
			label: 'Nam',
			value: 'MALE'
		},
		{
			label: 'Nữ',
			value: 'FEMALE'
		},
	];

	const getBirthday = () => {
		var birthday = new Date();
		var value = date;
		birthday.setDate(parseInt(value.slice(8, 10)));
		birthday.setMonth(parseInt(value.slice(5, 7)) - 1);
		birthday.setFullYear(parseInt(value.slice(0, 4)));
		return birthday;
	}

	const [uriFile, setUriFile] = useState('');
	const getUri = (image, blob) => {
		return setUriFile(image)
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

	return (
		<View style={styles.container}>
			<StatusBar backgroundColor='#036ffc' barStyle="light-content" />
			<View style={styles.header}>
				<Text style={styles.text_header}>Tạo hồ sơ</Text>
			</View>
			<Animatable.View
				animation="fadeInUpBig"
				style={styles.footer}
			>
				<ScrollView>
					<Text style={styles.text_footer}>Ảnh đại diện</Text>
					<View>
						{/* <Avatar
							size="xlarge"
							rounded
							source={{
								uri: data.avatar ? data.avatar : 'https://img.favpng.com/21/13/5/user-profile-default-computer-icons-network-video-recorder-png-favpng-7dPZA8WRdY80Uw3bdMWkEN4fR.jpg',
							}}
							onPress={() => Alert.alert("Avatar")}
						/> */}
						<View style={styles.avatar}>
							<UploadImage url={data.avatar ? data.avatar : 'https://img.favpng.com/21/13/5/user-profile-default-computer-icons-network-video-recorder-png-favpng-7dPZA8WRdY80Uw3bdMWkEN4fR.jpg'} getUri={getUri} />
						</View>
					</View>

					<Text style={[styles.text_footer, {
						marginTop: 35
					}]}>Mối quan hệ</Text>
					<View style={styles.action}>
						<TextInput
							placeholder="Mối quan hệ"
							value={data.relationship}
							style={styles.textInput}
							autoCapitalize="none"
							onChangeText={(val) => setData({
								...data,
								relationship: val
							})}
						/>
					</View>

					<Text style={[styles.text_footer, {
						marginTop: 35
					}]}>Họ và tên đệm</Text>
					<View style={styles.action}>
						<TextInput
							placeholder="Họ và tên đệm"
							value={data.firstName}
							style={styles.textInput}
							autoCapitalize="none"
							onChangeText={(val) => setData({
								...data,
								firstName: val
							})}
						/>
					</View>

					<Text style={[styles.text_footer, {
						marginTop: 35
					}]}>Tên</Text>
					<View style={styles.action}>
						<TextInput
							placeholder="Tên"
							value={data.lastName}
							style={styles.textInput}
							autoCapitalize="none"
							onChangeText={(val) => setData({
								...data,
								lastName: val
							})}
						/>
					</View>

					<Text style={[styles.text_footer, {
						marginTop: 35
					}]}>Ngày sinh</Text>
					<View style={styles.action}>
						<DatePicker date={getBirthday()} handleChangeDate={handleChangeDate} />
					</View>

					<Text style={[styles.text_footer, {
						marginTop: 35
					}]}>Giới tính</Text>
					<View>
						<RadioForm
							style={{ width: 350 - 30 }}
							dataSource={mockData}
							itemShowKey="label"
							itemRealKey="value"
							circleSize={16}
							initial={data.gender ? data.gender : 'MALE'}
							formHorizontal={true}
							labelHorizontal={true}
							onPress={(item) => setData({
								...data,
								gender: item.value
							})}
						/>
					</View>

					<Text style={[styles.text_footer, {
						marginTop: 35
					}]}>Mã BHYT (nếu có)</Text>
					<View style={styles.action}>
						<TextInput
							placeholder="Mã BHYT (nếu có)"
							value={data.healthInsuranceCode}
							style={styles.textInput}
							autoCapitalize="none"
							onChangeText={(val) => setData({
								...data,
								healthInsuranceCode: val
							})}
						/>
					</View>

					<Text style={[styles.text_footer, {
						marginTop: 35
					}]}>Số điện thoại</Text>
					<View style={styles.action}>
						<TextInput
							placeholder="Số điện thoại"
							value={data.phoneNumber}
							style={styles.textInput}
							autoCapitalize="none"
							onChangeText={(val) => setData({
								...data,
								phoneNumber: val
							})}
						/>
					</View>

					<Text style={[styles.text_footer, {
						marginTop: 35
					}]}>Địa chỉ email</Text>
					<View style={styles.action}>
						<TextInput
							placeholder="Địa chỉ email"
							value={data.email}
							style={styles.textInput}
							autoCapitalize="none"
							onChangeText={(val) => setData({
								...data,
								email: val
							})}
						/>
					</View>

					<Text style={[styles.text_footer, {
						marginTop: 35
					}]}>Tỉnh/TP</Text>
					<View style={styles.action}>
						<Picker
							selectedValue={selectedValue}
							style={{ height: 50, width: 250 }}
							onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
						>
							{
								provinces.map((item, index) => {
									return <Picker.Item label={item.name} value={item.id} key={index} />
								})
							}
						</Picker>
					</View>

					<Text style={[styles.text_footer, {
						marginTop: 35
					}]}>Địa chỉ cụ thể</Text>
					<View style={styles.action}>
						<TextInput
							placeholder="Địa chỉ cụ thể"
							value={data.address}
							style={styles.textInput}
							autoCapitalize="none"
							onChangeText={(val) => setData({
								...data,
								address: val
							})}
						/>
					</View>

					<View style={styles.textPrivate}>
						<Text style={styles.color_textPrivate}>
							Trước khi thay đổi, bạn cần chú ý sự duy nhất về
						</Text>
						<Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>{" "}Số điện thọai</Text>
						<Text style={styles.color_textPrivate}>{" "}và</Text>
						<Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>{" "}Email đăng ký</Text>
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
							}]}>Lưu thay đổi</Text>
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

export default GuardianForm;

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
});