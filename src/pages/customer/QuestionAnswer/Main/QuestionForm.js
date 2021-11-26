import React, { useEffect } from 'react';
import { makeStyles, TextareaAutosize, TextField } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';
import { DropzoneArea } from 'material-ui-dropzone';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    textSize: {
        width: '100%',
		padding: 10
    },
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: '100%',
        margin: "auto",
        border: "#303F9F solid 5px",
        borderRadius: 5,
        padding: '10px',
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: 'orange',
    },
    title: {
        textAlign: "center",
    },
    dropzone: {
        heigh: "5px",
    },
    stretch: {
        marginTop: "10px",
    },
	clear: {
		backgroundColor: 'orange',
		color: 'white',
		"&:hover": {
			backgroundColor: 'orange',
		}
	}
}));

export default function QuestionForm(props) {
	const flag = props.task ? {
		id : props.task.id,
		title : props.task.title,
		content : props.task.content,
		images: [],
		imagesView: props.task.images
	} : {
		id : '',
		title : '',
		content : '',
		images: [],
		imagesView: ''
	};
	
	const classes = useStyles();
	const [state, setState] = React.useState(flag);
	
	useEffect(() => {
		if(props && props.task){
			setState({
				id : props.task.id,
				title : props.task.title,
				content : props.task.content,
				images: [],
				imagesView: props.task.images
			});
		}else if(!props.task){
			setState({
				id : '',
				title : '',
				content : '',
				images: [],
				imagesView: []
			});
		}
	},[props]);

	const onCloseForm = (event) => {
		props.onCloseForm();
	}

	const onChange = (event) => {
		let target = event.target;
		let name = target.name;
		let value = target.value;
		// if(name === 'status') {
		// 	value = target.value === 'true' ? true : false;
		// }
		setState(prevState => ({...prevState, [name]: value}));
	}

	const onSubmit = (event) => {
		event.preventDefault();
		console.log('state');
		console.log(state);
		props.onSubmit(state);
		//Clear and Close form
		onClear();
		onCloseForm();
	}

	const onClear = () => {
		setState({
			id : '',
			title : '',
			content : '',
			images: [],
			imagesView: []
		});
	}

	const handleChangeFile = (files) => {
		console.log('state.images');
		files.forEach((file) => {
            state.images.push(file);
        });
		console.log(state.images);
		// setState({...state, images: files});
	}

	return (
		<div className="panel panel-warning">
			<div className="panel-heading">
				<h3 className="panel-title">
					{state.id !== '' ? 'Chỉnh sửa  ' : 'Tạo câu hỏi  '}
					<span onClick={onCloseForm} >
						<CloseIcon />Đóng
					</span>
					
				</h3>
			</div>
			<div className={classes.paper} >
				<form className={classes.form} onSubmit={onSubmit} >
					<Typography variant="h6" className={classes.title} >
						Đặt câu hỏi cho bác sĩ (miễn phí)
					</Typography>
					<TextField
						variant="standard"
						margin="normal"
						required
						fullWidth
						id="title"
						name="title"
						value={state.title}
						onChange={onChange}
						label="Tiêu đề"
					/>
					<Typography paragraph className={classes.stretch} >
						Trình bày thông tin bao gồm:<br />
						1. Giới tính <br />
						2. Tuổi tác <br />
						3. Triệu chứng xuất hiện <br />
						4. Đã xử lý ra sao <br />
						5. Hình ảnh kèm theo (tối đa 3 ảnh nếu có)
					</Typography>
					<TextareaAutosize
						className={classes.textSize}
						required
						id="content"
						name="content"
						value={state.content}
						onChange={onChange}
						minRows={5}
						placeholder="Vui lòng trình bày đủ thông tin như hướng dẫn trên để bác sĩ có đủ thông tin và việc hồi đáp sẽ chính xác hơn"
					>
						
					</TextareaAutosize>
					<DropzoneArea
						className={classes.dropzone}
						filesLimit={3}
						acceptedFiles={['image/*']}
						dropzoneText={"Kéo ảnh thả vào hay nhấp vào để tải ảnh lên"}
						onChange={handleChangeFile}
						showAlerts={false}
						showFileNames={false}
					/>
					<div className="text-center">
						<Button
							type="submit"
							variant="contained"
							color="primary"
						>
							Đăng câu hỏi 
						</Button>
						&nbsp;
						<Button
							className={classes.clear}
							type="button"
							variant="contained"
							onClick={onClear}
						>
							Điền lại
						</Button>
						&nbsp;
						<Button
							variant="contained"
							color="secondary"
							onClick={onCloseForm}
						>
							Đóng
						</Button>
					</div>
				</form>
        	</div>
		</div>
	);

}

