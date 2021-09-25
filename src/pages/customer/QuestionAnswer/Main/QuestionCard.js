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
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from 'react-bootstrap/esm/Button';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

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
    box: {
        marginTop: '5px',
        marginLeft: '5px'
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
    const [expanded, setExpanded] = React.useState(false);
    const [comments, setComments] = React.useState([]);
    const [value, setValue] = React.useState('');

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleChangeText = (e) => {
        setValue(e.target.value);
    }

    const handleChangeComment = (e) => {
        var elmComment = <Grid container spacing={2}>
            <Grid item xs={12} sm={3} >
                Bé Chó:
            </Grid>
            <Grid item xs={12} sm={9} >
                {value}
            </Grid>
        </Grid>;
        setComments(prevComment => [...prevComment, elmComment]);
        setValue('');
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const date = new Date();
    const currentTime = date.getHours() +':'+ date.getMinutes() +'  '+ date.getDate() +'/'+ (date.getMonth() + 1) +'/'+ date.getFullYear() ;

    const {task} = props;

    const onDelete = () => {
        props.onDelete(props.task.id);
        handleClose();
    }

    const onUpdate = () => {
        props.onUpdate(props.task.id);
        handleClose();
    }


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
                            <MenuItem onClick={handleClose}>Lưu bài</MenuItem>
                        </Menu>
                   </div>
                }
                title={<b>CÂU HỎI</b>}
                subheader={currentTime}
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
                        control={<Checkbox icon={<FavoriteIcon />} checkedIcon={<FavoriteIcon />} name="checkedH" />}
                        label=""
                    />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
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
                            return <Box className={classes.box} sx={{ p: 2, border: '1px dashed grey' }}>
                                {comment}
                            </Box>
                        })}
                    </Typography>
                    <TextareaAutosize
                        className={classes.textSize}
                        value={value}
                        onChange={handleChangeText}
                        minRows={3}
                        placeholder="Trả lời"
                    ></TextareaAutosize>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={value ? handleChangeComment : null}
                    >
                        Trả lời
                    </Button>
                </CardContent>
            </Collapse>
        </Card>
    );
}
