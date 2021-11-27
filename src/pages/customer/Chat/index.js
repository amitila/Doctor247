import * as React from 'react';
import { Container, Grid } from '@material-ui/core';
import ChatRoom from '../../../components/common/ChatRoom/ChatRoom';
import APIService from '../../../utils/APIService';
import getToken from '../../../helpers/getToken';
import { addRoom } from '../../../firebase/service';
import { AppContext } from '../../../store/AppProvider';

export default function Index() {

    const { userInfo, rooms, isGetRoom } = React.useContext(AppContext);

    const [doctorIdList, setDoctorIdList] = React.useState([]);

	React.useEffect(() => {
		const token = getToken();
        APIService.getAppointment(token, {}, (success, json) => {
            if (success && json.result) {
                let list = [];
                let listDoctor = [];
                list = json.result.filter(element => element.status !== 'WAITING_PAYMENT');
                list = list.filter(element => element.status !== 'CUSTOMER_CANCEL');
                list.forEach(element => {
                    listDoctor.push(element.doctor.userId.toString());
                });
                listDoctor = listDoctor.filter((item, index) => listDoctor.indexOf(item) === index);
                setDoctorIdList(listDoctor);
            }
		})
    },[])

	React.useEffect(() => {
        console.log('log data');
        console.log(rooms);
        console.log(doctorIdList);
        console.log(isGetRoom);
		if (userInfo.id !== 0 && isGetRoom) {
			doctorIdList.forEach(doctorId => {
				if (rooms === undefined || rooms === null) {
                    console.log('room was added 1');
					addRoom(doctorId, userInfo.id);
				}
				else if (rooms.find(room => room.members.indexOf(doctorId) > -1) === undefined) {
                    console.log('room was added 2');
					addRoom(doctorId, userInfo.id.toString());
				}
			});
		}
	}, [doctorIdList, rooms, isGetRoom])

    return (
        <Container maxWidth="lg">
            <Grid container spacing={5}>
                <Grid item xs={12} sm={12}>
                    <Grid item>
                        <ChatRoom />
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Grid item>
                       
                    </Grid>
                </Grid>
            </Grid>
        </Container>            
    )
}


