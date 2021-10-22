const deg2rad = (deg) => {
    return (deg * Math.PI) / 180.0;
}

const rad2deg = (rad) => {
    return (rad * 180.0) / Math.PI;
}

var outputFrom = [];
var outputTo = [];

const createDistance = (addressFrom, addressTo, unit) => {
    var apiKey = '6262cd7954814e1da60e9aa2a27555c0';
    
    var geocodeFrom = `https://api.opencagedata.com/geocode/v1/json?q=${addressFrom}&key=${apiKey}&language=en&pretty=1`;
    fetch(geocodeFrom)
        .then(res => res.json())
        .then(data => {
            console.log(data.results);
            return outputFrom.push({
                lat: data.results[0].geometry.lat,
                lng: data.results[0].geometry.lng,
            });
        })

    var geocodeTo = `https://api.opencagedata.com/geocode/v1/json?q=${addressTo}&key=${apiKey}&language=en&pretty=1`;
    fetch(geocodeTo)
        .then(res => res.json())
        .then(data => {
            console.log(data.results);
            return outputTo.push({
                lat: data.results[0].geometry.lat,
                lng: data.results[0].geometry.lng,
            })
        })

    var latitudeFrom = outputFrom[0]?.lat;
    var longitudeFrom = outputFrom[0]?.lng;
    var latitudeTo = outputTo[0]?.lat;
    var longitudeTo = outputTo[0]?.lng;

    var theta = longitudeFrom - longitudeTo;
    var dist = Math.sin(deg2rad(latitudeFrom)) * Math.sin(deg2rad(latitudeTo)) + Math.cos(deg2rad(latitudeFrom)) * Math.cos(deg2rad(latitudeTo)) * Math.cos(deg2rad(theta))
    dist = Math.acos(dist);
    dist = rad2deg(dist);
    var miles = dist * 60 * 1.1515;

    unit = unit.toUpperCase();
    if(unit === 'K') {
        return (miles * 1.609344).toFixed(2);   
    }
    else if(unit === 'M') {
        return (miles * 1609.344).toFixed(2);   
    } 
    else {
        return miles.toFixed(2);   
    }

}

const getDistance = () => {
    var addressFrom = 'Đông Hòa, Phú Yên';
    var addressTo = 'Sông Hinh, Phú Yên';
    var distance = createDistance(addressFrom, addressTo, 'K');
    console.log(distance);
    return distance;
}
 
export default getDistance;