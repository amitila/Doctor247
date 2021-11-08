import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Grid } from '@material-ui/core';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
// import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function MRItem(props) {

	const { task, index } = props;
	const [visible, setVisible] = React.useState(task.status);

	const handleChange = (event) => {
		setVisible(event.target.value);
		props.handleChangeVisible(task.id, event.target.value);
	};

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
						{backgroundColor: "#f0edaa", margin: 8} 
						: 
						{backgroundColor: "#9dedb6", margin: 8}
				}
			>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<Grid container >
						<Grid item xs={12} sm={3}>
							<Typography style={{fontSize: 23}}>Hồ sơ số {index}</Typography>
						</Grid>
						<Grid item xs={12} sm={4}>
							<Typography style={{fontSize: 23}}>Mã nhận dạng: <b>#{task.id}</b></Typography>
						</Grid>
						<Grid item xs={12} sm={5}>
							<Typography style={{fontSize: 23}}>
								Chế độ xem: {
												visible === "PUBLIC" ? "Mọi người" : ""
											}
											{
												visible === "PRIVATE" ? "Chỉ mình tôi" : ""
											}
											{
												visible === "ONLY_DOCTOR_EXAMINATION" ? "Chỉ bác sĩ khám" : ""
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
								rowspan="11"
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
									<Box sx={{ minWidth: 120 }}>
										<FormControl variant="standard" fullWidth>
											<InputLabel id="demo-simple-select-label"><VisibilityIcon />{' '}Ai xem được</InputLabel>
											<Select
												labelId="demo-simple-select-label"
												id="visible"
												value={visible}
												label="Visible"
												onChange={handleChange}
											>
												<MenuItem value={'PUBLIC'}>Mọi người</MenuItem>
												<MenuItem value={'PRIVATE'}>Chỉ mình tôi</MenuItem>
												<MenuItem value={'ONLY_DOCTOR_EXAMINATION'}>Chỉ bác sĩ khám</MenuItem>
											</Select>
										</FormControl>
									</Box>
									{/* <Button 
										variant="outlined" 
										startIcon={<VisibilityIcon />}
										onClick={()=>alert('Chế độ xem')}
									>
										<b>Chế độ xem</b>
									</Button> */}
								</Stack>
							</th>
							<td>Họ và tên:</td>
							<td>{task.patient}</td>
						</tr>
						<tr>
							<td>Ngày khám bệnh:</td>
							<td>{getDateTime(dateTime)}</td>
						</tr>
						<tr>
							<td>Ngày trả kết quả:</td>
							<td>{getDateTime(createdAt)}</td>
						</tr>
						<tr>
							<td>Giờ khám:</td>
							<td>{getTime(dateTime)}</td>
						</tr>
						<tr>
							<td>Bác sĩ khám:</td>
							<td>{task.doctor + ' _MS:BS00' + task.doctorId}</td>
						</tr>
						<tr>
							<td>Triệu chứng ban đầu:</td>
							<td>{task.symptom}</td>
						</tr>
						<tr>
							<td>Đã chẩn đoán: </td>
							<td>{task.diagnostic ? 'Viêm gan B' : 'Viêm gan B'}</td>
						</tr>
						<tr>
							<td>Lưu ý của bác sĩ: </td>
							<td>{task.note ? 'Nên ăn sáng' : 'Nên ăn sáng'}</td>
						</tr>
						<tr>
							<td>Chi phí khám: </td>
							<td>{task.medicalExpense ? '100.000 VND' : '100.000 VND'}</td>
						</tr>
						<tr>
							<td>Ai có thể xem được:</td>
							<td>
								{
									visible === "PUBLIC" ? "Mọi người" : ""
								}
								{
									visible === "PRIVATE" ? "Chỉ mình tôi" : ""
								}
								{
									visible === "ONLY_DOCTOR_EXAMINATION" ? "Chỉ bác sĩ khám" : ""
								}
							</td>
						</tr>
						<tr>
							<td>Tài liệu khám đính kèm:</td>
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
									<td>Không có đính kèm</td>
							}
						</tr>
					</table>
				</AccordionDetails>
			</Accordion>
		</div>
	);
}