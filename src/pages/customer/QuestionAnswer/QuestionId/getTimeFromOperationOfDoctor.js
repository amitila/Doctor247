const getTimeFromOperationOfDoctor = (startTime, endTime, workplace, patientPerHalfHour) => {
    const start = {
        hour: startTime.substring(0, startTime.indexOf('h')),
        minute: startTime.substring(startTime.indexOf('h')+1),
    }
    const end = {
        hour: endTime.substring(0, endTime.indexOf('h')),
        minute: endTime.substring(endTime.indexOf('h')+1),
    }
    // console.log(start)
    // console.log(end)
    const temp = [];
    for (let x = parseInt(start.hour); x < parseInt(end.hour); x ++) {
        for(let y = 0; y < 2; y++) {
            if(y === 0) {
                if(x === parseInt(start.hour) && parseInt(start.minute) === 30) {
                    console.log('bo qua')
                }
                else {
                    const tempTime = `${x}h00 - ${x}h30`;
                    temp.push({
                        time: tempTime,
                        workplace,
                        patientPerHalfHour
                    });
                }
            } 
            else {
                if(x === parseInt(end.hour)-1 && parseInt(end.minute) === 30) {
                    console.log('ghi them')
                    const tempTime_1 = `${x}h30 - ${x +1 }h00`;
                    temp.push({
                        time: tempTime_1,
                        workplace,
                        patientPerHalfHour
                    });
                    const tempTime_2 = `${x+1}h00 - ${x +1 }h30`;
                    temp.push({
                        time: tempTime_2,
                        workplace,
                        patientPerHalfHour
                    });
                }
                else {
                    const tempTime = `${x}h30 - ${x +1 }h00`;
                    temp.push({
                        time: tempTime,
                        workplace,
                        patientPerHalfHour
                    });
                } 
            }
        }
    }
    return temp;
}

export default getTimeFromOperationOfDoctor;
