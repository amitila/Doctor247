import React, { useState } from 'react';
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Badge from '@material-ui/core/Badge';

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
        width: theme.spacing(18),
        height: theme.spacing(18),
    },
}));

export default function UploadAvatar(props) {
    const classes = useStyles();
    const [url, setUrl] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');
    
    const imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setUrl(reader.result);
                // props.handleChangeAvatar(url);
                // console.log(url);
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    // const changeAvatar = (event) => {
    //     props.handleChangeAvatar(event.target.value);
    //     console.log(event);
    // }

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
                            <PhotoCamera />
                        </IconButton>
                    </label>
                }
            >
                <Avatar 
                    className={classes.large} 
                    alt="avatar" 
                    src={props.dataFromParent !=="" ? props.dataFromParent : url} 
                />
            </Badge>
            <input 
                accept="image/*" 
                className={classes.input} 
                id="icon-button-file" 
                type="file" 
                onChange={imageHandler}
            />
        </div>
    )
}
