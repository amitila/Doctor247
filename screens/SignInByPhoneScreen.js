import React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	Platform,
	StyleSheet,
	StatusBar,
	Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
// import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from 'react-native-paper';
import { AuthContext } from '../components/context';
import Users from '../model/users';
import APIService from '../utils/APIService';

const SignInByPhoneScreen = ({ navigation }) => {

	const [data, setData] = React.useState({
		username: '',
		password: '',
		check_textInputChange: false,
		secureTextEntry: true,
		isValidUser: true,
		isValidPassword: true,
	});

	const { colors } = useTheme();

	const { signIn } = React.useContext(AuthContext);

	const textInputChange = (val) => {
		if (val.trim().length >= 4) {
			setData({
				...data,
				username: val,
				check_textInputChange: true,
				isValidUser: true
			});
		} else {
			setData({
				...data,
				username: val,
				check_textInputChange: false,
				isValidUser: false
			});
		}
	}

	const handlePasswordChange = (val) => {
		if (val.trim().length >= 4) {
			setData({
				...data,
				password: val,
				isValidPassword: true
			});
		} else {
			setData({
				...data,
				password: val,
				isValidPassword: false
			});
		}
	}

	const handleValidUser = (val) => {
		if (val.trim().length >= 4) {
			setData({
				...data,
				isValidUser: true
			});
		} else {
			setData({
				...data,
				isValidUser: false
			});
		}
	}

	const getCode = () => {
		if(data.username.length == 0) {
			Alert.alert('Lỗi đầu vào!', 'Vui lòng nhập số điện thoại để nhận mã.', [
				{ text: 'Okay' }
			]);
		}
		else {
			APIService.signInSendCodeToSms(data.username, (success, json) => {
                if (success && json.result) {
                    return Alert.alert("Vui lòng kiểm tra tin nhắn!")
                } else {
                    return Alert.alert("Số điện thoại nhập sai hay chưa đăng ký!")
                }
            })
		}
	}

	const loginHandle = (username, password) => {

		if (data.username.length == 0 || data.password.length == 0) {
			Alert.alert('Lỗi đầu vào!', 'Số điện thoại và mã OTP không thể được để trống.', [
				{ text: 'Okay' }
			]);
			return;
		}

		APIService.signInBySms(username, password, (success, json) => {
			if (success && json.result) {
				const foundUser = Users.filter(item => {
					return username == item.username && password == item.password || success;
				});

				if (foundUser.length == 0) {
					Alert.alert('Người dùng vô hiệu!', 'Số điện thoại hay mã OTP không đúng.', [
						{ text: 'Okay' }
					]);
					return;
				}
		
				signIn(foundUser);
			} else {
				const foundUser = Users.filter(item => {
					return username == item.username && password == item.password || success;
				});

				if (foundUser.length == 0) {
					Alert.alert('Người dùng vô hiệu!', 'Số điện thoại hay mã OTP không đúng.', [
						{ text: 'Okay' }
					]);
					return;
				}
		
				signIn(foundUser);
			}
		})
	}

	return (
		<View style={styles.container}>
			<StatusBar backgroundColor='#036ffc' barStyle="light-content" />
			<View style={styles.header}>
				<Text style={styles.text_header}>Xin chào bạn !</Text>
			</View>
			<Animatable.View
				animation="fadeInUpBig"
				style={[styles.footer, {
					backgroundColor: colors.background
				}]}
			>
				<Text style={[styles.text_footer, {
					color: colors.text
				}]}>Số điện thoại</Text>
				<View style={styles.action}>
					<FontAwesome
						name="user-o"
						color={colors.text}
						size={20}
					/>
					<TextInput
						placeholder="Số điện thoại"
						placeholderTextColor="#666666"
						style={[styles.textInput, {
							color: colors.text
						}]}
						autoCapitalize="none"
						onChangeText={(val) => textInputChange(val)}
						onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
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
					color: colors.text,
					marginTop: 35
				}]}>Mã OTP</Text>
				<View style={styles.action}>
					<Feather
						name="lock"
						color={colors.text}
						size={20}
					/>
					<TextInput
						placeholder="Mã OTP"
						placeholderTextColor="#666666"
						style={[styles.textInput, {
							color: colors.text
						}]}
						autoCapitalize="none"
						onChangeText={(val) => handlePasswordChange(val)}
					/>
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
						onPress={() => { loginHandle(data.username, data.password) }}
						style={[styles.signIn, {
							borderColor: '#036ffc',
							borderWidth: 1,
							marginTop: 15
						}]}
					>
						<Text style={[styles.textSign, {
							color: '#036ffc'
						}]}>Đăng nhập</Text>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => navigation.navigate('SignInScreen')}
						style={[styles.signIn, {
							borderColor: '#036ffc',
							borderWidth: 1,
							marginTop: 15
						}]}
					>
						<Text style={[styles.textSign, {
							color: '#036ffc'
						}]}>Đăng nhập bằng tài khoản</Text>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => navigation.navigate('SignUpScreen')}
						style={[styles.signIn, {
							borderColor: '#036ffc',
							borderWidth: 1,
							marginTop: 15
						}]}
					>
						<Text style={[styles.textSign, {
							color: '#036ffc'
						}]}>Đăng ký tài khoản</Text>
					</TouchableOpacity>
				</View>
			</Animatable.View>
		</View>
	);
};

export default SignInByPhoneScreen;

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
		flex: 3,
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
	actionError: {
		flexDirection: 'row',
		marginTop: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#FF0000',
		paddingBottom: 5
	},
	textInput: {
		flex: 1,
		marginTop: Platform.OS === 'ios' ? 0 : -12,
		paddingLeft: 10,
		color: '#05375a',
	},
	errorMsg: {
		color: '#FF0000',
		fontSize: 14,
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
	}
});