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
	Picker,
	Linking
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
import getTimeFromOperationOfDoctor from  '../../helpers/getTimeFromOperationOfDoctor';
import sortBookingTime from '../../helpers/sortBookingTime';
import DateTimePicker from '@react-native-community/datetimepicker';

// const doctorList = [
// 	{
// 		"id": 1,
// 		"avatar": "https://scr.vn/wp-content/uploads/2020/08/H%C3%ACnh-g%C3%A1i-%C4%91%E1%BA%B9p-t%C3%B3c-d%C3%A0i-ng%E1%BA%A7u.jpg",
// 		"name":"Phạm Văn Tâm",
// 		"specialist":"Hộ sinh",
// 		"phone":"0257296632",
// 		"year_exp":"5 năm kinh nghiệm",
// 		"workplace":"Bệnh viện đa khoa tỉnh Phú Yên",
// 	},
// 	{
// 		"id": 2,
// 		"avatar": "https://scontent.fdad3-3.fna.fbcdn.net/v/t1.6435-1/p200x200/131681340_1481021602288952_4789182916497722736_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=7206a8&_nc_ohc=g2HQF7aitUkAX8zWNDg&_nc_ht=scontent.fdad3-3.fna&oh=3a805ed14aec1de39bc0282d9d666040&oe=6169179B",
// 		"name":"Trương Ngọc Sơn",
// 		"specialist":"Đỡ đẻ",
// 		"phone":"0257296632",
// 		"year_exp":"5 năm kinh nghiệm",
// 		"workplace":"Bệnh viện đa khoa tỉnh Bình Định",
// 	},
// 	{
// 		"id": 3,
// 		"avatar": "https://scontent.fdad3-1.fna.fbcdn.net/v/t1.6435-9/83145022_2582872185325534_3147554001050927104_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=zrwXYEUztVQAX_H8sKo&_nc_ht=scontent.fdad3-1.fna&oh=b937a0c46bf99e866922c5cea196b624&oe=61691DA8",
// 		"name":"Nguyễn Thị Nhật Trang",
// 		"specialist":"Bắt trẻ",
// 		"phone":"0257296632",
// 		"year_exp":"5 năm kinh nghiệm",
// 		"workplace":"Bệnh viện đa khoa tỉnh Gia Lai",
// 	},
// 	{
// 		"id": 4,
// 		"avatar": "https://scontent.fdad3-1.fna.fbcdn.net/v/t1.6435-9/124669208_2809353256006939_673331700560413121_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=MB2HXftCRdEAX8bRdKK&_nc_ht=scontent.fdad3-1.fna&oh=decb596ec9faa7353ceedc16dcd1ed78&oe=616716F2",
// 		"name":"Hồ Thủy Tiên",
// 		"specialist":"Bồng trẻ",
// 		"phone":"0257296632",
// 		"year_exp":"5 năm kinh nghiệm",
// 		"workplace":"Bệnh viện đa khoa tỉnh Kon Tum",
// 	},
// 	{
// 		"id": 5,
// 		"avatar": "https://scontent.fdad3-2.fna.fbcdn.net/v/t1.6435-9/201103803_1438456426488093_549275820607158497_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=nIyhnoZks2IAX_uWrmW&_nc_ht=scontent.fdad3-2.fna&oh=b300a45d6b0cf7b3f792753705a9cdb0&oe=616A3139",
// 		"name":"Đào Dương Long",
// 		"specialist":"Bê trẻ",
// 		"phone":"0257296632",
// 		"year_exp":"5 năm kinh nghiệm",
// 		"workplace":"Bệnh viện đa khoa tỉnh Lâm Đồng",
// 	},
// 	{
// 		"id": 6,
// 		"avatar": "https://scontent.fdad3-2.fna.fbcdn.net/v/t1.6435-9/131909241_1812545618901498_5480970132946194661_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=174925&_nc_ohc=tlPkNxi4YAgAX-TctWx&_nc_ht=scontent.fdad3-2.fna&oh=68fed41cbe62466e84aff03c9685d9c8&oe=61676948",
// 		"name":"Đào Thị Việt Hà",
// 		"specialist":"Rinh trẻ",
// 		"phone":"0257296632",
// 		"year_exp":"5 năm kinh nghiệm",
// 		"workplace":"Bệnh viện đa khoa tỉnh Cà Mau",
// 	},
// ];

// var bookingTime = [];
// for (let x = 7; x < 21; x ++) {
// 	for(let y = 0; y < 2; y++) {
// 		if(y === 0) bookingTime.push(`${x}h00 - ${x}h30`);
// 		else bookingTime.push(`${x}h30 - ${x +1 }h00`);
// 	}
// }

// const patientList = [
//     { name: 'Trương Ngọc Sơn', id: 1 },
// 	{ name: 'Nguyễn Thị Nhật Trang', id: 2 },
// 	{ name: 'Phạm Văn Tâm', id: 3 },
// 	{ name: 'Lê Văn Hân', id: 4 },
// 	{ name: 'Hoàng Văn Dũng', id: 5 },
// ];

const AppointmentForm = (props) => {
	
	const { patients, doctorcards } = props;
	const [infoOfDoctor, setInfoOfDoctor] = useState('');
	const [bookingTime, setBookingTime] = useState([]);
	const [bookedTime, setBookedTime] = useState([]);
	const [isChecked, setIsChecked] = useState(true);

	// get current time
	const getCurrentDate = () => {
		var dateObj = new Date();
		var month = dateObj.getMonth() + 1; //months from 1-12
		var day = dateObj.getDate();
		var year = dateObj.getFullYear();
		return (year + "-" + (month < 10 ? '0' + month : month) + "-" + day);
	}

	const [data, setData] = useState({
		id: '',
		name: '',
		date: getCurrentDate(),
		hour: '',
		workplace: '',
		doctor: '',
		description: '',
		imagesView: [],
		guardianId: '',
		doctorId: '',
		dayTime: '',
		imagesSend: [],
	});
	
	const [hour, setHour] = useState('');
	const [dateTime, setDateTime] = useState(new Date())
	const [selectedGuardian, setSelectedGuardian] = useState(patients[0].userTwoId ? patients[0].userTwoId : '' );
	const [selectedDoctor, setSelectedDoctor] = useState(doctorcards[0].id ? doctorcards[0].id : '');
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

	/////////////////////////

	const getBookedAppointmentToDoctor = () => {
		const doctorId = infoOfDoctor.id;
		AsyncStorage.getItem('token')
			.then((token) => {
				APIService.getDoctorOperation(
					token,
					doctorId,
					dateTime,
					(success, json) => {
						if (success && json.result) {
							// console.log(json.result)
							setBookedTime(json.result?.map(item => {
								const dateTemp = new Date(item);
								const hour = dateTemp.getHours();
								const minute = dateTemp.getMinutes();
								const result = `${hour}h${minute}`;
								return {
									hour,
									minute,
									result
								};
							}));
		
							return console.log("Lấy lịch thành công");
						} else {
							return console.log("Không lấy được lịch");
						}
					}
				)
			})
    }

	const getBookingTimeForPatient = () => {
		const dayOfWeek = dateTime.getDay();
		bookingTime.length = 0;
		setData({ ...data, hour:'', workplace:'' });
		let ami = [];
		infoOfDoctor.operations?.map(operation => {
			// console.log('Operationnnnnnnnnnnnnnnn')
			const workplace = operation.workplace;
			const patientPerHalfHour = operation.patientPerHalfHour;
			operation?.operationHours.map(operationHour => {
				// console.log('OperationHourrrrrrrrrr')
				if(dayOfWeek === operationHour.dayOfWeek) {
					// console.log('dayOfWeekkkkkkkkkkk')
					let temp = [];
					temp = getTimeFromOperationOfDoctor(operationHour.startHour, operationHour.endHour, workplace, patientPerHalfHour);
					ami = ami.concat(temp);
				}
				return 0;
			})
			setIsChecked(true);
			return setBookingTime(ami);
		})
	}

	useEffect(() => {
		getBookedAppointmentToDoctor();
		getBookingTimeForPatient();
	}, [dateTime]);

	const registerHandle = () => {
		dateTime.setHours(parseInt(hour.slice(0,2)));
		dateTime.setMinutes(parseInt(hour.slice(3,5)));
		AsyncStorage.getItem('token')
			.then((token) => {
				const arrImage = [];
				const customerIp = '192.168.1.7';
				if(images.image_1) arrImage.push(images.image_1);
				if(images.image_2) arrImage.push(images.image_2);
				APIService.postAppointment(
					token,
					{
						guardianId: selectedGuardian,
						doctorId: selectedDoctor,
						dayTime: dateTime.toString(),
						description: data.description,
						images: arrImage,
						customerIp: customerIp
					},
					(success, json) => {
						if (success && json.result) {
							setIsHaveChange(0);
							props.onClose();
							Linking.openURL(json.result);
							return alert("Đặt lịch THÀNH CÔNG!");
						} else {
							return alert("THẤT BẠI");
						}
					}
				)
			})
	}

	useEffect(() => {
		if(bookingTime.length && isChecked) {
			// let temp = bookingTime;
			bookedTime?.map(booked => {
				const result = booked.result;
				bookingTime?.map((boooking, index) => {
					const booktime = boooking.time.slice(0, 5);
					const mark = booktime.includes(result);
					if(mark) {
						bookingTime[index] = {
							time: bookingTime[index].time,
							workplace: bookingTime[index].workplace,
							patientPerHalfHour: bookingTime[index].patientPerHalfHour - 1
						}
					}
					return 0;
				})
				return 0;
			})
			setIsChecked(false);
			const temp = bookingTime.filter(function(element){
				return element.patientPerHalfHour > 0;
			})
			setBookingTime(sortBookingTime(temp, dateTime));
			// console.log('Đã sorted')
		}
	}, [bookingTime, isChecked, dateTime])

	//Ngày khám
	const [isPickerShow, setIsPickerShow] = useState(false);
	const [openHour, setOpenHour] = useState(false);

	const showPicker = () => {
		setIsPickerShow(true);
		setOpenHour(true);
	};

	const changeSelectedDate = (event, value) => {
		if(value) {
			setDateTime(value);
			if (Platform.OS === 'android') {
				setIsPickerShow(false);
			}
		}
		else setIsPickerShow(false);
	};

	const getSelectedDate = () => {
		var month = dateTime.getMonth() + 1; //months from 1-12
		var day = dateTime.getDate();
		var year = dateTime.getFullYear();
		return (year + "-" + (month < 10 ? '0' + month : month) + "-" + day);
	}

	//////////////////////////
	// get info of doctor
	const getDayOfWeek = (day) => {
        let dayOfWeek;
        // eslint-disable-next-line default-case
        switch (day) {
            case 'SUNDAY':
                dayOfWeek = 0;
                break;
            case 'MONDAY':
                dayOfWeek = 1;
                break;
            case 'TUESDAY':
                dayOfWeek = 2;
                break;
            case 'WEDNESDAY':
                dayOfWeek = 3;
                break;
            case 'THURSDAY':
                dayOfWeek = 4;
                break;
            case 'FRIDAY':
                dayOfWeek = 5;
                break;
            case 'SATURDAY':
                dayOfWeek = 6;
                break;
            default: 
                dayOfWeek = -1;
          }
        return dayOfWeek;
    }

	useEffect(() => {
		setOpenHour(false);
		setDateTime(new Date())
        const id = selectedDoctor;
        AsyncStorage.getItem('token')
            .then((token) => {
                APIService.getDoctorById(
                    token,
                    id,
                    (success, json) => {
                        if (success && json.result) {
                            const item = json.result;
                            setInfoOfDoctor({
                                id: item.doctor.id,
                                avatar: item.doctor.avatarURL,
                                name: item.doctor.firstName +' '+ item.doctor.lastName,
                                specialist: item.doctor.specialized.name,
                                phone:"0257296632",
                                year_exp:"5 năm kinh nghiệm",
                                workplace: item.doctor.operation.map(x => {return x.workplace.name}),
                                operations: item.doctor.operation.map(x => {return {
                                    workplace: x.workplace.name + ', ' + x.workplace.address,
                                    patientPerHalfHour: x.patientPerHalfHour === null ? 0 : x.patientPerHalfHour,
                                    operationHours: x.operationHour.map(y => {return {
                                        day: y.day,
                                        dayOfWeek: getDayOfWeek(y.day),
                                        startTime: y.startTime,
                                        endTime: y.endTime,
                                        startTimeVN: new Date(y.startTime),
                                        endTimeVN: new Date(y.endTime),
                                        startHour: new Date(y.startTime).getHours() +'h'+ new Date(y.startTime).getMinutes(),
                                        endHour: new Date(y.endTime).getHours() +'h'+ new Date(y.endTime).getMinutes(),
                                    }})
                                }}),
                            })
                            return console.log("thành công");
                        } else {
                            return console.log("lỗi server");
                        }
                    }
                )
        })	
	},[selectedDoctor])

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
								patients.map((item, index) => {
									return <Picker.Item label={item.name} value={item.userTwoId} key={index} />
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
								doctorcards.map((item, index) => {
									return <Picker.Item label={item.name+' _MS:BS00'+item.id} value={item.id} key={index} />
								})
							}
						</Picker>
					</View>

					<Text style={[styles.text_footer, {
						marginTop: 35
					}]}>Ngày khám</Text>
					<View style={styles.action}>
						{/* Display the selected date */}
						<View  style={{width: 300}}>
							{/* The button that used to trigger the date picker */}
							{!isPickerShow && (
								<View style={styles.btnContainer}>
									<Button title={dateTime ? getSelectedDate() : "Chọn ngày"} color="purple" onPress={showPicker} />
								</View>
							)}
						</View>
						{/* The date picker */}
						{isPickerShow && (
							<DateTimePicker
								minimumDate={new Date()}
								value={dateTime}
								mode={'date'}
								display={Platform.OS === 'ios' ? 'spinner' : 'default'}
								is24Hour={true}
								onChange={changeSelectedDate}
								style={styles.datePicker}
							/>
						)}
					</View>

					<Text style={[styles.text_footer, {
						marginTop: 35
					}]}>Giờ khám</Text>
					{
						openHour ? <>
										<View style={styles.action}>
											<Picker
												selectedValue={hour}
												style={{ height: 50, width: 300 }}
												onValueChange={(itemValue, itemIndex) => setHour(itemValue)}
												enabled={bookingTime.length ? true : false}
											>
												{
													bookingTime.length ? bookingTime.map((item, index) => {
														return <Picker.Item label={item.time} value={item.time} key={index} />
													}) : <Picker.Item label={'Hết lịch'} value={''} key={''} />
												} 
											</Picker>
										</View> 
										<View style={{marginTop: 10}}>
											{
												hour ? bookingTime.map((item, index) => {
													if(item.time === hour) return <Text key={index}>Tại {item.workplace}</Text>
												}) : <Text>Chưa có nơi khám</Text>
											}
										</View>	
									</>
									: 
									<Text>Vui lòng chọn ngày trước</Text>
					}

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
								uri: images.image_1 ? images.image_1.uri : 'https://lh3.googleusercontent.com/js_muW7dgbU1UwFXFswhBPMT4Fe-s5kZb0H_Q2Ea88-AGtALGLaHbn4etsy_nsz9NFr7N6ZZaV6wcdkhDHLhmKyzAas0QIx_gjsDZRKRp6R5nezzlH72y9zM3lLySWM5Ia7McQOy3h06yF2eVB11BJsiAnCRS93GcEw5JpN-qydd62DlihWNssMM8YiyMVfrl_wuQlcImc458s_J8eV7mkvv39oeDAU4DHRsUpo-T-MWHu7FfroXeXA6dO270Lh9GrGnT446x3gCXgH8lRKkp8ecCE68BCrzIy77IUt5AR4XWge_xMkpL21fVmxB9rZXQ4Enp4XqcL6WByZH2OzS6zniqymvwOQXDseoIk8MvyJxmnH0a1g4ogajgl4p57krwp247LxMwlIIO4h_XM54gRPK3lq3A8Iw-2h7NaM0AmbjFCqjOrtjmjpZl72RU-4Ai6fZJpX-lulHOdTae43IvojvwfJXGrJNrNeb-pveU8GNGnADug1fGXpWmS3Pz-dhyBL3bccYtbtaHinnXjZ-LLppVsr1vsHSvXbryQ6xGj36OWcAVoDXKqtiPOqP7lr_gBV1NgXqnW37ZMM-1Lps1bkg-Ye2oKeLEE3Xe-h722DKOH0XiaM8i-QK3dqp1ZB33FSU_t_lUypS7fPPvfypjippGljbKNCeMEvo-yRtmKkKTVyOu_SOev2uBKzT-NnKXzt2BjPrY8yHLGuX92a_CqwvZg=w584-h664-no?authuser=0',
							}}
							onPress={() => { pickImageFromLibrary_1() }}
						/>	
						<Avatar
							size="xlarge"
							source={{
								uri: images.image_2 ? images.image_2.uri : 'https://lh3.googleusercontent.com/js_muW7dgbU1UwFXFswhBPMT4Fe-s5kZb0H_Q2Ea88-AGtALGLaHbn4etsy_nsz9NFr7N6ZZaV6wcdkhDHLhmKyzAas0QIx_gjsDZRKRp6R5nezzlH72y9zM3lLySWM5Ia7McQOy3h06yF2eVB11BJsiAnCRS93GcEw5JpN-qydd62DlihWNssMM8YiyMVfrl_wuQlcImc458s_J8eV7mkvv39oeDAU4DHRsUpo-T-MWHu7FfroXeXA6dO270Lh9GrGnT446x3gCXgH8lRKkp8ecCE68BCrzIy77IUt5AR4XWge_xMkpL21fVmxB9rZXQ4Enp4XqcL6WByZH2OzS6zniqymvwOQXDseoIk8MvyJxmnH0a1g4ogajgl4p57krwp247LxMwlIIO4h_XM54gRPK3lq3A8Iw-2h7NaM0AmbjFCqjOrtjmjpZl72RU-4Ai6fZJpX-lulHOdTae43IvojvwfJXGrJNrNeb-pveU8GNGnADug1fGXpWmS3Pz-dhyBL3bccYtbtaHinnXjZ-LLppVsr1vsHSvXbryQ6xGj36OWcAVoDXKqtiPOqP7lr_gBV1NgXqnW37ZMM-1Lps1bkg-Ye2oKeLEE3Xe-h722DKOH0XiaM8i-QK3dqp1ZB33FSU_t_lUypS7fPPvfypjippGljbKNCeMEvo-yRtmKkKTVyOu_SOev2uBKzT-NnKXzt2BjPrY8yHLGuX92a_CqwvZg=w584-h664-no?authuser=0',
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

export default AppointmentForm;

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