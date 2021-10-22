import React, { useState } from 'react';
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Badge from '@material-ui/core/Badge';
import CloseIcon from '@mui/icons-material/Close';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
    large: {
        width: theme.spacing(9),
        height: theme.spacing(9),
    },
}));

export default function UploadImage(props) {
    const classes = useStyles();
    const [url, setUrl] = useState('/imageUpload.jpg');
    const imageHandler = (e) => {
        const temp = e.target.value.split('fakepath\\');
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setUrl(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0]);
        const view = '/images/' + temp[1];
        const send = e.currentTarget.files[0];
        props.handleChangeImages(view, send);
    }
    
    return (
        <div className={classes.root}>
            <Badge
                overlap="circular"
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                badgeContent={
                    <label htmlFor="icon-button-file">
                        <IconButton color="primary" aria-label="upload picture" component="span">
                        {
                            props.number === 0 ? 
                                <CloseIcon /> 
                                : 
                                <PhotoCamera />
                        } 
                        </IconButton>
                    </label>
                }
            >
                <Avatar className={classes.large} alt="image" src={url} variant='square' />
            </Badge>
            {
                props.number === 0 ? '' 
                    : 
                    <input 
                        accept="image/*" 
                        className={classes.input} 
                        id="icon-button-file" 
                        type="file" 
                        onChange={imageHandler} 
                    />
            } 
        </div>
    )
}
