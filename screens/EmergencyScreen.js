import React, { useState, useEffect} from 'react';
import {View,
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
	Linking } from 'react-native';
import RadioForm from 'react-native-radio-form';
import APIService from '../utils/APIService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EmergencyScreen = ({ navigation }) => {

	const [call, setCall] = useState('call_sms');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [sms, setContent] = useState('');
	const [isHaveChange, setIsHaveChange] = useState(true);
	const [open, setOpen] = useState(true);

	const callEmergency = (phoneNumber) => {
        return Linking.openURL(`tel:${phoneNumber}`)
    }

	const mockData = [
		{
			label: 'Gọi khẩn cấp và thông báo cho người thân',
			value: 'call_sms'
		},
		{
			label: 'Chỉ thông báo cho người thân',
			value: 'sms'
		},
		{
			label: 'Chỉ gọi khẩn cấp',
			value: 'call'
		}
	];

	useEffect(() => {
		AsyncStorage.getItem('token')
            .then((token) => {
			if(token && isHaveChange) {
				APIService.getEmergencySms(
					token,
					(success, json) => {
						if (success && json.result) {
							setPhoneNumber(json.result.emergencyPhoneNumber)
							setContent(json.result.emergencyContent)
							setIsHaveChange(false)
							return console.log("Lấy số điện thoại và nội dung thông điệp khẩn cấp thành công!")
						} else {
							return console.log(json.error)
						}
					}
				)
			}
		})
	},[isHaveChange])

	const handleAddRelativePhoneNumberAndSms = () => {
        AsyncStorage.getItem('token')
            .then((token) => {
			if(phoneNumber) {
				APIService.setEmergencySms(
					token,
					phoneNumber,
					sms ? sms : 'Tôi đang gặp nạn!',
					(success, json) => {
						if (success && json.result) {
							setIsHaveChange(true)
							return setOpenAddPhone(false)
						} else {
							return console.log(json.error)
						}
					}
				)
			}
			else {
				alert('Vui lòng nhập số điện thoại khẩn cấp!')
			} 
		})
    }

	const handleSendEmergencySms = () => {
        AsyncStorage.getItem('token')
            .then((token) => {
			APIService.sendEmergencySms(
				token,
				(success, json) => {
					if (success && json.result) {
						// handleClose()
						return alert("Đã phát đi thông điệp khẩn cấp!")
					} else {
						return console.log(json.error)
					}
				}
			)
		})
    }

	const handleSendAndCall = () => {
        AsyncStorage.getItem('token')
            .then((token) => {
			APIService.sendEmergencySms(
				token,
				(success, json) => {
					if (success && json.result) {
						// handleClose()
						callEmergency(115)
						return alert("Đã phát đi thông điệp khẩn cấp!")
					} else {
						return console.log(json.error)
					}
				}
			)
		})
    }

	return (
		<ScrollView>
			<View style={{alignItems: 'center', marginTop: 10}}>
				<Text style={{fontSize: 25, fontWeight: 'bold'}}>Trường hợp khẩn cấp</Text>
			</View>
			{
				open ? <View style={styles.container}>
							<Text style={{padding: 20, fontSize: 18, textAlign: 'center'}}>Đây là tính năng vừa cho phép bạn gọi cấp cứu trong trường hợp khẩn cấp 
								và gửi tin nhắn thông báo về cho người thân của bạn trong trường hợp khẩn cấp! {'\n'}
								|| SOS || {'\n'}
								(Tối đa 2 tin nhắn / 1 ngày)
							</Text>
							<Text style={[styles.text_footer, {
									marginTop: 5
								}]}>Số liên lạc khẩn cấp</Text>
								<View style={styles.action}>
									<TextInput
										placeholder="Số điện thoại người thân"
										value={phoneNumber}
										style={styles.textInput}
										autoCapitalize="none"
										onChangeText={(val) => setPhoneNumber(val)}
									/>
								</View>

							<Text style={[styles.text_footer, {
									marginTop: 5
								}]}>Thông điệp khẩn cấp</Text>
								<View style={styles.action}>
									<TextInput
										placeholder="Nội dung thông điệp khẩn cấp"
										value={sms}
										style={styles.textInput}
										autoCapitalize="none"
										onChangeText={(val) => setContent(val)}
									/>
								</View>
								<Button
									title="Đổi thông tin"
									onPress={() => handleAddRelativePhoneNumberAndSms()}
								/>
						</View> : null
			}
			<View style={{marginTop: 10, paddingHorizontal: 20, paddingVertical: 5}}>
				<Button
					title={open ? 'Đóng lại' : 'Mở mẫu thông tin'}
					onPress={() => setOpen(!open)}
				/>
			</View>
			<View style={styles.container}>
				<Text style={[styles.text_footer, {
					marginTop: 50,
					color: '#8511ba',
					fontWeight: 'bold'
				}]}>Lựa chọn khẩn cấp</Text>
				<View>
					<View style={{marginTop: 5, backgroundColor: 'red'}}>
						{
							call === 'sms' ? 
								<Button color='#d65aa0' title="Gửi thông báo" onPress={() => handleSendEmergencySms()}/>
								: call === 'call_sms' ?
									<Button color='red' title="Gọi và gửi" onPress={() => handleSendAndCall()}/>
									:
									<Button color='#e8178e' title="Gọi ngay" onPress={() => callEmergency(115)}/>
						}
					</View>
					<RadioForm
						style={{ width: 350 - 30 }}
						dataSource={mockData}
						itemShowKey="label"
						itemRealKey="value"
						circleSize={16}
						initial={call}
						formHorizontal={false}
						labelHorizontal={true}
						onPress={(item) => setCall(item.value)}
					/>
				</View>
				
			</View>
		</ScrollView>
	);
};

export default EmergencyScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		textAlign: 'center'
	},
	footer: {
		flex: Platform.OS === 'ios' ? 3 : 5,
		backgroundColor: '#fff',
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		paddingHorizontal: 20,
		paddingVertical: 30
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
		paddingLeft: 50,
		paddingRight: 50,
		color: '#05375a',
		width: 20,
		height: 50,
		fontSize: 18,
		color: '#ed2143'
	},
	text_footer: {
		color: '#05375a',
		fontSize: 18
	},
});