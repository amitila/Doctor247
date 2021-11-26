import React, { useState, useEffect } from 'react';
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
	Alert,
	Picker
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Avatar } from 'react-native-elements';

const DoctorInfoForm = (props) => {

	const { infoOfDoctor } = props;

	return (
		<View style={styles.container}>
			<StatusBar backgroundColor='#036ffc' barStyle="light-content" />
			<View style={styles.header}>
				<Text style={styles.text_header}>Thông tin bác sĩ</Text>
			</View>
			<Animatable.View
				animation="fadeInUpBig"
				style={styles.footer}
			>
				<ScrollView>

					{/* Avatar */}
					<Text style={[styles.text_footer, {
							marginTop: 0,
							marginBottom: 5,
							textAlign: 'center',
					}]}>
						<Avatar
                            rounded
                            source={{uri: infoOfDoctor.avatar}}
                            size="xlarge"
                        />{'\n'}
					</Text>
					{/* Name */}{/* Id */}
					<Text style={[styles.text_footer, {
							marginTop: 0,
							marginBottom: 5,
							textAlign: 'center',
					}]}>BS.{infoOfDoctor.name} _ MS:BS100{infoOfDoctor.id}</Text>
					{/* Specialized */}
					<Text style={[styles.text_footer, {
							marginTop: 0,
							marginBottom: 5,
							textAlign: 'center',
					}]}>Chuyên khoa {infoOfDoctor.specialist}</Text>
                    {/* Introduce */}
					<Text style={[styles.text_footer, {
							marginTop: 0,
							marginBottom: 5,
							textAlign: 'center',
					}]}>
						<Text style={{fontWeight: 'bold'}}>Giới thiệu</Text> {'\n'}
						{
							infoOfDoctor.introduce ? infoOfDoctor.introduce.map((item, index) => {
								return <Text key={index}>{`- ${item}`}<br/></Text>
							}) : <Text>Đang cập nhật</Text>
						}
					</Text>
                    {/* Work hours */}
					<Text style={[styles.text_footer, {
							marginTop: 0,
							marginBottom: 5,
							textAlign: 'center',
					}]}>
						<Text style={{fontWeight: 'bold'}}>Giờ làm việc</Text> {'\n'}
						{
                                infoOfDoctor.operations ? infoOfDoctor.operations.map((item, index) => {
                                    return <Text key={index}>{'\n'}
                                                <Text>{`${index+1}. Tại ${item.workplace} : `}</Text>{'\n'}
                                                {
                                                    item.operationHours ? item.operationHours.map((ytem, yndex) => {
                                                        return <Text key={yndex}>{'\n'}
                                                            {`- ${ytem.weekday} : ${ytem.startHour} - ${ytem.endHour}`}{'\n'}
                                                        </Text>
                                                    }) : <Text>Không có</Text>
                                                }
												{'\n'}
                                                {`*Ghi chú: Mỗi giờ chỉ nhận tối đa ${item.patientPerHalfHour} bệnh nhân `}{'\n'}
                                            </Text>
                                }) : <Text>Đang cập nhật</Text>
                            }
					</Text>
                    {/* Work history */}
					<Text style={[styles.text_footer, {
							marginTop: 0,
							marginBottom: 5,
							textAlign: 'center',
					}]}>
						<Text style={{fontWeight: 'bold'}}>Quá trình công tác</Text> {'\n'}
						{
							infoOfDoctor.workHistory ? infoOfDoctor.workHistory.map((item, index) => {
								return <Text key={index}>{`- ${item}`}<br/></Text>
							}) : <Text>Đang cập nhật</Text>
						}
					</Text>
                    {/* Treatment */}
					<Text style={[styles.text_footer, {
							marginTop: 0,
							marginBottom: 5,
							textAlign: 'center',
					}]}>
						<Text style={{fontWeight: 'bold'}}>Chuyên chữa và điều trị</Text> {'\n'}
						{
							infoOfDoctor.medicalExamination ? infoOfDoctor.medicalExamination.map((item, index) => {
								return <Text key={index}>{`- ${item}`}<br/></Text>
							}) : <Text>Đang cập nhật</Text>
						}
					</Text>
                    {/* Workplace */}
					<Text style={[styles.text_footer, {
							marginTop: 0,
							marginBottom: 5,
							textAlign: 'center',
					}]}>
						<Text style={{fontWeight: 'bold'}}>Nơi làm việc</Text> {'\n'}
						{
							infoOfDoctor.operations ? infoOfDoctor.operations.map((item, index) => {
								return <Text key={index}>{'\n'}
											<Text>{`${index+1}. ${item.workplace} : `}</Text>{'\n'}
											{`  - Liên lạc: ${item.workplaceContact ? item.workplaceContact : 'Chưa cập nhật'}`}{'\n'}
											{`  - Địa chỉ: ${item.workplaceAddress}`}{'\n'}
										</Text>
							}) : <Text>Đang cập nhật</Text>
						}
					</Text>
                    {/* Image */}
					<Text style={[styles.text_footer, {
							marginTop: 0,
							marginBottom: 5,
							textAlign: 'center',
					}]}>
						<Text style={{fontWeight: 'bold'}}>Hình ảnh bác sĩ</Text> {'\n'}
						<Avatar
                            // rounded
                            source={{uri: infoOfDoctor.avatar}}
                            size="xlarge"
                        />
					</Text>

					<View style={styles.button}>
						<TouchableOpacity
							style={[styles.signIn, {
								borderColor: '#036ffc',
								borderWidth: 1,
								marginTop: 15
							}]}
							onPress={() => { props.onClose() }}
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

export default DoctorInfoForm;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#2196f3'
	},
	header: {
		flex: 0.6,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 0,
		paddingBottom: 0
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
	},
	datePickerStyle: {
		width: 250,
		marginTop: 20,
	},
	avatar: {
		flexDirection: 'column',
		marginTop: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#f2f2f2',
		paddingBottom: 5,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 50,
	},
	images: {
		flexDirection: 'row',
	},
	containerDateTime: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center',
		padding: 50,
	},
	pickedDateContainer: {
		padding: 20,
		backgroundColor: '#eee',
		borderRadius: 10,
	},
	pickedDate: {
		fontSize: 18,
		color: 'black',
	},
	btnContainer: {
		padding: 30,
	},
	// This only works on iOS
	datePicker: {
		width: 320,
		height: 260,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'flex-start',
	},
});