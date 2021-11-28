import React from 'react';
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
	Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
// import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import RadioForm from 'react-native-simple-radio-button';
import APIService from '../utils/APIService';

const ForgotPassScreen = ({ navigation }) => {

	const [data, setData] = React.useState({
		type: '',
		email: '',
		phoneNumber: '',
		password: '',
		confirm_password: '',
		code: '',
		check_textInputChange: false,
		secureTextEntry: true,
		confirm_secureTextEntry: true,
	});

	const textInputChange = (val) => {
		if(data.type === 'EMAIL') {
			if (val.length !== 0) {
				setData({
					...data,
					email: val,
					check_textInputChange: true
				});
			} else {
				setData({
					...data,
					email: val,
					check_textInputChange: false
				});
			}
		} else {
			if (val.length !== 0) {
				setData({
					...data,
					phoneNumber: val,
					check_textInputChange: true
				});
			} else {
				setData({
					...data,
					phoneNumber: val,
					check_textInputChange: false
				});
			}
		}
		
	}

	const handlePasswordChange = (val) => {
		setData({
			...data,
			password: val
		});
	}

	const handleConfirmPasswordChange = (val) => {
		setData({
			...data,
			confirm_password: val
		});
	}

	const updateSecureTextEntry = () => {
		setData({
			...data,
			secureTextEntry: !data.secureTextEntry
		});
	}

	const updateConfirmSecureTextEntry = () => {
		setData({
			...data,
			confirm_secureTextEntry: !data.confirm_secureTextEntry
		});
	}

	const getCode = () => {
		if(data.type === 'EMAIL') {
			if(data.email === '') {
				alert("Bạn chưa nhập email!")
			}
			else {
				APIService.forgotPasswordMail(data.email, (success, json) => {
					if (success && json.result) {
						return alert("Vui lòng kiểm tra mail!")
					} else {
						return alert("Không gửi được!")
					}
				})
			}
		} 
		else if (data.type === 'PHONE') {
			if(data.phoneNumber === '') {
				alert("Bạn chưa nhập số điện thoại!")
			}
			else {
				APIService.forgotPasswordSms(data.phoneNumber, (success, json) => {
					if (success && json.result) {
						return alert("Vui lòng kiểm tra tin nhắn!")
					} else {
						return alert("Không gửi được!")
					}
				})
			}
		} 
		else {
			return alert('Bạn chưa chọn loại xác thực mail hay sms')
		}
	}

	const onChangePass = () => {
		if(data.password != data.confirm_password) {
			Alert.alert('Mật khẩu không khớp!', 'Vui lòng nhập lại mật khẩu và xác nhận mật khẩu.', [
				{ text: 'Okay' }
			]);
		}
        else {
			APIService.forgotPassword(
				newPassword = data.password, 
				code = data.code, 
				type = data.type, 
				email = data.email, 
				phoneNumber = data.phoneNumber, 
				(success, json) => {
				if (success && json.result) {
					Alert.alert('Tạo mật khẩu mới THÀNH CÔNG!', 'Quay về đăng nhập tài khoản', [
						{text: 'Okey'}
					])
					return navigation.navigate('SignInScreen')
				} else {
					return Alert.alert('Thất bại', 'Vui lòng thao tác lại', [
						{text: 'Okey'}
					])
				}
			})
		}
	}

	var radio_props = [
		{label: 'Email     ', value: 0 },
		{label: 'Số điện thoại', value: 1 }
	];

	return (
		<View style={styles.container}>
			<StatusBar backgroundColor='#036ffc' barStyle="light-content" />
			<View style={styles.header}>
				<Text style={styles.text_header}>Quên mật khẩu</Text>
			</View>
			<Animatable.View
				animation="fadeInUpBig"
				style={styles.footer}
			>
				<ScrollView>

					<Text style={[styles.text_footer, {
						marginTop: 10, marginBottom: 15
					}]}>Bạn muốn nhận mã OTP qua:</Text>
					<View>
						<RadioForm
							radio_props={radio_props}
							initial={2}
							formHorizontal={true}
							onPress={(val) => setData({
								...data,
								type: val == 0 ? 'EMAIL' : val == 1 ? 'PHONE' : -1
							})}
						/>
					</View>
					
					{
						data.type === 'EMAIL' ? 
							<>
								<Text style={[styles.text_footer, {
									marginTop: 35
								}]}>Tên đăng nhập(email)</Text>
								<View style={styles.action}>
									<FontAwesome
										name="user-o"
										color="#05375a"
										size={20}
									/>
									<TextInput
										placeholder="Địa chỉ email"
										style={styles.textInput}
										autoCapitalize="none"
										onChangeText={(val) => textInputChange(val)}
									/>
									{data.check_textInputChange ?
										<Animatable.View
											animation="bounceIn"
										>
											<Feather
												name="check-circle"
												color="green"
												size={20}
											/>
										</Animatable.View>
										: null}
								</View>
							</>
						: data.type === 'PHONE' ?
							<>
								<Text style={[styles.text_footer, {
									marginTop: 35
								}]}>Số điện thoại</Text>
								<View style={styles.action}>
									<FontAwesome
										name="user-o"
										color="#05375a"
										size={20}
									/>
									<TextInput
										placeholder="Số điện thoại"
										style={styles.textInput}
										autoCapitalize="none"
										onChangeText={(val) => textInputChange(val)}
									/>
									{data.check_textInputChange ?
										<Animatable.View
											animation="bounceIn"
										>
											<Feather
												name="check-circle"
												color="green"
												size={20}
											/>
										</Animatable.View>
										: null}
								</View>
							</> : null
					}
				
					<Text style={[styles.text_footer, {
						marginTop: 35
					}]}>Mật khẩu</Text>
					<View style={styles.action}>
						<Feather
							name="lock"
							color="#05375a"
							size={20}
						/>
						<TextInput
							placeholder="Mật khẩu"
							secureTextEntry={data.secureTextEntry ? true : false}
							style={styles.textInput}
							autoCapitalize="none"
							onChangeText={(val) => handlePasswordChange(val)}
						/>
						<TouchableOpacity
							onPress={updateSecureTextEntry}
						>
							{data.secureTextEntry ?
								<Feather
									name="eye-off"
									color="grey"
									size={20}
								/>
								:
								<Feather
									name="eye"
									color="grey"
									size={20}
								/>
							}
						</TouchableOpacity>
					</View>

					<Text style={[styles.text_footer, {
						marginTop: 35
					}]}>Xác nhận mật khẩu</Text>
					<View style={styles.action}>
						<Feather
							name="lock"
							color="#05375a"
							size={20}
						/>
						<TextInput
							placeholder="Xác nhận lại mật khẩu"
							secureTextEntry={data.confirm_secureTextEntry ? true : false}
							style={styles.textInput}
							autoCapitalize="none"
							onChangeText={(val) => handleConfirmPasswordChange(val)}
						/>
						<TouchableOpacity
							onPress={updateConfirmSecureTextEntry}
						>
							{data.secureTextEntry ?
								<Feather
									name="eye-off"
									color="grey"
									size={20}
								/>
								:
								<Feather
									name="eye"
									color="grey"
									size={20}
								/>
							}
						</TouchableOpacity>
					</View>

					<Text style={[styles.text_footer, {
						marginTop: 35
					}]}>Mã OTP</Text>
					<View style={styles.action}>
						<TextInput
							placeholder="Mã OTP"
							style={styles.textInput}
							autoCapitalize="none"
							onChangeText={(val) => setData({
								...data,
								code: val
							})}
						/>
						{data.check_textInputChange ?
							<Animatable.View
								animation="bounceIn"
							>
								<Feather
									name="check-circle"
									color="green"
									size={20}
								/>
							</Animatable.View>
							: null}
					</View>

					<TouchableOpacity>
						<Text 
							style={{ color: '#036ffc', marginTop: 15 }}
							onPress={() => { getCode() }}
						>
							Nhấn vào để nhận mã OTP
						</Text>
					</TouchableOpacity>
					
					<View style={styles.button}>
						<TouchableOpacity
							style={[styles.signIn, {
								borderColor: '#036ffc',
								borderWidth: 1,
								marginTop: 15
							}]}
							onPress={() => { onChangePass() }}
						>
							<Text style={[styles.textSign, {
								color: '#036ffc'
							}]}>Xác nhận</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.signIn, {
								borderColor: '#036ffc',
								borderWidth: 1,
								marginTop: 15
							}]}
							onPress={() => navigation.goBack()}
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

export default ForgotPassScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#2196f3'
	},
	header: {
		flex: 1,
		justifyContent: 'flex-end',
		paddingHorizontal: 20,
		paddingBottom: 50
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
	}
});