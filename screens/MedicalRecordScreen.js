import React, { useState, useEffect} from 'react';
import { ScrollView, View, Text, StyleSheet, Image, SafeAreaView, Picker, Linking } from 'react-native';
import { Card, ListItem, Button, Icon, Avatar } from 'react-native-elements';
import APIService from '../utils/APIService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dialog from "react-native-dialog";

const MedicalRecordScreen = ({ navigation }) => {
    const [medicalRecords, setMedicalRecords] = useState([]);
    const [open, setOpen] = useState(true);
    const [isHaveChange, setIsHaveChange] = useState(true);
    // const source = { uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf', cache: true };

    useEffect(() => {
		if (isHaveChange) {
			AsyncStorage.getItem('token')
				.then((token) => {
                    const mrList = [];
					const appointmentStatus = 'DONE';
					APIService.getMedicalRecords(
						token,
						{
						},
						appointmentStatus,
						(success, json) => {
							if (success && json.result) {
								json.result.map(item => {
									return mrList.push(item);
								})
								setMedicalRecords(mrList?.map(item => {
									return {
										id: item.id,
										patient: item.customer.firstName + ' ' + item.customer.lastName,
										doctor: item.appointment[0].doctor.firstName + ' ' + item.appointment[0].doctor.lastName,
										doctorId: item.appointment[0].doctorId,
										dateTime: item.appointment[0].day,
										symptom: item.symptom,
										dose: item.dose,
										diagnostic: item.diagnostic,
										medicalExpense: item.medicalExpense,
										note: item.note,
										images: item.images,
										status: item.status,
										createdAt: item.createdAt,
										files: item.files,
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

    const [visible, setVisible] = useState(false);
    const [info, setInfo] = useState({
		id: '',
		patient: '',
		doctor: '',
		doctorId: '',
		dateTime: '',
		hour: '',
		symptom: [],
		dose: [],
		diagnostic: [],
		medicalExpense: '',
		note: '',
		images: [],
		status: '',
		createdAt: '',
		files: [],
    });

	const handleChangeVisible = (id, visible) => {
		AsyncStorage.getItem('token')
			.then((token) => {
			const status = visible;
			APIService.putStatusOfMedicalRecord(
				token,
				id,
				status,
				(success, json) => {
					if (success && json.result) {
						setIsHaveChange(true)
						return console.log("Đổi quyền xem thành công");
					} else {
						return console.log(json.error);
					}
				} 
			)
		})
	}

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

    const showDialog = ( id, patient, doctor, doctorId, dateTime, symptom, dose, diagnostic, medicalExpense, note, images, status, createdAt, files) => {
        setVisible(true);
        setInfo({
			id: id ? id : '',
			patient: patient ? patient : '',
			doctor: doctor ? doctor : '',
			doctorId: doctorId ? doctorId : '',
			dateTime: dateTime ? getDateTime(new Date(dateTime)) : '',
			hour: getTime(new Date(dateTime)),
			symptom: symptom ? symptom : [],
			dose: dose ? dose : [],
			diagnostic: diagnostic ? diagnostic : [],
			medicalExpense: medicalExpense ? medicalExpense : 'Không có',
			note: note ? note : 'Không có',
			images: images ? images : [],
			status: status ? status : '',
			createdAt: createdAt ? getDateTime(new Date(createdAt)) : '',
			files: files ? files : [],
        })
    };

    const handleCancel = () => {
        setVisible(false);
    };

	const visibleOfMedical = [
		{
			en: 'PUBLIC',
			vn: 'Mọi người'
		},
		{
			en: 'PRIVATE',
			vn: 'Chỉ mình tôi'
		},
		{
			en: 'ONLY_DOCTOR_EXAMINATION',
			vn: 'Chỉ bác sĩ khám'
		}
	];

	const downloadDocument = (file) => {
		// console.log(file)
		return Linking.openURL(file);
	}

    return (
        <ScrollView style={{backgroundColor: '#a5f2c9'}}>
			<View style={{alignItems: 'center', marginTop: 10, backgroundColor: '#ecf549', padding: 20, marginLeft: 10, marginRight: 10, borderRadius: 30}}>
				<Text style={{fontSize: 25, fontWeight: 'bold'}}>Hồ sơ bệnh án</Text>
			</View>
            <View style={styles.container}>
                <Dialog.Container visible={visible}>
                    <Dialog.Title style={{fontWeight: 'bold', textAlign: 'center'}}>Bệnh án #{info.id}</Dialog.Title>
					<ScrollView>
						<Dialog.Description style={{textAlign: 'center'}}>
							<Text style={{color: 'green', fontWeight: 'bold'}}>Chế độ xem  |		{info.status === 'PUBLIC' ? 'Mọi người' : info.status === 'PRIVATE' ? 'Chỉ mình tôi' : 'Chỉ bác sĩ khám'} {"\n"}{"\n"}</Text>
							<Text style={{color: 'blue', fontWeight: 'bold'}}>Họ và tên  |		{info.patient} {"\n"}{"\n"}</Text>
							<Text style={{color: 'green', fontWeight: 'bold'}}>Ngày khám bệnh  |	{info.dateTime} {"\n"}{"\n"}</Text>
							<Text style={{color: 'blue', fontWeight: 'bold'}}>Ngày trả kết quả  | {info.createdAt} {"\n"}{"\n"}</Text>
							<Text style={{color: 'green', fontWeight: 'bold'}}>Giờ khám  |		{info.hour} {"\n"}{"\n"}</Text>
							<Text style={{color: 'blue', fontWeight: 'bold'}}>Bác sĩ khám  |	{info.doctor + ' _MS:BS100' + info.doctorId} {"\n"}{"\n"}</Text>
							<Text style={{color: 'green', fontWeight: 'bold'}}>Triệu chứng  |	{info.symptom.length ? info.symptom.map(item => {return item + ', '}) : 'Không có'} {"\n"}{"\n"}</Text>
							<Text style={{color: 'blue', fontWeight: 'bold'}}>Đã chẩn đoán  |	{info.diagnostic.length ? info.diagnostic.map(item => {return item + ', '}) : 'Không có'} {"\n"}{"\n"}</Text>
							<Text style={{color: 'green', fontWeight: 'bold'}}>Thuốc dùng  |	{'Không có'}</Text>
							<Text style={{color: 'blue', fontWeight: 'bold'}}>Lưu ý bác sĩ  |	{info.note} {"\n"}{"\n"}</Text>
							<Text style={{color: 'green', fontWeight: 'bold'}}>Chi phí khám  |	{info.medicalExpense} {"\n"}{"\n"}</Text>
							<Text style={{color: 'blue', fontWeight: 'bold'}}>Hình ảnh  | {"\n"}	{info.images.length ? info.images.map(item => {
															return <Image
																key={item}
																source={{ uri: item }}
																style={{ width: 120, height: 150 }}
															/>
														}) : 'Không có'} {"\n"}{"\n"}</Text>
							<Text style={{color: 'green', fontWeight: 'bold'}}>Tài liệu đính kèm:{"\n"}	{info.files.length ? info.files.map((item, i) => {
															return <Text key={i} onPress={()=>downloadDocument(item)} style={{textDecorationLine:'underline', color: 'brown'}}>
																		Tài liệu {i+1}{"\n"}
																	</Text>
														}) : 'Không có'} {"\n"}</Text>
						</Dialog.Description>
					</ScrollView>
                    <Dialog.Button label="Quay về" onPress={handleCancel} />
                </Dialog.Container>
            </View>
            {
                medicalRecords.map((item, i) => {
                    if(open) return (
                        <Card key={i}>
                            <Card.Title>
                                <SafeAreaView style={styles.container}>
                                    <Text style={{fontWeight: 'bold', fontSize: 20}}>
                                        Mã nhận dạng: #{item.id}
                                    </Text>
                                    <Text>
										Chế độ xem: {' '}
											{
												item.status === "PUBLIC" ? "Mọi người" : ""
											}
											{
												item.status === "PRIVATE" ? "Chỉ mình tôi" : ""
											}
											{
												item.status === "ONLY_DOCTOR_EXAMINATION" ? "Chỉ bác sĩ khám" : ""
											}
                                    </Text>
                                    <Text>
                                        {item.dateTime.slice(0, 10)} 
                                    </Text>
                                </SafeAreaView>
                            </Card.Title>
                            <Card.Divider />
                            <View>
								<View style={styles.action}>
									<Picker
										selectedValue={item.status}
										style={{ height: 50, width: 250 }}
										onValueChange={(itemValue, itemIndex) => handleChangeVisible(item.id,itemValue)}
									>
										{
											visibleOfMedical.map((item, index) => {
												return <Picker.Item label={item.vn} value={item.en} key={index} />
											})
										}
									</Picker>
								</View>
                                <Button
                                    // icon={<Icon name='code' color='#ffffff' />}
                                    buttonStyle={{ borderRadius: 20, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: '#25995b'}}
                                    title='Chi tiết' 
                                    onPress={() => showDialog(
                                        item.id,
										item.patient,
										item.doctor,
										item.doctorId,
										item.dateTime,
										item.symptom,
										item.dose,
										item.diagnostic,
										item.medicalExpense,
										item.note,
										item.images,
										item.status,
										item.createdAt,
										item.files
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

export default MedicalRecordScreen;

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