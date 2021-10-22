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
    const [url, setUrl] = useState(props.avatar);
    const [flag, setFlag] = useState(0);

    // ***Here is the code for converting "image source" (url) to "Base64".***
    const toDataURL = url => fetch(url)
        .then(response => response.blob())
        .then(blob => new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result)
            reader.onerror = reject
            reader.readAsDataURL(blob)
        }))

    // ***Here is code for converting "Base64" to javascript "File Object".***
    // const dataURLtoFile = (dataurl, filename) => {
    //     var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    //         bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    //     while (n--) {
    //         u8arr[n] = bstr.charCodeAt(n);
    //     }
    //     return new File([u8arr], filename, { type: mime });
    // }

    if (flag === 0) {
        toDataURL(props.avatar ? props.avatar : url)
            .then(dataUrl => {
                setUrl(dataUrl);
                // const fileData = dataURLtoFile(dataUrl, "imageName.jpg");
                // props.handleChangeAvatar('', fileData);
                // return console.log(url);
            })
    }

    const imageHandler = (e) => {
        const temp = e.target.value.split('fakepath\\');
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setUrl(reader.result)
                console.log("url")
                console.log(url)
            }
        }
        reader.readAsDataURL(e.target.files[0]);
        const view = '/images/' + temp[1];
        const send = e.currentTarget.files[0];
        props.handleChangeAvatar(view, send);
        setFlag(1);
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
                            <PhotoCamera />
                        </IconButton>
                    </label>
                }
            >
                <Avatar className={classes.large} alt="avatar" src={url} />
            </Badge>
            <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={imageHandler} />
        </div>
    )
}
