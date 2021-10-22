import React from 'react';
import Button from '@material-ui/core/Button';
import { Container, Grid } from '@material-ui/core';

export default function Location(props) {
    const [location, setLocation] = React.useState('');

    const getLocation = () => {
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };
          
        const success = (pos) => {
            var crd = pos.coords;
            console.log('Your current position is:');
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`More or less ${crd.accuracy} meters.`);
            const geoApiUrl= `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${crd.latitude}&longtitude=${crd.longitude}&localityLanguage=vn`;

            fetch(geoApiUrl)
            .then(res => res.json())
            .then(data => {
                console.log(data.principalSubdivision);
                setLocation(data.principalSubdivision);
            })
        }
          
        const error = (err) => {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }
        
        navigator.geolocation.getCurrentPosition(success, error, options);
        
    }

    const onSearch = () => {
        getLocation();
        props.onSearch(location);
    }

    return (
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} >
                    <Button 
                        variant="outlined" 
                        color="secondary"
                        onClick={onSearch}
                    >
                        <b>Tra cứu khẩn cấp</b>
                    </Button> 
                    &nbsp;
                    {
                        location ? 
                            <span>Bạn đang ở <b>{location}</b>, vui lòng nhấn thêm lần nữa!</span>
                            :
                            <span>Tính năng tìm bệnh viện tại khu vực bạn đang ở</span>
                    }
                </Grid>
                <br /><br /><br />
            </Grid>
        </Container>           
    )
}
