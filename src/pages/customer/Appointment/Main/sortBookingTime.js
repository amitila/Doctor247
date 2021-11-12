const sortBookingTime = (bookingTime) => {
    const result = bookingTime.sort((a, b) => 
        parseInt(a.time.substring(0, a.time.indexOf('h')) + a.time.substring(a.time.indexOf('h')+1)) - parseInt(b.time.substring(0, b.time.indexOf('h')) + b.time.substring(b.time.indexOf('h')+1))
    );
    return result;
}

export default sortBookingTime;
