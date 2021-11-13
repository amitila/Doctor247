// is TODAY ? true : false
const isToday = (selectedDate) => {
    var now = new Date();
    var date = new Date(selectedDate);

    var monthNow = now.getMonth() + 1; //months from 1-12
    var dayNow = now.getDate();
    var yearNow = now.getFullYear();
    
    var monthDate = date.getMonth() + 1; //months from 1-12
    var dayDate = date.getDate();
    var yearDate = date.getFullYear();

    if(dayNow === dayDate && monthNow === monthDate && yearNow === yearDate) return true;
    return false;
}

const sortBookingTime = (bookingTime, selectedDate) => {
    var result = bookingTime.sort((a, b) => 
        parseInt(a.time.substring(0, a.time.indexOf('h')) + a.time.substring(a.time.indexOf('h')+1)) - parseInt(b.time.substring(0, b.time.indexOf('h')) + b.time.substring(b.time.indexOf('h')+1))
    );
    var currentTime = new Date();
    if(isToday(selectedDate)) {
        console.log('TODAY')
        return result.filter(function(element){
            return parseInt(element.time.substring(0, element.time.indexOf('h')))*60 
                + parseInt(element.time.substring(element.time.indexOf('h')+1)) 
                - currentTime.getHours()*60
                - currentTime.getMinutes() > 30;
        })
    }
    
    return result;
}

export default sortBookingTime;
