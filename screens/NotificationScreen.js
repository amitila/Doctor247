import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import APIService from '../utils/APIService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotificationForm from '../forms/PushNotificationForm/PushNotificationForm';

const NotificationScreen = ({ navigation }) => {

	const [appointments, setAppointments] = useState([]);
    const [isHaveChange, setIsHaveChange] = useState(true);
    const status = 'PENDING';

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
                                    return item.status === status && getDateTime(new Date()) === getDateTime(new Date(item.day)) ? appointmentList.push(item) : '';
                                })
                                setAppointments(appointmentList?.map(item => {
                                    return {
                                        id: item.medicalRecordId,
                                        guardian: item.medicalRecord.customer,
                                        doctor: item.doctor,
                                        dateTime: item.day,
                                        date: getDateTime(new Date(item.day)),
                                        hour: getTime(new Date(item.day)),
                                        description:item.medicalRecord.symptom,
                                        images: item.medicalRecord.images,
                                        status: item.status,
                                        createdAt: item.createdAt,
                                    }
                                }))
                                setIsHaveChange(false);
                                return console.log("thành công - thông báo");
                            } else {
                                return alert("Lỗi server!");
                            }
                        }
                    )
					
				})
		}
	}, [isHaveChange])

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

	return (
        <ScrollView>
            <View style={{alignItems: 'center', marginTop: 10, backgroundColor: '#ecf549', padding: 20, marginLeft: 10, marginRight: 10, borderRadius: 30}}>
				<Text style={{fontSize: 25, fontWeight: 'bold'}}>Hôm nay có gì ?</Text>
			</View>
            {
                appointments.length ? 
                <View style={styles.container}>
                    {
                        appointments.map((item, index) => {
                            const title = `Lịch khám số #${item.id} - ngày ${item.date}`;
                            const body = `Hôm nay bạn có lịch khám với bác sĩ ${item.doctor.firstName + ' ' + item.doctor.lastName} vào lúc ${item.hour} !`;
                            return index % 2 ===1 ? <View>
                                                        <PushNotificationForm key={index} title={title} body={body} />
                                                        <View style={{margin: 5, padding: 8, backgroundColor: '#66ba7d'}}>
                                                            <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>{title}</Text>
                                                            <Text style={{fontSize: 15, textAlign: 'center'}} >{body}</Text>
                                                        </View>
                                                    </View> :
                                                    <View>
                                                        <PushNotificationForm key={index} title={title} body={body} />
                                                        <View style={{margin: 5, padding: 8, backgroundColor: '#4ac2ed'}}>
                                                            <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>{title}</Text>
                                                            <Text style={{fontSize: 15, textAlign: 'center'}} >{body}</Text>
                                                        </View>
                                                    </View>
                        })
                    }
                    {/* <Text>Notification Screen</Text>
                    <Button
                        title="Go to details screen...again"
                        onPress={() => navigation.push("Notification")}
                    />
                    <Button
                        title="Go to home"
                        onPress={() => navigation.navigate("Home")}
                    />
                    <Button
                        title="Go back"
                        onPress={() => navigation.goBack()}
                    /> */}
                </View> :
                <View style={styles.container}>
                    <Text style={{fontSize: 18, marginTop: 20}}>Không có sự kiện</Text>
                </View>
            }

            
        </ScrollView>
	);
};

export default NotificationScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
});