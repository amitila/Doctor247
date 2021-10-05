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
								Tình trạng lịch: {
													task.status === "PENDING" ? "Chờ bác sĩ" : ""
												}
												{
													task.status === "CUSTOMER_CANCEL" ? "Đã xóa" : ""
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
								rowspan="8"
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
									<Button 
										variant="outlined" 
										startIcon={<DeleteIcon />}
										onClick={onDelete}
									>
										<b>Delete</b>
									</Button>
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
									task.status === "PENDING" ? "Chờ bác sĩ" : ""
								}
								{
									task.status === "CUSTOMER_CANCEL" ? "Đã xóa" : ""
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