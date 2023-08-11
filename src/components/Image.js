import React, { useState } from 'react';

const CustomImage = ({image, ...props}) => {
    const [imageURL, setImageURl] = useState()

    if (image) {
        const reader = new FileReader();
        reader.readAsDataURL(image)
        reader.onloadend = () => {
            setImageURl(reader.result)
        };
    }

    return (
        <img src={imageURL} {...props} alt=''></img>
    )
}

export default CustomImage;
