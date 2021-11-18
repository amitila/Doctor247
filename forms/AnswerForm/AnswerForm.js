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
	Picker,
	Image, 
	SafeAreaView,
	CheckBox
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import APIService from '../../utils/APIService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card, ListItem, Avatar, CheckBox as Like } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const AnswerForm = (props) => {
	
	const [question, setQuestion] = useState(props.info);
	const [replies, setReplies] = useState([]);
	const [isHaveChange, setIsHaveChange] = useState(true);
	const [isSelected, setSelection] = useState(question.liked);

	useEffect(() => {
		if (isHaveChange) {
			AsyncStorage.getItem('token')
				.then((token) => {
					const replyList = [];
					const id = question.id;
					APIService.getPublicAnswerById(
						id,
						(success, json) => {
							if (success && json.result) {
								json.result.map(item => {
									return replyList.push(item);
								})
								return setReplies(replyList?.map(item => {
									return {
										id: item.id,
										doctorId: item.doctorId,
										questionId: item.questionId,
										updatedAt: item.updatedAt,
										doctorName: item.doctor.firstName + ' ' + item.doctor.lastName,
										doctorAvatar: item.doctor.avatarURL,
										specialized: item.specialized.name,
										specializedId: item.specializedId,
										specialityName: item.specialized.name,
										replyContent: item.content,
										liked: item.liked,
										likeCounter: item._count.answerLike,
									}
								}))
							} else {
								return console.log("THẤT BẠI");
							}
						})
				})
		}
	}, [isHaveChange])

	const getDateTime = (dmy) => {
        const dd = dmy.getDate();
        const mm = dmy.getMonth() + 1;
        const yyyy = dmy.getFullYear();
        return (dd + '/' + mm + '/' + yyyy).toString();
    }

	const handleChageLike = () => {
		const id = question.id;
		onUpdateQuestionLike(isSelected, id);
		setSelection(isSelected ? false : true)
	}

	const onUpdateQuestionLike = (mark, id) => {
        if(mark === false) {
			AsyncStorage.getItem('token')
				.then((token) => {
				APIService.putQuestionLikeById(
					token,
					id,
					(success, json) => {
						if (success && json.result) {
							setIsHaveChange(true);
							return console.log("Like THÀNH CÔNG !");
						} else {
							return console.log("Like THẤT BẠI !");
						}
					}
				)
			})
        }
        else if(mark) {
			AsyncStorage.getItem('token')
				.then((token) => {
				APIService.putQuestionUnLikeById(
					token,
					id,
					(success, json) => {
						if (success && json.result) {
							setIsHaveChange(true);
							return console.log("UnLike THÀNH CÔNG !");
						} else {
							return console.log("UnLike THẤT BẠI !");
						}
					}
				)
			})
        }
        else{
            console.log("Lỗi like");
        }
    }

	return (
		<View style={styles.container}>
			<StatusBar backgroundColor='#036ffc' barStyle="light-content" />
			<View style={styles.header}>
				<Text style={styles.text_header}></Text>
			</View>
			<Animatable.View
				animation="fadeInUpBig"
				style={styles.footer}
			>
				<ScrollView>

					<Card>
						<Card.Title>
							<SafeAreaView style={styles.containerQuestion}>
								<Text>
									Tiêu đề #{question.id}:
								</Text>
								<Text>
									{question.title}
								</Text>
							</SafeAreaView>
							<View style={styles.containerQuestion}>
								<Like
									checkedIcon={<Icon 
										name="heart" 
										color="red" 
										size={20} 
									/>}
									uncheckedIcon={<Icon 
										name="heart" 
										color="pink" 
										size={20} 
									/>}
									checked={isSelected}
									onPress={() => handleChageLike()}
								/>
							</View>
						</Card.Title>
						<Card.Divider />
						<View>
							<Text style={{ marginBottom: 10 }}>
								{question.content}
							</Text>
						</View>
						{
							question.images.map((image, index) => {
								return <Card.Image key={index} source={{uri: image}} /> 
							})
						}
					</Card>

					<View>
						<Text style={{ marginTop: 10, fontSize: 15 }}>
							Câu trả lời có sẵn
						</Text>
					</View>

					{
						replies?.map((item, i) => {
							return (
								<Card key={i}>
									<Card.Title>
										<SafeAreaView style={styles.containerQuestion}>
											<Avatar
												rounded
												source={{uri: item.doctorAvatar}}
												size="medium"
											/>
										</SafeAreaView>
										{'\n'}
										<SafeAreaView style={styles.containerQuestion}>
											<Text>
												BS.{item.doctorName}
											</Text>
											<Text>
												Mã số: BS100{item.doctorId} | {item.specialized}
											</Text>
										</SafeAreaView>
									</Card.Title>
									{/* <Card.Divider /> */}
									<Card.Divider />
										<SafeAreaView style={{alignItems: 'center', marginBottom: 5}}>
											<Text>
												Loại bệnh: {item.specialized}
											</Text>
											<Text style={{color: '#6d6e6a'}}>
												Lời khuyên bác sĩ:
											</Text>
											<Text style={{marginTop: 2, marginBottom: 2, fontSize: 16, color: '#6b1e28'}}>
												{item.replyContent}
											</Text>
											<Text style={{color: '#6d6e6a'}}>
												Cập nhật từ: {getDateTime(new Date(item.updatedAt))}
											</Text>
										</SafeAreaView>
									<Card.Divider />
									<View>
										<Button
											// icon={<Icon name='code' color='#ffffff' />}
											// onPress={()=>showBookForm(patients, doctorId)}
											buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
											title='Đặt khám' />
									</View>
								</Card>
							);
						})
					}

					<View style={styles.button}>
						<TouchableOpacity
							style={[styles.signIn, {
								borderColor: '#036ffc',
								borderWidth: 1,
								marginTop: 15
							}]}
							onPress={() => { props.onCloseComment() }}
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

export default AnswerForm;

const styles = StyleSheet.create({
	container: {
		marginTop: 10,
		flex: 1,
		backgroundColor: '#2196f3'
	},
	containerQuestion: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        paddingHorizontal: 20
    },
	header: {
		flex: 0.6,
		justifyContent: 'flex-end',
		alignItems: 'center',
		paddingHorizontal: 80,
		paddingBottom: 18
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
	}
});