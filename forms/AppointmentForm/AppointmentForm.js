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

var doctors = [];
APIService.getProvinces((success, json) => {
	if (success && json.result) {
		json.result.map(item => {
			return provinces.push(item.name)
		})
	}
});

const doctorList = [
	{
		"id": 1,
		"avatar": "https://scr.vn/wp-content/uploads/2020/08/H%C3%ACnh-g%C3%A1i-%C4%91%E1%BA%B9p-t%C3%B3c-d%C3%A0i-ng%E1%BA%A7u.jpg",
		"name":"Phạm Văn Tâm",
		"specialist":"Hộ sinh",
		"phone":"0257296632",
		"year_exp":"5 năm kinh nghiệm",
		"workplace":"Bệnh viện đa khoa tỉnh Phú Yên",
	},
	{
		"id": 2,
		"avatar": "https://scontent.fdad3-3.fna.fbcdn.net/v/t1.6435-1/p200x200/131681340_1481021602288952_4789182916497722736_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=7206a8&_nc_ohc=g2HQF7aitUkAX8zWNDg&_nc_ht=scontent.fdad3-3.fna&oh=3a805ed14aec1de39bc0282d9d666040&oe=6169179B",
		"name":"Trương Ngọc Sơn",
		"specialist":"Đỡ đẻ",
		"phone":"0257296632",
		"year_exp":"5 năm kinh nghiệm",
		"workplace":"Bệnh viện đa khoa tỉnh Bình Định",
	},
	{
		"id": 3,
		"avatar": "https://scontent.fdad3-1.fna.fbcdn.net/v/t1.6435-9/83145022_2582872185325534_3147554001050927104_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=zrwXYEUztVQAX_H8sKo&_nc_ht=scontent.fdad3-1.fna&oh=b937a0c46bf99e866922c5cea196b624&oe=61691DA8",
		"name":"Nguyễn Thị Nhật Trang",
		"specialist":"Bắt trẻ",
		"phone":"0257296632",
		"year_exp":"5 năm kinh nghiệm",
		"workplace":"Bệnh viện đa khoa tỉnh Gia Lai",
	},
	{
		"id": 4,
		"avatar": "https://scontent.fdad3-1.fna.fbcdn.net/v/t1.6435-9/124669208_2809353256006939_673331700560413121_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=MB2HXftCRdEAX8bRdKK&_nc_ht=scontent.fdad3-1.fna&oh=decb596ec9faa7353ceedc16dcd1ed78&oe=616716F2",
		"name":"Hồ Thủy Tiên",
		"specialist":"Bồng trẻ",
		"phone":"0257296632",
		"year_exp":"5 năm kinh nghiệm",
		"workplace":"Bệnh viện đa khoa tỉnh Kon Tum",
	},
	{
		"id": 5,
		"avatar": "https://scontent.fdad3-2.fna.fbcdn.net/v/t1.6435-9/201103803_1438456426488093_549275820607158497_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=nIyhnoZks2IAX_uWrmW&_nc_ht=scontent.fdad3-2.fna&oh=b300a45d6b0cf7b3f792753705a9cdb0&oe=616A3139",
		"name":"Đào Dương Long",
		"specialist":"Bê trẻ",
		"phone":"0257296632",
		"year_exp":"5 năm kinh nghiệm",
		"workplace":"Bệnh viện đa khoa tỉnh Lâm Đồng",
	},
	{
		"id": 6,
		"avatar": "https://scontent.fdad3-2.fna.fbcdn.net/v/t1.6435-9/131909241_1812545618901498_5480970132946194661_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=174925&_nc_ohc=tlPkNxi4YAgAX-TctWx&_nc_ht=scontent.fdad3-2.fna&oh=68fed41cbe62466e84aff03c9685d9c8&oe=61676948",
		"name":"Đào Thị Việt Hà",
		"specialist":"Rinh trẻ",
		"phone":"0257296632",
		"year_exp":"5 năm kinh nghiệm",
		"workplace":"Bệnh viện đa khoa tỉnh Cà Mau",
	},
];

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

const patientList = [
    { name: 'Trương Ngọc Sơn', id: 1 },
	{ name: 'Nguyễn Thị Nhật Trang', id: 2 },
	{ name: 'Phạm Văn Tâm', id: 3 },
	{ name: 'Lê Văn Hân', id: 4 },
	{ name: 'Hoàng Văn Dũng', id: 5 },
];

const AppointmentForm = (props) => {
	
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

	const [date, setDate] = useState('1999-08-18');
	const [selectedGuardian, setSelectedGuardian] = useState('');
	const [selectedHour, setSelectedHour] = useState('');
	const [selectedDoctor, setSelectedDoctor] = useState('');
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
				const arrImage = [images.image_1 ? images.image_1 : null, images.image_2 ? images.image_2 : null]
				APIService.postAppointment(
					token,
					{
						guardianId: data.guardianId,
						doctorId: data.doctorId,
						dayTime: data.dayTime,
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

	return (
		<View style={styles.container}>
			<StatusBar backgroundColor='#036ffc' barStyle="light-content" />
			<View style={styles.header}>
				<Text style={styles.text_header}>Đăng ký khám</Text>
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
								patientList.map((item, index) => {
									return <Picker.Item label={item.name} value={item.id} key={index} />
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
							selectedValue={selectedHour}
							style={{ height: 50, width: 300 }}
							onValueChange={(itemValue, itemIndex) => setSelectedHour(itemValue)}
						>
							{
								bookingTime.map((item, index) => {
									return <Picker.Item label={item} value={index + 1} key={index} />
								})
							}
						</Picker>
					</View>

					<Text style={[styles.text_footer, {
						marginTop: 35
					}]}>Bác sĩ</Text>
					<View style={styles.action}>
						<Picker
							selectedValue={selectedDoctor}
							style={{ height: 50, width: 300 }}
							onValueChange={(itemValue, itemIndex) => setSelectedDoctor(itemValue)}
						>
							{
								doctorList.map((item, index) => {
									return <Picker.Item label={item.name+' _MS:BS00'+item.id} value={item.id} key={index} />
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
								uri: images.image_1 ? images.image_1.uri : 'https://lh3.googleusercontent.com/QIYAVw5x9e7lADnIim0yHKNQu9lHHGVa-XT2EFX_xxbAK0yLVZXB_3ycPGy9nrrIskV5Q30HA7CvOVZcmK17NdQ13rhVpUV9yiQYKcxLb2_PhphzH21zlvyLeWPa86sGdaXr_FK-jotVXZRWmgD1EDQWBwi6lo2mhrM19oDKsTJZUhvG49t4B6nQ661uapkmUjha0FMRQxomkHdAfYSOYtZ2VlsMnBcrhJrWLywuv82-J5i_7av7OU7BYhZitY67zbWBRjU5qX03Awgk8_P3kgYowY0ccVBXGsex4fi0JIK03wprEEgVerQFWasop13RHjz47YYLcN4QY9ATYfQz4I2-aPEPvphaiAKGDGQfMPqXbdUZkkjiKd5Su3768S0M_Abk5MAm_EgRPUh7i1ifKWGOJWnm08ogUxi7ET8DVpRkEl_nzUkBOXGC_-Y8kBt_S1HvVM5E1TePsuRLinak56WF0pSHJq9vjfasi5wcyu2quFx4drtZfXCrnrFM_1DAbRZNWGznzouYqoeV80GHox8GgE1Wt9M3pJ9lc5NcPu48Bamzk96IEUfNCIaIEs3uI3FUKwlgkIlj7WIuOWpP779RIuzL7cuYvOK59iJa1KXAsUVHMe5uSA7byiUqM0AxwXDBuAjL07LBbkUOsfVgUoqvm6khxPoe4OiyhmVgf2xyE9YwYy_LaUI4chxSViz5fAj2FyoNoAuNMF2dLYWAsbzywg=w274-h312-no?authuser=0',
							}}
							onPress={() => { pickImageFromLibrary_1() }}
						/>	
						<Avatar
							size="xlarge"
							source={{
								uri: images.image_2 ? images.image_2.uri : 'https://lh3.googleusercontent.com/QIYAVw5x9e7lADnIim0yHKNQu9lHHGVa-XT2EFX_xxbAK0yLVZXB_3ycPGy9nrrIskV5Q30HA7CvOVZcmK17NdQ13rhVpUV9yiQYKcxLb2_PhphzH21zlvyLeWPa86sGdaXr_FK-jotVXZRWmgD1EDQWBwi6lo2mhrM19oDKsTJZUhvG49t4B6nQ661uapkmUjha0FMRQxomkHdAfYSOYtZ2VlsMnBcrhJrWLywuv82-J5i_7av7OU7BYhZitY67zbWBRjU5qX03Awgk8_P3kgYowY0ccVBXGsex4fi0JIK03wprEEgVerQFWasop13RHjz47YYLcN4QY9ATYfQz4I2-aPEPvphaiAKGDGQfMPqXbdUZkkjiKd5Su3768S0M_Abk5MAm_EgRPUh7i1ifKWGOJWnm08ogUxi7ET8DVpRkEl_nzUkBOXGC_-Y8kBt_S1HvVM5E1TePsuRLinak56WF0pSHJq9vjfasi5wcyu2quFx4drtZfXCrnrFM_1DAbRZNWGznzouYqoeV80GHox8GgE1Wt9M3pJ9lc5NcPu48Bamzk96IEUfNCIaIEs3uI3FUKwlgkIlj7WIuOWpP779RIuzL7cuYvOK59iJa1KXAsUVHMe5uSA7byiUqM0AxwXDBuAjL07LBbkUOsfVgUoqvm6khxPoe4OiyhmVgf2xyE9YwYy_LaUI4chxSViz5fAj2FyoNoAuNMF2dLYWAsbzywg=w274-h312-no?authuser=0',
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
							}]}>Hủy bỏ</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</Animatable.View>
		</View>
	);
};

export default AppointmentForm;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#2196f3'
	},
	header: {
		flex: 0.6,
		justifyContent: 'flex-end',
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