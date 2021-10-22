const checkTime = (i) => {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

const getTimeClock = () => {
    var today = new Date();
    // var time = today.toLocaleTimeString()
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    var dd = today.getDate();
    var mm = today.getMonth();
    var yyyy = today.getFullYear();
    // add a zero in front of numbers<10
    m = checkTime(m);
    s = checkTime(s);
    setTimeout(function(){ getTimeClock() }, 500);
    return h + ":" + m + ":" + s + " " + dd +'/'+ mm +"/"+ yyyy;
}

export default getTimeClock;