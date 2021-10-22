
const getLocation = () => {

    var location = [];

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
            location.push({
                lat: data.latitude,
                long: data.longitude,
                district: data.locality,
                province: data.principalSubdivision
            });
            return location;
        })
    }
      
    const error = (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    
    navigator.geolocation.getCurrentPosition(success, error, options);

}

export default getLocation;