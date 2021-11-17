import * as React from 'react';
import { makeStyles, TextareaAutosize } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from 'react-bootstrap/esm/Button';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { TextField } from '@material-ui/core';
import AnswerCard from './AnswerCard';
import ShareBoard from './ShareBoard';
import { useSelector } from "react-redux";
import { selectRole } from '../../../../store/userSlice';
import APIService from '../../../../utils/APIService';
 
const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const useStyles = makeStyles((theme) => ({
    textSize: {
        width: '100%',
        marginTop: '10px'
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: 'orange',
    },
    title: {
        textAlign: "center",
        color: "#0320fc",
    },
    boxImage: {
        width: '400px',
        heigth: '400px',
    },
    card: {
        border: "3px solid orange",
    }
}));


export default function QuestionCard(props) {
    const classes = useStyles();
    const {task} = props;
    const [isHaveChange, setIsHaveChange] = React.useState(false);
    const [expanded, setExpanded] = React.useState(false);
    const [replies, setReplies] = React.useState([]);
    const [comments, setComments] = React.useState([]);
    const [state, setState] = React.useState({
        specialityName: '',
        replyContent: '',
        likeCounter: props.task.questionLike,
        mark: task.liked
    });

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const onChange = (event) => {
		let target = event.target;
		let name = target.name;
		let value = target.value;
		// if(name === 'status') {
		// 	value = target.value === 'true' ? true : false;
		// }
		setState(prevState => ({...prevState, [name]: value}));
	}

    React.useEffect(() => {
        const replyList = [];
        const id = task.id;
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
        if(isHaveChange === false) {
            replies.map(reply => {
                var elmComment = <Grid container spacing={2}>
                    <AnswerCard  
                        reply={reply}
                    />
                </Grid>;
                setComments(prevComment => [...prevComment, elmComment]);
                return setIsHaveChange(true)
            }) 
        }
    },[isHaveChange, replies, task.id])

    const handleChangeComment = (e) => {
        var elmComment = <Grid container spacing={2}>
            <AnswerCard  
                state={state}
            />
        </Grid>;
        setComments(prevComment => [...prevComment, elmComment]);
        setState({...state,
            specialityName: '',
            replyContent: '',
        });
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // const date = new Date();
    // const currentTime = date.getHours() +':'+ date.getMinutes() +'  '+ date.getDate() +'/'+ (date.getMonth() + 1) +'/'+ date.getFullYear() ;

    const onDelete = () => {
        props.onDelete(props.task.id);
        handleClose();
    }

    const onUpdate = () => {
        props.onUpdate(props.task.id);
        handleClose();
    }

    const onSave = () => {
        props.onSave(props.task.id);
        handleClose();
    }

    const handleCountLike = () => {
        props.onUpdateLike(state.mark, props.task.id);
        setState({
            ...state, 
            likeCounter: state.mark ? state.likeCounter - 1 : state.likeCounter + 1,
            mark: state.mark ? false : true
        });
    }

    const role = useSelector(selectRole);

    return (
        <Card sx={{ maxWidth: 400 }} className={classes.card} >
            <CardHeader
                avatar={
                    <Avatar 
                        src="https://png.pngtree.com/element_our/20190523/ourlarge/pngtree-cute-boy-questioning-question-image_1082181.jpg" 
                        sx={{ bgcolor: red[500] }} 
                        aria-label="recipe"
                    />
                }
                action={
                    <div>
                        <IconButton
                            id="fade-button"
                            aria-controls="fade-menu"
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
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
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={onUpdate}>Chỉnh sửa</MenuItem>
                            <MenuItem onClick={onDelete}>Xóa bài</MenuItem>
                            {
                                task.saved ? <MenuItem>Bài đã lưu</MenuItem>
                                            :<MenuItem onClick={onSave}>Lưu bài</MenuItem>
                            }
                            
                        </Menu>
                   </div>
                }
                title={<b>CÂU HỎI</b>}
                subheader={task.updatedAt?.slice(0,10)}
            />
            <Typography variant="h5" className={classes.title} >
                <b>{task.title}</b>
            </Typography>
            <Box className={classes.boxImage} >
                {
                    task.images ? task.images.map((image) => {
                        return<CardMedia
                            style={{border: "1px solid white"}}
                            component="img"
                            height={task.images.length === 1 ? 250 : 150}
                            image={image}
                            alt="Ảnh đính kèm"
                        />
                    }): ''
                }
            </Box>
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                   {task.content}
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
                                    checked={state.mark ? true : false}
                                />}
                        label={state.likeCounter}
                    />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareBoard id={task.id} />
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    {expanded ? "" : <b>GIẢI ĐÁP</b>} <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Câu trả lời có sẵn</Typography>
                    <Typography>
                        {comments.map((comment) => {
                            return <Box sx={{ p: 1 }}>
                                {comment}
                            </Box>
                        })}
                    </Typography>
                    {
                        role === 'DOCTOR' ?
                            <form>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="specialityName"
                                    name="specialityName"
                                    value={state.specialityName}
                                    onChange={onChange}
                                    label="Bệnh thuộc chuyên khoa"
                                />
                                <TextareaAutosize
                                    id="replyContent"
                                    name="replyContent"
                                    className={classes.textSize}
                                    value={state.replyContent}
                                    onChange={onChange}
                                    minRows={3}
                                    placeholder="Trả lời"
                                ></TextareaAutosize>
                                <Button
                                    type="button"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={state.replyContent ? handleChangeComment : null}
                                >
                                    Trả lời
                                </Button>
                            </form>
                            : ''
                    }
                </CardContent>
            </Collapse>
        </Card>
    );
}
