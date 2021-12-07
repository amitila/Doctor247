import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, Image, SafeAreaView, TextInput, Picker, Alert } from 'react-native';
import { Card, ListItem, Button, Icon, Avatar } from 'react-native-elements';
import GuardianForm from '../forms/GuardianForm/GuardianForm';
import APIService from '../utils/APIService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dialog from "react-native-dialog";

// const people = [
//     {
//         name: 'Pham Van Tam',
//         birthday: '19/09/1999',
//         phone: '0398296632',
//         avatar: 'https://i.pinimg.com/736x/34/d6/f4/34d6f424bedf3dbc00ad054aec65a28b.jpg',
//         address: 'Phú Yên'
//     },
//     {
//         name: 'Le Van Han',
//         birthday: '19/09/1999',
//         phone: '0398296632',
//         avatar: 'https://scr.vn/wp-content/uploads/2020/08/H%C3%ACnh-g%C3%A1i-%C4%91%E1%BA%B9p-t%C3%B3c-d%C3%A0i-ng%E1%BA%A7u.jpg',
//         address: 'Đăk Lăk'
//     },
//     {
//         name: 'Hoang Van Dung',
//         birthday: '19/09/1999',
//         phone: '0398296632',
//         avatar: 'https://hinhanhdep.net/wp-content/uploads/2015/12/anh-girl-xinh-9x-1.jpg',
//         address: 'Đồng Nai'
//     },
//     {
//         name: 'Ami Lila',
//         birthday: '19/09/1999',
//         phone: '0398296632',
//         avatar: 'https://hinhanhdep.net/wp-content/uploads/2015/12/anh-girl-xinh-9x-1.jpg',
//         address: 'Tuy Hòa'
//     }
// ];

const getBirthdayVN = (value) => {
    var date = new Date();
    date.setDate(parseInt(value?.slice(8, 10)));
    date.setMonth(parseInt(value?.slice(5, 7)) - 1);
    date.setFullYear(parseInt(value?.slice(0, 4)));
    return date;
}

const FamilyScreen = ({ navigation }) => {

    const [profiles, setProfiles] = useState([]);
    const [open, setOpen] = useState(true);
    const [isHaveChange, setIsHaveChange] = useState(true);

    const onClose = () => {
        setIsHaveChange(true)
        setOpen(true)
    }

    useEffect(() => {
		if (isHaveChange) {
			AsyncStorage.getItem('token')
				.then((token) => {
					const profileList = [];
					APIService.getGuardian(
						token,
						(success, json) => {
							if (success && json.result) {
								json.result.map(item => {
									return profileList.push(item);
								})
								setProfiles(profileList?.map(item => {
									return {
										id: item.id,
										userTwoId: item.userTwoId,
										relationship: item.name,
										email: '',
										firstName: item.userTwo.firstName,
										lastName: item.userTwo.lastName,
										birthday: item.userTwo.birthday.slice(0, 10),
										birthdayVN: getBirthdayVN(item.userTwo.birthday),
										gender: item.userTwo.gender,
										phoneNumber: item.userTwo.phoneNumber,
										bhyt: item.userTwo.healthInsuranceCode,
										address: item.userTwo.address,
										province: item.userTwo.province.name,
                                        provinceId: item.userTwo.province.id,
										avatar: item.userTwo.avatarURL,
									}
								}))
								setIsHaveChange(false)
								return console.log("thành công");
							} else {
								return console.log(json.error);
							}
						}
					)
				})
		}
	}, [isHaveChange])

    // dialog for delete guardian
    const [visibleDel, setVisibleDel] = useState(false);
    const [info, setInfo] = useState({
        id: '',
    });
    const [code, setCode] = useState('');

    const showDialogDel = (id) => {
        setVisibleDel(true);
        setInfo({
            id : id ? id : '',
        })
    };

    const handleCancelDel = () => {
        setVisibleDel(false);
    };

    // send code 
    const sendCode = (id, type) => {
        AsyncStorage.getItem('token')
            .then((token) => {
                APIService.getCodeVerifyGuardian(
                    token,
                    {
                        id: id,
                        type: type
                    },
                    (success, json) => {
                        if (success && json.result) {
                            return alert("Vui lòng kiểm tra mail/tin nhắn !");
                        } else {
                            return alert(json.error);
                        }
                    }
                )
            })
    }

    // confirm to delete
    const handleConfirmDelete = (id, code) => {
        AsyncStorage.getItem('token')
            .then((token) => {
                APIService.deleteGuardian(
                    token,
                    id,
                    code,
                    (success, json) => {
                        if (success && json.result) {
                            setVisibleDel(false);
                            return alert(" Xóa THÀNH CÔNG !");
                        } else {
                            return alert(json.error);
                        }
                    }
                )
            })
    };

    // dialog for transfer guardian to user
    const [visible, setVisible] = useState(false);
    const [openCode, setOpenCode] = useState(false);
    const [data, setData] = useState({
        guardiantId: '',
        type: 'EMAIL',
        name: '',
        email: '',
        phoneNumber: '',
        password: '',
        code: '',
        guardiantPassword: ''
    })

    const showDialog = (name, id) => {
        setData(({ ...data, name: name, guardiantId: id }));
        setVisible(true);
    };

    const handleCancel = () => {
        setOpenCode(false)
        setVisible(false);
    };

    const verifyGuardianUser = () => {
        // console.log('data')
        // console.log(data)
        // Send code verify
        AsyncStorage.getItem('token')
            .then((token) => {
                APIService.verifyGuardianUser(
                    token,
                    {
                        password: data.password,
                        guardiantId: data.guardiantId,
                        type: data.type,
                        email: data.email,
                        phoneNumber: data.phoneNumber
                    },
                    (success, json) => {
                        if (success && json.result) {
                            setOpenCode(true)
                            return alert('Đã gửi code')
                        } else {
                            return alert("Không gửi được!");
                        }
                    })
            })
    }

    const handleConfirmGuardianUser = () => {
        // Confirm create guardian user
        if(data.guardiantPassword.length < 4 || data.password.length < 4) {
			Alert.alert('Lỗi mật khẩu!', 'Vui lòng nhập mật khẩu từ 4 ký từ trở lên', [
				{ text: 'Okay' }
			]);
		}
        else {
            AsyncStorage.getItem('token')
                .then((token) => {
                    APIService.postGuardianUser(
                        token,
                        {
                            password: data.password,
                            guardiantId: data.guardiantId,
                            type: data.type,
                            email: data.email,
                            phoneNumber: data.phoneNumber,
                            code: data.code,
                            guardiantPassword: data.guardiantPassword
                        },
                        (success, json) => {
                            if (success && json.result) {
                                setVisible(false);
                                return alert('Xác nhận tạo user mới')
                            } else {
                                return alert("Chuyển đổi THẤT BẠI!");
                            }
                        })
                })
            }
    }

    return (
        <>
            <ScrollView>
                <View style={styles.containerView}>
                    {
                        open ? <Button
                            // icon={<Icon name='code' color='#ffffff' />}
                            buttonStyle={{ borderRadius: 10, marginLeft: 0, marginRight: 0, marginTop: 10, marginBottom: 0, width: 350, padding: 20 }}
                            title='Thêm hồ sơ' 
                            onPress={()=>setOpen(false)}
                        /> : <GuardianForm onClose={onClose} />
                    }
                </View>
                <View style={styles.container}>
                    <Dialog.Container visible={visibleDel}>
                        <Dialog.Title>Xóa thẻ hồ sơ #{info.id}</Dialog.Title>
                        <Dialog.Description>
                            Bạn muốn nhận mã xóa qua:{'\n'}{'\n'}
                            <Button
                                onPress={()=>sendCode(info.id, 'EMAIL')}
                                // icon={<Icon name='code' color='#ffffff' />}
                                buttonStyle={{ borderRadius: 10, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: 'green' }}
                                title='Qua Email' />{'          '}
                            <Button
                                onPress={()=>sendCode(info.id, 'PHONE')}
                                // icon={<Icon name='code' color='#ffffff' />}
                                buttonStyle={{ borderRadius: 10, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: 'brown' }}
                                title='Qua Sms' />
                            
                        </Dialog.Description>
                        <TextInput
                            placeholder="Mã OTP*"
                            value={code}
                            style={{fontSize: 18}}
                            autoCapitalize="none"
                            onChangeText={(val) => setCode(val)}
                        />
                        <Dialog.Button label="Quay về" onPress={handleCancelDel} />
                        <Dialog.Button label="Xác nhận xóa" onPress={()=>handleConfirmDelete(info.id, code)} />
                    </Dialog.Container>
                </View>
                <View style={styles.container}>
                    <Dialog.Container visible={visible}>
                        <Dialog.Title style={{textAlign: 'center'}}>Tạo tài khoản mới</Dialog.Title>
                        <Dialog.Description>
                            Bạn muốn chọn mail hay số điện thoại làm tên đăng nhập cho tài khoản:{'\n'}{'\n'}
                            <Picker
                                selectedValue={data.type}
                                style={{ height: 50, width: 250 }}
                                onValueChange={(itemValue, itemIndex) => setData({
                                    ...data,
                                    type: itemValue
                                })}
                            >
                                {
                                    ['EMAIL', 'PHONE'].map((item, index) => {
                                        return <Picker.Item label={item === 'EMAIL'? 'Email' : 'Số điện thoại'} value={item} key={index} />
                                    })
                                }
						    </Picker>
                        </Dialog.Description>
                        <TextInput
                            placeholder="Họ và tên"
                            value={data.name}
                            style={{fontSize: 18, marginTop: 5, marginBottom: 5}}
                            autoCapitalize="none"
                            onChangeText={(val) => setData({
                                ...data,
                                name: val
                            })}
                        />
                        {
                            data.type === 'EMAIL' ?  <TextInput
                                                    placeholder="Địa chỉ email (mới)"
                                                    value={data.email}
                                                    style={{fontSize: 18, marginTop: 5, marginBottom: 5}}
                                                    autoCapitalize="none"
                                                    onChangeText={(val) => setData({
                                                        ...data,
                                                        email: val
                                                    })}
                                                /> : 
                                                <TextInput
                                                    placeholder="Số điện thoại (mới)"
                                                    value={data.phoneNumber}
                                                    style={{fontSize: 18, marginTop: 5, marginBottom: 5}}
                                                    autoCapitalize="none"
                                                    onChangeText={(val) => setData({
                                                        ...data,
                                                        phoneNumber: val
                                                    })}
                                                />
                        }
                        <TextInput
							placeholder="Mật khẩu của bạn"
							value={data.password}
							style={{fontSize: 18, marginTop: 5, marginBottom: 5}}
							autoCapitalize="none"
							onChangeText={(val) => setData({
								...data,
								password: val
							})}
						/>
                        <Button
                                onPress={verifyGuardianUser}
                                // icon={<Icon name='code' color='#ffffff' />}
                                buttonStyle={{ borderRadius: 10, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: 'green' }}
                                title='Nhận mã xác thực' />
                        {
                            openCode ? <>
                                        <TextInput
                                            placeholder="Mã OTP*"
                                            value={data.code}
                                            style={{fontSize: 18, marginTop: 5, marginBottom: 5}}
                                            autoCapitalize="none"
                                            onChangeText={(val) => setData({
                                                ...data,
                                                code: val
                                            })}
                                        />
                                        <TextInput
                                            placeholder="Tạo mật khẩu cho tài khoản mới"
                                            value={data.guardiantPassword}
                                            style={{fontSize: 18, marginTop: 5, marginBottom: 5}}
                                            autoCapitalize="none"
                                            onChangeText={(val) => setData({
                                                ...data,
                                                guardiantPassword: val
                                            })}
                                        />
                                    </> : null
                        }
                        <Dialog.Button label="Quay về" onPress={handleCancel} />
                        <Dialog.Button label="Xác nhận" onPress={handleConfirmGuardianUser} />
                    </Dialog.Container>
                </View>
                {
                    profiles.map((item, i) => {
                        if(open) return (
                            <Card key={i}>
                                <Card.Title>
                                    <SafeAreaView style={styles.container}>
                                        <Avatar
                                            rounded
                                            source={{uri: item.avatar}}
                                            size="medium"
                                        />
                                    </SafeAreaView>
                                    <SafeAreaView style={styles.container}>
                                        <Text>
                                            Hồ sơ số {i} của {item.relationship}
                                        </Text>
                                        <Text style={{fontWeight: 'bold'}}>
                                            {item.firstName + ' ' + item.lastName}
                                        </Text>
                                        <Text>
                                            Ngày sinh: {item.birthday}
                                        </Text>
                                    </SafeAreaView>
                                </Card.Title>
                                <Card.Divider />
                                <View>
                                    <Text style={{ marginBottom: 10 }}>
                                        Giới tính: {item.gender == 'MALE' ? 'Nữ' : 'Nam'}
                                    </Text>
                                    {/* <Text style={{ marginBottom: 10 }}>
                                        Mã số BHYT: {item.bhyt}
                                    </Text>
                                    <Text style={{ marginBottom: 10 }}>
                                        Số điện thoại: {item.phoneNumber}
                                    </Text> */}
                                    {/* <Text style={{ marginBottom: 10 }}>
                                        Email: {item.email}
                                    </Text> */}
                                    <Text style={{ marginBottom: 10 }}>
                                        Tỉnh: {item.province}
                                    </Text>
                                    <Text style={{ marginBottom: 10 }}>
                                        Địa chỉ: {item.address}
                                    </Text>
                                    <View style={styles.containerView}>
                                        <Button
                                            onPress={()=>showDialogDel(item.userTwoId)}
                                            // icon={<Icon name='code' color='#ffffff' />}
                                            buttonStyle={{ borderRadius: 20, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: 'red' }}
                                            title={`Xóa thẻ ${item.firstName + ' ' + item.lastName}`} />
                                    </View>
                                    <View style={{marginTop: 5}}></View>
                                    <View style={styles.containerView}>
                                        <Button
                                            onPress={()=>showDialog(item.firstName+" "+item.lastName, item.userTwoId)}
                                            // icon={<Icon name='code' color='#ffffff' />}
                                            buttonStyle={{ borderRadius: 20, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: 'green'}}
                                            title={`Tạo tài khoản cho ${item.firstName + ' ' + item.lastName}`} />
                                    </View>
                                </View>
                            </Card>
                        );
                    })
                }
            </ScrollView>
        </>
    );
};

export default FamilyScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        paddingHorizontal: 20
    },
    containerView: {
		flex: 0.5,
		alignItems: 'flex-start',
		justifyContent: 'space-around',
		textAlign: 'center',
        display: 'flex',
        flexDirection: 'row'
	},
	buttonContainer: {
		flex: 0.5,
		// backgroundColor: 'gold',
		width: 110,
		height: 150,
		justifyContent: 'center',
		alignItems: 'center',
	},
    textInput: {
		flex: 1,
		marginTop: Platform.OS === 'ios' ? 0 : -12,
		paddingLeft: 10,
		color: '#05375a',
	},
});