import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';
import { Card, ListItem, Button, Icon, Avatar } from 'react-native-elements';
import APIService from '../utils/APIService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dialog from "react-native-dialog";
import BookingForm from '../forms/BookingForm/BookingForm';

// const doctors = [
//     {
//         name: 'BS.Pham Van Tam',
//         avatar: 'https://i.pinimg.com/736x/34/d6/f4/34d6f424bedf3dbc00ad054aec65a28b.jpg',
//         specialist: 'Truyền nhiễm'
//     },
//     {
//         name: 'BS.Le Van Han',
//         avatar: 'https://scr.vn/wp-content/uploads/2020/08/H%C3%ACnh-g%C3%A1i-%C4%91%E1%BA%B9p-t%C3%B3c-d%C3%A0i-ng%E1%BA%A7u.jpg',
//         specialist: 'Hộ sinh'
//     },
//     {
//         name: 'BS.Hoang Van Dung',
//         avatar: 'https://hinhanhdep.net/wp-content/uploads/2015/12/anh-girl-xinh-9x-1.jpg',
//         specialist: 'Di truyền'
//     }
// ];

var me = [];
AsyncStorage.getItem('token')
    .then((token) => {
        return APIService.getProfile(token, (success, json) => {
            if (success && json.result) {
                return me = {
                    name: json.result.customer.firstName + ' ' + json.result.customer.lastName,
                    avatar: json.result.customer.avatarURL ? json.result.customer.avatarURL : '',
                };
            }
        })
    })

const DoctorListScreen = ({ navigation }) => {

    const [doctorcards, setDoctorcards] = useState([]);
    const [patients, setPatients] = useState([]);
    const [open, setOpen] = useState(true);
    const [isHaveChange, setIsHaveChange] = useState(true);

    useEffect(() => {
		if (isHaveChange) {
			AsyncStorage.getItem('token')
				.then((token) => {
                    const drList = [];
					APIService.getDoctorList(
                        token,
                        (success, json) => {
                            if (success && json.result) {
                                json.result.map(item => {
                                    return drList.push(item);
                                })
                                setDoctorcards(drList?.map(item => {
                                    return {
                                        id: item.doctor.id,
                                        avatar: item.doctor.avatarURL,
                                        name: item.doctor.firstName +' '+ item.doctor.lastName,
                                        specialist: item.doctor.specialized.name,
                                        phone:"0257296632",
                                        year_exp:"5 năm kinh nghiệm",
                                        workplace: 'Chưa tạo phòng khám', //item.doctor.operation[0].workplace.name
                                    }
                                }))
                                setIsHaveChange(false);
                                return console.log("thành công");
                            } else {
                                return console.log("lỗi server");
                            }
                        }
                    )
				})
		}
	}, [isHaveChange])

    useEffect(() => {
        AsyncStorage.getItem('token')
        .then((token) => {
            const patientList = [];
            APIService.getGuardian(
                token,
                (success, json) => {
                    if (success && json.result) {
                        json.result.map((item, index) => {
                            if(index === 0 && me) {
                                patientList.push({
                                    userTwoId: '',
                                    userTwo: {
                                        firstName: me.name,
                                        lastName: ' (Tôi)',
                                        avatarURL: me.avatar
                                    }
                                })
                            }
                            return patientList.push(item);
                        })
                        setPatients(patientList?.map(item => {
                            return {
                                id: item.id,
                                userTwoId: item.userTwoId,
                                name: item.userTwo.firstName + ' ' + item.userTwo.lastName,
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
    }, [])

    const [visible, setVisible] = useState(false);
    const [info, setInfo] = useState({
        id: '',
        avatar: '',
        name: '',
        specialist: '',
        phone:"0257296632",
        year_exp:"5 năm kinh nghiệm",
        workplace: 'Chưa tạo phòng khám', //item.doctor.operation[0].workplace.name
    })
    const [bookForm, setBookForm] = useState({
        doctorId: '',
        patients: []
    });

    const showDialog = (id, avatar, name, specialist, phone, year_exp, workplace) => {
        setVisible(true);
        setInfo({
            id: id ? id : '',
            avatar: avatar ? avatar : '',
            name: name ? name : '',
            specialist: specialist ? specialist : '',
            phone: phone ? phone : '',
            year_exp: year_exp ? year_exp : '',
            workplace: workplace ? workplace : ''
        })
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handleDelete = () => {
        setVisible(false);
    };

    const onClose = () => {
        setIsHaveChange(true)
        setOpen(true)
    }

    const showBookForm = (a, b) => {
        setOpen(false)
        setBookForm({
            patients: a ? a : [],
            doctorId: b ? b : ''
        })
    }

    return (
        <ScrollView>
            <View style={styles.containerView}>
                {
                    open ? null : <BookingForm onClose={onClose} patients={bookForm.patients} doctorId={bookForm.doctorId} />
                }
            </View>
            <Dialog.Container visible={visible}>
                <Dialog.Title>Thông tin bác sĩ {info.name}</Dialog.Title>
                <Dialog.Description>
                    Amiiiiii
                </Dialog.Description>
                <Dialog.Button label="Hủy bỏ" onPress={handleCancel} />
                <Dialog.Button label="Đặt khám" onPress={handleDelete} />
            </Dialog.Container>
            {
                doctorcards.map((item, i) => {
                    const doctorId = item.id;
                    if (open) return (
                        <Card key={i}>
                            <Card.Title>
                                <SafeAreaView style={styles.container}>
                                    <Avatar
                                        rounded
                                        source={{uri: item.avatar}}
                                        size="medium"
                                    />
                                </SafeAreaView>
                                {'\n'}
                                <SafeAreaView style={styles.container}>
                                    <Text>
                                        BS.{item.name}
                                    </Text>
                                    <Text>
                                        Mã số: BS100{item.id}
                                    </Text>
                                    <Text>
                                        Chuyên khoa {item.specialist}
                                    </Text>
                                </SafeAreaView>
                            </Card.Title>
                            {/* <Card.Divider /> */}
                            <View>
                                <Button title="Thông tin bác sĩ" onPress={()=>showDialog(
                                    item.id,
                                    item.avatar,
                                    item.name,
                                    item.specialist,
                                    item.phone,
                                    item.year_exp,
                                    item.workplace
                                )} />
                            </View>
                            <Card.Divider />
                            <View>
                                <Button
                                    // icon={<Icon name='code' color='#ffffff' />}
                                    onPress={()=>showBookForm(patients, doctorId)}
                                    buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                                    title='Đặt khám' />
                            </View>
                            {/* <Card.Image>
                                <Text style={{ marginBottom: 10 }}>
                                    The idea with React Native Elements is more about component structure than actual design.
                                </Text>
                                <Button
                                    icon={<Icon name='code' color='#ffffff' />}
                                    buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                                    title='VIEW NOW' />
                            </Card.Image> */}
                        </Card>
                    );
                })
            }
        </ScrollView>
    );
};

export default DoctorListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
    },
    containerView: {
		flex: 0.5,
		alignItems: 'flex-start',
		justifyContent: 'space-around',
		textAlign: 'center',
        display: 'flex',
        flexDirection: 'row'
	},
});