import * as React from 'react';
import { Helmet } from 'react-helmet';
import {
	Box,
	Container,
	Typography
} from '@material-ui/core';
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import APIService from '../utils/APIService';
// import { addRoom } from '../firebase/service';
// import getToken from '../helpers/getToken';
// import useFirestore from '../firebase/useFirestore';

// const token = getToken();
// var myId = 0;
// APIService.getProfile(token, (success, json) => {
// 	if (success && json.result) {
// 		console.log('json.result.id')
// 		console.log(json.result.id)
// 		myId = json.result.id;
// 	}
// })

export default function PaymentResult () {
	const history = useHistory();
	const [result, setResult] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(true);
	// const [doctorIdList, setDoctorIdList] = React.useState([]);

	// console.log(window.location.href)
	var paymentUrl = window.location.href;
	const from = paymentUrl.indexOf("?");
	paymentUrl = paymentUrl.slice(from + 1).split('&')
	// console.log(paymentUrl)
	// console.log(paymentUrl[0])
	// console.log((paymentUrl[0].split('='))[0])
	// console.log((paymentUrl[0].split('='))[1])
	const elmPaymentUrl = paymentUrl?.map(item => {
		return item.split('=')[1]
	})
	// console.log(elmPaymentUrl)

	React.useEffect(() => {
		// console.log(elmPaymentUrl[0])
		APIService.getConfirmPayment(
			{
				vnp_Amount : elmPaymentUrl[0],
				vnp_BankCode : elmPaymentUrl[1],
				vnp_BankTranNo : elmPaymentUrl[2],
				vnp_CardType : elmPaymentUrl[3],
				vnp_OrderInfo : elmPaymentUrl[4],
				vnp_PayDate : elmPaymentUrl[5],
				vnp_ResponseCode : elmPaymentUrl[6],
				vnp_TmnCode : elmPaymentUrl[7],
				vnp_TransactionNo : elmPaymentUrl[8],
				vnp_TransactionStatus : elmPaymentUrl[9],
				vnp_TxnRef : elmPaymentUrl[10],
				vnp_SecureHash : elmPaymentUrl[11]
			},
			(success, json) => {
				setIsLoading(false)
				if (success && json.result) {
                    console.log(json.result)
					setResult(true)
					return console.log('Thanh toán thành công')
				} else {
					return console.log(json.error)
				}
			}
        )
	},[])

	// const roomsCondition = React.useMemo(() => {
    //     return {
    //         fieldName: 'members',
    //         operator: 'array-contains',
    //         compareValue: myId
    //     }
    // }, [])
	// const rooms = useFirestore('rooms', roomsCondition);

	// React.useEffect(() => {
	// 	const token = getToken();
	// 	if (result) {
	// 		APIService.getAppointment(token, {}, (success, json) => {
	// 			if (success && json.result) {
	// 				let list = [];
	// 				let listDoctor = [];
	// 				list = json.result.filter(element => element.status !== 'WAITING_PAYMENT');
	// 				list = list.filter(element => element.status !== 'CUSTOMER_CANCEL');
	// 				list.forEach(element => {
	// 					listDoctor.push(element.doctor.userId.toString());
	// 				});
	// 				listDoctor = listDoctor.filter((item, index) => listDoctor.indexOf(item) === index);
	// 				setDoctorIdList(listDoctor);
	// 			}
	// 		});
	// 	}
	// }, [result])

	// React.useEffect(() => {
	// 	if (myId !== 0) {
	// 		doctorIdList.forEach(doctorId => {
	// 			if (rooms === undefined || rooms === null) {
	// 				addRoom(doctorId, myId);
	// 			}
	// 			else if (rooms.find(room => room.members.indexOf(doctorId) > -1) === undefined) {
	// 				addRoom(doctorId, myId);
	// 			}
	// 		});
	// 	}
	// }, [doctorIdList, rooms])

	return(
		<>
			<Helmet>
				<title>Kết quả thanh toán | Doctor247</title>
			</Helmet>
			<Box
				sx={{
					backgroundColor: 'background.default',
					display: 'flex',
					flexDirection: 'column',
					height: '100%',
					justifyContent: 'center'
				}}
			>
				<Container maxWidth="md">
					<Typography
						align="center"
						color="textPrimary"
						variant="h6"
					>
						Kết quả thanh toán
					</Typography>
					{
						!isLoading && result ? <Box sx={{ textAlign: 'center', marginBottom: 20 }}>
									<img
										alt="paymentResult"
										src="/paymentSuccess.jpg"
										style={{
											marginTop: 50,
											display: 'inline-block',
											maxWidth: '100%',
											width: 560
										}}
									/>
								</Box> 
								:
								!isLoading && !result ?<div>
															<Typography
																align="center"
																color="textPrimary"
																variant="h4"
																style={{color: 'red'}}
															>
																Có thể xảy ra lỗi do số dư của bạn đã biến động. Vui lòng thanh toán lại!
															</Typography>
															<Box sx={{ textAlign: 'center', marginBottom: 20 }}>
																<img
																	alt="paymentResult"
																	src="/paymentFail.jpg"
																	style={{
																		marginTop: 50,
																		display: 'inline-block',
																		maxWidth: '100%',
																		width: 560
																	}}
																/>
															</Box>
														</div> :
														<Box sx={{ textAlign: 'center', marginBottom: 20 }}>
															<Typography
																align="center"
																color="textPrimary"
																variant="h3"
															>
																Đang lấy kết quả...
															</Typography>
														</Box>
					}
					
					<Button
						fullWidth
						variant="contained"
						color="primary"
						onClick={()=>history.push("/home")}
						style={{marginBottom: 15}}
					>
						Về trang chủ
					</Button>
				</Container>
			</Box>
		</>
	)
};

