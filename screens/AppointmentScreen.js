import React, { useState, useEffect} from 'react';
import { ScrollView, View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';
import { Card, ListItem, Button, Icon, Avatar } from 'react-native-elements';
import AppointmentForm from '../forms/AppointmentForm/AppointmentForm';
import APIService from '../utils/APIService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const flag = [
    {
        code: 1,
        status: 'Đang chờ',
        date: '13/10/2021'
    },
    {
        code: 2,
        status: 'Đang chờ',
        date: '14/10/2021'
    },
    {
        code: 3,
        status: 'Đang chờ',
        date: '15/10/2021'
    },
];

const AppointmentScreen = ({ navigation }) => {

    const [appointments, setAppointments] = useState([]);
    const [open, setOpen] = useState(true);
    const [isHaveChange, setIsHaveChange] = useState(true);
    var status = 'PENDING';

    const onClose = () => {
        setIsHaveChange(true)
        setOpen(true)
    }

    useEffect(() => {
        console.log(isHaveChange)
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

    return (
        <ScrollView>
            <View style={styles.containerView}>
                {
                    open ? <Button
                        // icon={<Icon name='code' color='#ffffff' />}
                        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginTop: 10, marginBottom: 0, width: 350 }}
                        title='Tạo lịch khám' 
                        onPress={()=>setOpen(false)}
                    /> : <AppointmentForm onClose={onClose} />
                }
            </View>
            {
                flag.map((item, i) => {
                    return (
                        <Card key={i}>
                            <Card.Title>
                                <SafeAreaView style={styles.container}>
                                    <Text>
                                        Mã nhận dạng: #{item.code}
                                    </Text>
                                    <Text>
                                        Tình trạng {item.status}
                                    </Text>
                                    <Text>
                                        Ngày khám {item.date}
                                    </Text>
                                </SafeAreaView>
                            </Card.Title>
                            <Card.Divider />
                            <View>
                                <Button
                                    // icon={<Icon name='code' color='#ffffff' />}
                                    buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                                    title='Chi tiết' />
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