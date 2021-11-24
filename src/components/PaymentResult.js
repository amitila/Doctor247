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

export default function PaymentResult () {
	const history = useHistory();
	const [result, setResult] = React.useState(false);

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
		console.log(elmPaymentUrl[0])
		APIService.getConfirmPayment(
			{
				vnp_Amount : elmPaymentUrl[0].toString(),
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
						result ? <Box sx={{ textAlign: 'center', marginBottom: 20 }}>
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

