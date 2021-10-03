import * as React from 'react';
import { CardMedia } from '@material-ui/core';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function AppointmentItem(props) {
	const onDelete = () => {
		props.onDelete(props.task.id);
	}

	const onUpdate = () => {
		props.onUpdate(props.task.id);
	}

	const { task, index } = props;
	const images = task.images;
	return (
		<div>
			<Accordion style={{margin: 8}}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<Typography>Thẻ mã số {index}</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						Họ và tên: {task.name}
						<br />
						Ngày đăng ký: {task.date}
						<br />
						Thời gian khám: {task.hour}
						<br />
						Bác sĩ khám: {task.doctor}
						<br />
						Mô tả triệu chứng: {task.symptom}
						<br />
						Hình ảnh đính kèm:
						{
							images ? images.map(image => {
								return <CardMedia
									component="img"
									height={task.images.length === 1 ? 600 : 300}
									image={image}
									alt="Ảnh đính kèm"
								/>
							}) : ''
						}
						<br />
						<button
							type="button"
							className="btn btn-warning"
							onClick={onUpdate}
						>
							<span className="fa fa-pencil mr-5"></span>Chỉnh sửa
						</button>
						&nbsp;
						<button
							type="button"
							className="btn btn-danger"
							onClick={onDelete}
						>
							<span className="fa fa-trash mr-5"></span>Xóa lịch hẹn
						</button>
					</Typography>
				</AccordionDetails>
			</Accordion>
		</div>
	);
}