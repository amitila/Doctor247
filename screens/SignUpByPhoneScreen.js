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

const SignUpByPhoneScreen = ({ navigation }) => {

	const [data, setData] = React.useState({
		firstName: '',
		lastName: '',
		gender: '',
		phoneNumber: '',
		password: '',
		confirm_password: '',
		code: '',
		secureTextEntry: true,
		confirm_secureTextEntry: true,
	});

	const textInputChange = (val) => {
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

	const getCode = () => {
		if(data.phoneNumber == '') {
			Alert.alert('Lỗi chưa nhập mail', 'Vui lòng nhập số điện thoại vào trường Số điện thoại', [
				{text: 'Okey'}
			]);
		}
		else {
			APIService.getCodeFromSms(data.phoneNumber, (success, json) => {
                if (success && json.result) {
                    return Alert.alert("Vui lòng kiểm tra tin nhắn!")
                } else {
                    return Alert.alert("Không gửi được!")
                }
            })
		}
	}

	const registerHandle = () => {
		if(data.firstName == '' || data.lastName == '' || data.gender == '' || data.phoneNumber == '' || data.code == '') {
			Alert.alert('Lỗi đầu vào!', 'Các trường đăng ký vui lòng không để trống.', [
				{ text: 'Okay' }
			]);
		}
		else {
			APIService.signUp({
				registerType: 'PHONE',
				email: '',
				firstName: data.firstName,
				lastName: data.lastName,
				password: data.password,
				phoneNumber: data.phoneNumber,
				gender: data.gender,
				code: data.code
			},
			(success, json) => {
				if (success && json.result) {
					Alert.alert('Đăng ký thành công', 'Quay về đăng nhập tài khoản', [
						{text: 'Okey'}
					])
					return navigation.navigate('SignInScreen')
				} else {
					return Alert.alert('Thất bại', 'Vui lòng đăng ký lại', [
						{text: 'Okey'}
					])
				}
			})
		}
	}

	var radio_props = [
		{label: 'Nam     ', value: 0 },
		{label: 'Nữ      ', value: 1 }
	];

	return (
		<View style={styles.container}>
			<StatusBar backgroundColor='#036ffc' barStyle="light-content" />
			<View style={styles.header}>
				<Text style={styles.text_header}>Đăng ký ngay!</Text>
			</View>
			<Animatable.View
				animation="fadeInUpBig"
				style={styles.footer}
			>
				<ScrollView>
					<Text style={styles.text_footer}>Họ và tên đệm</Text>
					<View style={styles.action}>
						<TextInput
							placeholder="Họ và tên đệm"
							style={styles.textInput}
							autoCapitalize="none"
							onChangeText={(val) => setData({
								...data,
								firstName: val
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

					<Text style={[styles.text_footer, {
						marginTop: 35
					}]}>Tên</Text>
					<View style={styles.action}>
						<TextInput
							placeholder="Tên"
							style={styles.textInput}
							autoCapitalize="none"
							onChangeText={(val) => setData({
								...data,
								lastName: val
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

					<Text style={[styles.text_footer, {
						marginTop: 35
					}]}>Giới tính</Text>
					<View>
						<RadioForm
							radio_props={radio_props}
							initial={2}
							formHorizontal={true}
							onPress={(val) => setData({
								...data,
								gender: val == 0 ? 'MALE' : 'FEMALE'
							})}
						/>
					</View>

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
					
					<View style={styles.textPrivate}>
						<Text style={styles.color_textPrivate}>
							Trước khi đăng ký, bạn hãy chắc chắn đồng ý với
						</Text>
						<Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>{" "}Điều khoản dịch vụ</Text>
						<Text style={styles.color_textPrivate}>{" "}and</Text>
						<Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>{" "}Chính sách bảo mật</Text>
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
							}]}>Đăng ký</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.signIn, {
								borderColor: '#036ffc',
								borderWidth: 1,
								marginTop: 15
							}]}
							onPress={() => navigation.navigate('SignUpScreen')}
						>
							<Text style={[styles.textSign, {
								color: '#036ffc'
							}]}>Đăng ký bằng tài khoản</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</Animatable.View>
		</View>
	);
};

export default SignUpByPhoneScreen;

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