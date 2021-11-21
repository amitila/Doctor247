import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';
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

    const [visible, setVisible] = useState(false);

    const showDialog = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handleDelete = () => {
        setVisible(false);
    };

    return (
        <>
            <ScrollView>
                <View style={styles.containerView}>
                    {
                        open ? <Button
                            // icon={<Icon name='code' color='#ffffff' />}
                            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginTop: 10, marginBottom: 0, width: 350 }}
                            title='Thêm hồ sơ' 
                            onPress={()=>setOpen(false)}
                        /> : <GuardianForm onClose={onClose} />
                    }
                </View>
                <View style={styles.container}>
                    <Dialog.Container visible={visible}>
                        <Dialog.Title>Tạo tài khoản mới</Dialog.Title>
                        <Dialog.Description>
                            Bạn có muốn tạo tài khoản mới cho amiiii
                        </Dialog.Description>
                        <Dialog.Button label="Cancel" onPress={handleCancel} />
                        <Dialog.Button label="Delete" onPress={handleDelete} />
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
                                        <Text>
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
                                            onPress={showDialog}
                                            // icon={<Icon name='code' color='#ffffff' />}
                                            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
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
});