import React, { useState, useEffect} from 'react';
import { ScrollView, View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';
import { Card, ListItem, Button, Icon, Avatar } from 'react-native-elements';
import AppointmentForm from '../forms/AppointmentForm/AppointmentForm';
import APIService from '../utils/APIService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dialog from "react-native-dialog";

// const flag = [
//     {
//         id: 1,
//         status: 'Đang chờ',
//         date: '13/10/2021'
//     },
//     {
//         id: 2,
//         status: 'Đang chờ',
//         date: '14/10/2021'
//     },
//     {
//         id: 3,
//         status: 'Đang chờ',
//         date: '15/10/2021'
//     },
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

const AppointmentScreen = ({ navigation }) => {
    const [appointments, setAppointments] = useState([]);
    const [patients, setPatients] = useState([]);
    const [doctorcards, setDoctorcards] = useState([]);
    const [open, setOpen] = useState(true);
    const [isHaveChange, setIsHaveChange] = useState(true);
    var status = 'PENDING';

    const onClose = () => {
        setIsHaveChange(true)
        setOpen(true)
    }

    useEffect(() => {
		if (isHaveChange) {
			AsyncStorage.getItem('token')
				.then((token) => {
                    const appointmentList = [];
                    APIService.getAppointment(
                        token,
                        {
                        },
                        (success, json) => {
                            if (success && json.result) {
                                json.result.map(item => {
                                    return item.status === status ? appointmentList.push(item) : '';
                                })
                                setAppointments(appointmentList?.map(item => {
                                    return {
                                        id: item.medicalRecordId,
                                        guardian: item.medicalRecord.customer,
                                        doctor: item.doctor,
                                        dateTime: item.day,
                                        description:item.medicalRecord.symptom,
                                        images: item.medicalRecord.images,
                                        status: item.status,
                                        createdAt: item.createdAt,
                                    }
                                }))
                                setIsHaveChange(false);
                                return console.log("thành công");
                            } else {
                                return alert("Lỗi server!");
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
                                    workplace: 'item.doctor.operation[0].workplace.name',
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
	}, [])

    const [visible, setVisible] = useState(false);
    const [info, setInfo] = useState({
        id: '',
        guardian: '',
        doctor: '',
        dateTime: '',
        hour: '',
        description: [],
        images: [],
        status: '',
        createdAt: '',
    });

    const getDateTime = (dmy) => {
        const dd = dmy.getDate();
        const mm = dmy.getMonth() + 1;
        const yyyy = dmy.getFullYear();
        return (dd + '/' + mm + '/' + yyyy).toString();
    }
    const getTime = (hm) => {
        let hour = hm.getHours();
        let minute = hm.getMinutes();
        if (minute.toString().length === 1) {
            minute = '0' + minute;
        }
        return (hour + ' : ' + minute).toString();
    }

    const showDialog = (id, guardian, doctor, dateTime, description, images, status, createdAt) => {
        setVisible(true);
        setInfo({
            id : id ? id : '',
            guardian : guardian ? guardian : {},
            doctor : doctor ? doctor : '',
            dateTime : dateTime ? getDateTime(new Date(dateTime)) : '',
            hour: dateTime ? getTime(new Date(dateTime)) : '',
            description : description ? description : [],
            images : images ? images : [],
            status : status ? status : '',
            createdAt : createdAt ? getDateTime(new Date(createdAt)) : '',
        })
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handleDelete = () => {
        setVisible(false);
    };

    return (
        <ScrollView>
            <View style={styles.containerView}>
                {
                    open ? <Button
                        // icon={<Icon name='code' color='#ffffff' />}
                        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginTop: 10, marginBottom: 0, width: 350 }}
                        title='Tạo lịch khám' 
                        onPress={()=>setOpen(false)}
                    /> : <AppointmentForm onClose={onClose} patients={patients} doctorcards={doctorcards} />
                }
            </View>
            <View style={styles.container}>
                <Dialog.Container visible={visible}>
                    <Dialog.Title>Lịch khám #{info.id}</Dialog.Title>
                    <Dialog.Description style={{textAlign: 'center'}}>
                        Tình trạng:	{info.status === 'PENDING' ? 'Chờ khám' : info.status === 'CUSTOMER_CANCEL' ? 'Đã xóa' : ''} {"\n"}
                        Họ và tên:	{info.guardian?.firstName + ' ' + info.guardian?.lastName} {"\n"}
                        Ngày tạo lịch khám:	{info.createdAt} {"\n"}
                        Ngày được khám:	{info.dateTime} {"\n"}
                        Thời gian khám:	{info.hour} {"\n"}
                        Bác sĩ khám:	{info.doctor?.firstName + ' ' + info.doctor?.lastName} {"\n"}
                        Mô tả triệu chứng:	{info.description?.map(item => {return item + ', '})} {"\n"}
                        Ảnh đính kèm:{"\n"}	{info.images?.map(item => {
                            return <Image
                                key={item}
                                source={{ uri: item }}
                                style={{ width: 120, height: 150 }}
                            />
                        })} {"\n"}
                    </Dialog.Description>
                    <Dialog.Button label="Hủy lịch" onPress={handleCancel} />
                    <Dialog.Button label="Quay về" onPress={handleDelete} />
                </Dialog.Container>
            </View>
            {
                appointments.map((item, i) => {
                    if(open) return (
                        <Card key={i}>
                            <Card.Title>
                                <SafeAreaView style={styles.container}>
                                    <Text>
                                        Mã nhận dạng: #{item.id}
                                    </Text>
                                    <Text>
                                        Tình trạng: {' '}
                                            {
                                                item.status === "PENDING" ? "Chờ khám" : ""
                                            }
                                            {
                                                item.status === "CUSTOMER_CANCEL" ? "Đã xóa" : ""
                                            }
                                    </Text>
                                    <Text>
                                        {item.dateTime.slice(0, 10)} 
                                    </Text>
                                </SafeAreaView>
                            </Card.Title>
                            <Card.Divider />
                            <View>
                                <Button
                                    // icon={<Icon name='code' color='#ffffff' />}
                                    buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                                    title='Chi tiết' 
                                    onPress={() => showDialog(
                                        item.id,
                                        item.guardian,
                                        item.doctor,
                                        item.dateTime,
                                        item.description,
                                        item.images,
                                        item.status,
                                        item.createdAt
                                    )} />
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

export default AppointmentScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
});