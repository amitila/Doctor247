const deg2rad = (deg) => {
    return (deg * Math.PI) / 180.0;
}

const rad2deg = (rad) => {
    return (rad * 180.0) / Math.PI;
}

var result = null;
var latitudeFrom = null, longitudeFrom = null;
const getDistanceFromCurrent = (latitudeTo, longitudeTo) => {

    function getLocationFrom() {
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        const success = (pos) => {
            var crd = pos.coords;
            latitudeFrom = crd.latitude;
            longitudeFrom = crd.longitude;
            return "ami";
        }

        const error = (err) => {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }

        navigator.geolocation.getCurrentPosition(success, error, options);
    }

    function getMath() {
        getLocationFrom();
        if (latitudeFrom && longitudeFrom && latitudeTo && longitudeTo) {
            var theta = longitudeFrom - longitudeTo;
            var dist = Math.sin(deg2rad(latitudeFrom)) * Math.sin(deg2rad(latitudeTo)) + Math.cos(deg2rad(latitudeFrom)) * Math.cos(deg2rad(latitudeTo)) * Math.cos(deg2rad(theta))
            dist = Math.acos(dist);
            dist = rad2deg(dist);
            var miles = dist * 60 * 1.1515;
            result = (miles * 1.609344).toFixed(2);
            console.log('result')
            console.log(result)
            return result;
        }
    }

    return getMath();
}

export const getMath = (latitudeFrom, longitudeFrom, latitudeTo, longitudeTo) => {
    if (latitudeFrom && longitudeFrom && latitudeTo && longitudeTo) {
        var theta = longitudeFrom - longitudeTo;
        var dist = Math.sin(deg2rad(latitudeFrom)) * Math.sin(deg2rad(latitudeTo)) + Math.cos(deg2rad(latitudeFrom)) * Math.cos(deg2rad(latitudeTo)) * Math.cos(deg2rad(theta))
        dist = Math.acos(dist);
        dist = rad2deg(dist);
        var miles = dist * 60 * 1.1515;
        result = (miles * 1.609344).toFixed(2);
        return result;
    }
}

export default getDistanceFromCurrent;