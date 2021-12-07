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

// var bookingTime = [];
// for (let x = 7; x < 21; x ++) {
// 	for(let y = 0; y < 2; y++) {
// 		if(y === 0) bookingTime.push(`${x}h00 - ${x}h30`);
// 		else bookingTime.push(`${x}h30 - ${x +1 }h00`);
// 	}
// }

const BookingForm = (props) => {

	const { patients, infoOfDoctor } = props;
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
						doctorId: infoOfDoctor.id,
						dayTime: dateTime.toString(),
						description: data.description,
						images: arrImage,
						customerIp: customerIp
					},
					(success, json) => {
						if (success && json.result) {
							console.log('Tahnfh cong roi nè')
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
							marginTop: 0,
							marginBottom: 5,
							textAlign: 'center',
					}]}>BS.{infoOfDoctor.name} _ MS:BS100{infoOfDoctor.id}</Text>
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
								uri: images.image_1 ? images.image_1.uri : 'https://marsurl.com/images/x0Rtl.jpg',
							}}
							onPress={() => { pickImageFromLibrary_1() }}
						/>	
						<Avatar
							size="xlarge"
							source={{
								uri: images.image_2 ? images.image_2.uri : 'https://marsurl.com/images/x0Rtl.jpg',
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
	},
	containerDateTime: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center',
		padding: 50,
	},
	pickedDateContainer: {
		padding: 20,
		backgroundColor: '#eee',
		borderRadius: 10,
	},
	pickedDate: {
		fontSize: 18,
		color: 'black',
	},
	btnContainer: {
		padding: 30,
	},
	// This only works on iOS
	datePicker: {
		width: 320,
		height: 260,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'flex-start',
	},
});