import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Grid } from '@material-ui/core';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import APIService from '../../../../utils/APIService';
import getToken from '../../../../helpers/getToken';
import PaymentIcon from '@mui/icons-material/Payment';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export default function AppointmentItem(props) {
	const onDelete = () => {
		props.onDelete(props.task.id);
	}

	const { task, index } = props;
	const images = task.images;
	const dateTime = new Date(task.dateTime);
	const createdAt = new Date(task.createdAt);
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

	const [showResult, setShowResult] = React.useState('Nhấn để thanh toán');
	const getPaymentUrl = (appointentId) => {
        const token = getToken();
        const customerIp = window.location.hostname;
        APIService.getPaymentUrl(
			token,
			{
				id: appointentId,
                customerIp: customerIp
			},
			(success, json) => {
				if (success && json.result) {
					if(json.result === true) {
					    return alert("Thanh toán THÀNH CÔNG!");
                    }
                    else {
                        window.open(json.result, '_blank');
                        return json.result;
                    }
				} else {
					setShowResult('Đã thanh toán')
					return console.log(json.error)
				}
			}
        )
    }

	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div style={{fontSize: 20}}>
			<Accordion 
				style={
					index % 2 === 0? 
						{backgroundColor: "#e3f2fd", margin: 8} 
						: 
						{backgroundColor: "#fff3e0", margin: 8}
				}
			>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<Grid container >
						<Grid item xs={12} sm={3}>
							<Typography style={{fontSize: 23}}>Lịch khám số {index}</Typography>
						</Grid>
						<Grid item xs={12} sm={4}>
							<Typography style={{fontSize: 23}}>Mã nhận dạng: <b>#{task.id}</b></Typography>
						</Grid>
						<Grid item xs={12} sm={5}>
							<Typography style={{fontSize: 23}}>
								Tình trạng lịch: 
												{
													task.status === "WAITING_PAYMENT" ? "Chờ thanh toán" : ""
												}
												{
													task.status === "PENDING" ? "Chờ khám" : ""
												}
												{
													task.status === "DOING" ? "Đang khám" : ""
												}
												{
													task.status === "DONE" ? "Hoàn thành" : ""
												}
												{
													task.status === "DOCTOR_CANCEL" ? "Bác sĩ từ chối" : ""
												}
												{
													task.status === "CUSTOMER_CANCEL" ? "Tôi đã hủy" : ""
												}
							</Typography>
						</Grid>
					</Grid>
				</AccordionSummary>
				<AccordionDetails>
					<table   style={{width: "100%", border: "1"}}>
						<tr>
							<th 
								style={{
									textAlign: 'center', 
									alignItems: 'center',
									justifyContent: 'center'
								}} 
								rowspan="9"
							>
								MÃ NHẬN DẠNG:<br/>
								{task.id}<br /><br />
								<Stack 
									style={{
										textAlign: 'center', 
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center'
									}}  
									direction="row" 
									spacing={50}
								>
									{/* <Button 
										variant="outlined" 
										startIcon={<DeleteIcon />}
										onClick={onDelete}
									>
										<b>Hủy lịch</b>
									</Button> */}
									<div>
										{
											task.status === 'WAITING_PAYMENT' || task.status === 'PENDING' ? <Button startIcon={<DeleteIcon />} variant="outlined" onClick={handleClickOpen}>
																												<b>Hủy lịch</b>
																											</Button> : null
										}
										<Dialog
											open={open}
											onClose={handleClose}
											aria-labelledby="alert-dialog-title"
											aria-describedby="alert-dialog-description"
										>
											<DialogTitle id="alert-dialog-title">
												{"Bạn chắc chắn muốn hủy lịch hẹn này chứ?"}
											</DialogTitle>
											<DialogActions>
												<Button onClick={handleClose}>Hủy bỏ</Button>
												<Button onClick={onDelete} autoFocus>
													Đồng ý
												</Button>
											</DialogActions>
										</Dialog>
									</div>
								</Stack>
							</th>
							<td>Họ và tên:</td>
							<td>{task.guardian.firstName + ' ' + task.guardian.lastName}</td>
						</tr>
						<tr>
							<td>Ngày tạo lịch khám:</td>
							<td>{getDateTime(createdAt)}</td>
						</tr>
						<tr>
							<td>Ngày được khám:</td>
							<td>{getDateTime(dateTime)}</td>
						</tr>
						<tr>
							<td>Thời gian khám:</td>
							<td>{getTime(dateTime)}</td>
						</tr>
						<tr>
							<td>Bác sĩ khám:</td>
							<td>{task.doctor.firstName + ' ' + task.doctor.lastName}</td>
						</tr>
						<tr>
							<td>Mô tả triệu chứng:</td>
							<td>{task.description}</td>
						</tr>
						<tr>
							<td>Tình trạng:</td>
							<td>
							{
								task.status === "WAITING_PAYMENT" ? "Chờ thanh toán" : ""
							}
							{
								task.status === "PENDING" ? "Chờ khám" : ""
							}
							{
								task.status === "DOING" ? "Đang khám" : ""
							}
							{
								task.status === "DONE" ? "Hoàn thành" : ""
							}
							{
								task.status === "DOCTOR_CANCEL" ? "Bác sĩ từ chối" : ""
							}
							{
								task.status === "CUSTOMER_CANCEL" ? "Tôi đã hủy" : ""
							}
							</td>
						</tr>
						<tr>
							<td>Thanh toán:</td>
							<td>
								{
									task.status === "WAITING_PAYMENT" ? 
										<Button 
											variant="outlined" 
											color="secondary"
											startIcon={<PaymentIcon />}
											onClick={()=>getPaymentUrl(task.id)}
										>
											<b>{showResult}</b>
										</Button>
									: 'Đã thanh toán'
								}	
							</td>
						</tr>
						<tr>
							<td>Hình ảnh đính kèm:</td>
							{
								images.length > 0 ? 
									<td>
										<ImageList style={{height: 300, width: 400}} sx={{ width: 500, height: 450 }} cols={2} rowHeight={164}>
											{images.map((image, index) => (
												<ImageListItem key={index}>
													<img
														src={`${image}?w=164&h=164&fit=crop&auto=format`}
														srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
														alt={index}
														loading="lazy"
													/>
												</ImageListItem>
											))}
										</ImageList>
									</td>
									:
									<td>Không kèm hình</td>
							}
						</tr>
					</table>
				</AccordionDetails>
			</Accordion>
		</div>
	);
}