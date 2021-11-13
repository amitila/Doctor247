import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
// import DialogForm from './DialogForm';
import APIService from '../../../../utils/APIService';
import getToken from '../../../../helpers/getToken';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		'& > *': {
			margin: theme.spacing(1),
		},
		width: '100%'
	},
	media: {
		height: 100,
		paddingTop: '50%', // 16:9
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	avatar: {
		backgroundColor: red[500],
	},
	appBar: {
		position: 'relative',
		backgroundColor: 'orange',
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1,
	},
}));

export default function AnswerCard(props) {
	const classes = useStyles();
	const history = useHistory();

	const {reply} = props;

	const [anchorEl, setAnchorEl] = React.useState(null);
    const openAnchor = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleAnchor = () => {
        setAnchorEl(null);
    };

	const [mark, setMark] = React.useState(reply.liked);
	const [likeCounter, setLikeCounter] = React.useState(reply.likeCounter);

	const handleCountLike = () => {
        onUpdateLike(mark, reply.id);
		setMark(mark ? false : true)
		setLikeCounter(mark ? likeCounter - 1 : likeCounter + 1)
    }

	const onUpdateLike = (mark, id) => {
        const token = getToken();
        if(mark === false) {
            APIService.putAnswerLikeById(
                token,
                id,
                (success, json) => {
                    if (success && json.result) {
                        // setIsHaveChange(true);
                        return console.log("Like THÀNH CÔNG !");
                    } else {
                        return console.log("Like THẤT BẠI !");
                    }
                }
            )
        }
        else if(mark) {
            APIService.putAnswerUnLikeById(
                token,
                id,
                (success, json) => {
                    if (success && json.result) {
                        // setIsHaveChange(true);
                        return console.log("UnLike THÀNH CÔNG !");
                    } else {
                        return console.log("UnLike THẤT BẠI !");
                    }
                }
            )
        }
        else{
            console.log("Lỗi like");
        }
    }

	return (
		<div className={classes.root}>
			<Card>
				<CardHeader
					avatar={
						<Avatar alt="avatar" src={reply.doctorAvatar} loading="lazy" />
					}
					action={
						<div>
							<IconButton
								id="fade-button"
								aria-controls="fade-menu"
								aria-haspopup="true"
								aria-expanded={openAnchor ? 'true' : undefined}
								onClick={handleClick}
							>
								<MoreVertIcon />
							</IconButton>
							<Menu
								id="menu"
								style={{height: 400, display:"flex"}}
								MenuListProps={{
								'aria-labelledby': 'fade-button',
								}}
								anchorEl={anchorEl}
								open={openAnchor}
								onClose={handleAnchor}
							>
								<MenuItem onClick={handleAnchor}>Thông tin bác sĩ</MenuItem>
								<MenuItem onClick={handleAnchor}>Đặt lịch khám</MenuItem>
								<MenuItem onClick={handleAnchor}>Chat với bác sĩ</MenuItem>
								<MenuItem onClick={handleAnchor}>Theo dõi</MenuItem>
							</Menu>
						</div>
					}
					title={'BS.' + reply.doctorName} //"BS.Phạm Văn Tâm "
					subheader={"Chuyên khoa " + reply.specialized} //"Chuyên khoa truyền nhiễm"
				/>
				<CardContent className={classes.content}>
						<Typography variant="h6" component="h6">
							{"Loại bệnh: " + reply.specialityName}
						</Typography>
						<Typography >
							{reply.replyContent}
						</Typography>
						<br />
						<Typography >
							{ 'Đã trả lời vào ngày: ' + reply.updatedAt.slice(0,10)}
						</Typography>
				</CardContent>
				<CardActions disableSpacing>
					<IconButton aria-label="add to favorites">
						<FormControlLabel
							onClick={handleCountLike}
							control={<Checkbox 
										icon={<FavoriteIcon />} 
										checkedIcon={<FavoriteIcon />} 
										name="checkedH" 
										checked={mark ? true : false}
									/>}
							label={likeCounter + " Cảm ơn"}
						/>
					</IconButton>
					<IconButton
						className={clsx(classes.expand)}
					>
						<Button variant="contained" color="primary" onClick={()=>history.push("/appointment")} >
							Đặt khám
						</Button>
						{/* <IconButton aria-label="share">
							<DialogForm name={reply.doctorName} id={reply.doctorId}/>
						</IconButton> */}
					</IconButton>
				</CardActions>
			</Card>
		</div>
	);
}
