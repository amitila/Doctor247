import * as React from 'react';
import { Container, Grid } from '@material-ui/core';
import ChatRoom from '../../../components/common/ChatRoom/ChatRoom';
import APIService from '../../../utils/APIService';
import getToken from '../../../helpers/getToken';
import { addRoom } from '../../../firebase/service';
import useFirestore from '../../../firebase/useFirestore';

const token = getToken();
var myId = 0;
APIService.getProfile(token, (success, json) => {
	if (success && json.result) {
		console.log('json.result.id')
		console.log(json.result.id)
		myId = json.result.id;
	}
})

export default function Index() {

    const [doctorIdList, setDoctorIdList] = React.useState([]);

    const roomsCondition = React.useMemo(() => {
        return {
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: myId
        }
    }, [])
	const rooms = useFirestore('rooms', roomsCondition);

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
		if (myId !== 0) {
			doctorIdList.forEach(doctorId => {
				if (rooms === undefined || rooms === null) {
					addRoom(doctorId, myId);
				}
				else if (rooms.find(room => room.members.indexOf(doctorId) > -1) === undefined) {
					addRoom(doctorId, myId);
				}
			});
		}
	}, [doctorIdList, rooms])

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


