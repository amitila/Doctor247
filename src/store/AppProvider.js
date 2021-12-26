import React, { useEffect, useMemo, useRef, useState } from 'react';
import Peer from 'peerjs';
import { io } from "socket.io-client";
import useFirestore from '../firebase/useFirestore';
import { useHistory } from "react-router-dom";
import APIService from '../utils/APIService';
import getToken from '../helpers/getToken';
import Cookies from 'universal-cookie';

const ScreenCode = {
    HOME: 1,
    MEDICAL_RECORD: 2,
    TIMETABLE: 3,
    WORK_PLACE: 4,
    PROFILE: 5,
    CHAT: 6,
    NOTIFY: 7,
    VIDEO: 8,
    QA: 9,
    TEST: 10,
}

const ContentCode = {
    LIST: 1,
    DETAIL: 2
}

export const AppContext = React.createContext();

export default function AppProvider({ children }) {
    const [isLogin, setIsLogin] = useState(false);
    const [currentMenuItem, setCurrentMenuItem] = useState(ScreenCode.HOME);
    const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState('0');
    const [isVideoCallVisible, setIsVideoCallVisible] = useState(false);
    const [limitMsgAmount, setLimitMsgAmount] = useState(10);
    const [currentCall, setCurrentCall] = useState(null);

    const [pendingAppointmentList, setPendingAppointmentList] = useState([]);
    const [newPendingAppointmentList, setNewPendingAppointmentList] = useState([]);

    const history = useHistory();

    const token = getToken();

    // for video call ->
    const [userInfo, setUserInfo] = useState({
        id: 0,
        name: '',
        avatarURL: null,
    });
    const [listOnlineUsers, setListOnlineUsers] = useState([]);
    const [myPeerId, setMyPeerId] = useState('');
    const [callingUserId, setCallingUserId] = useState(-1);
    const peer = useRef();

    const socket = io('https://socket-server-doctor247.herokuapp.com/');

    const openStream = () => {
        const config = { audio: true, video: true };
        return navigator.mediaDevices.getUserMedia(config);
    }
    const playStream = (idVideoTag, stream) => {
        const video = document.getElementById(idVideoTag);
        video.srcObject = stream;
        video.play();
    }

    const closeStream = (idVideoTag) => {
        const video = document.getElementById(idVideoTag);
        video.srcObject = null;
    }
    // for video call <-

    const [contentId, setContentId] = useState(ContentCode.LIST);

    const roomsCondition = useMemo(() => {
        return {
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: userInfo.id.toString()
        }
    }, [userInfo]);

    const userCondition = useMemo(() => {
        return {
            fieldName: 'id',
            operator: '!=',
            compareValue: userInfo.id.toString()
        }
    }, [userInfo]);

    const users = useFirestore("users", userCondition);

    const [isGetRoom, setIsGetRoom] = useState(false);
    const rooms = useFirestore('rooms', roomsCondition, () => {setIsGetRoom(true);});

    const user = useMemo(() =>
        users.find((u) => u.id === userInfo.id.toString()),
        [userInfo.id]
    );

    const selectedRoom = useMemo(() =>
        rooms.find((room) => room.id === selectedRoomId),
        [rooms, selectedRoomId]
    );

    const TRoom = {members: ['0']};

    const selectedUserId = useMemo(() =>
        ((selectedRoom === null || selectedRoom === undefined) ? TRoom : selectedRoom).members.find(id => id !== userInfo.id.toString()),
        [selectedRoom]
    ); 

    const doctorCheck = () => {
        APIService.getDoctorAppointment(
            token,
            (success, json) => {
                if (success, json.result) {
                    var list = [];
                    json.result.forEach(item => {
                        if (item.status === 'PENDING') {
                            let d = item.createdAt.substring(0,16).replaceAll('-','').replaceAll('T','').replaceAll(':','');
                            d = parseInt(d);
                            list.push({
                                id: item.id,
                                od: d
                            });
                        }
                    });
                    list.sort(function(a, b) {
                        return a.od - b.od;
                      });
                    setNewPendingAppointmentList(list);
                }
            }
        );
    }

    useEffect(() => {
        APIService.getDoctorAppointment(
            token,
            (success, json) => {
                if (success, json.result) {
                    var list = [];
                    json.result.forEach(item => {
                        if (item.status === 'PENDING') {
                            let d = item.createdAt.substring(0,16).replaceAll('-','').replaceAll('T','').replaceAll(':','');
                            d = parseInt(d);
                            list.push({
                                id: item.id,
                                od: d
                            });
                        }
                    });
                    list.sort(function(a, b) {
                        return a.od - b.od;
                      });
                    setPendingAppointmentList(list);
                }
            }
        );
    }, []);

    useEffect(() => {
        APIService.getDoctorProfile(token, (success, json) => {
            if (success && json.result) {
                setUserInfo({
                    id: json.result.id,
                    name: json.result.doctor.firstName + " " + json.result.doctor.lastName,
                    avatarURL: json.result.doctor.avatarURL
                });
                setIsLogin(true);
            } else {
                console.log('Không lấy được thông tin bác sĩ')
                APIService.getProfile(token, (success, json) => {
                    if(success && json.result){
                        setUserInfo({
                            id: json.result.id,
                            name: json.result.customer.firstName + " " + json.result.customer.lastName,
                            avatarURL: json.result.customer.avatarURL ? json.result.customer.avatarURL : ''
                        });
                        setIsLogin(true);
                    } else {
                        console.log('Không lấy được thông tin bệnh nhân')
                    }
                }) 
            }
        });
        if (isLogin) {
            peer.current = new Peer();    
            peer.current.on('call', (call) => {
                setCurrentCall(call);
            });
        }
    }, [isLogin]);
    
    useEffect(() => {
        if (isLogin && userInfo.id !== 0) {
            peer.current.on('open', (id) => {
                console.log(id);
                setMyPeerId(id);
                socket.emit('SIGN_UP_USER', {
                    name: userInfo.name,
                    id: userInfo.id,
                    avatarURL: userInfo.avatarURL,
                    peerId: id,
                });
            });
        }
    }, [isLogin, userInfo]);

    return (
        <AppContext.Provider
            value={{
                isLogin,
                setIsLogin,
                userInfo,
                setUserInfo,
                callingUserId,
                setCallingUserId,
                currentCall,
                setCurrentCall,
                currentMenuItem,
                setCurrentMenuItem,
                ScreenCode,
                contentId,
                setContentId,
                ContentCode,
                listOnlineUsers,
                setListOnlineUsers,
                peer,
                myPeerId,
                socket,
                openStream,
                playStream,
                closeStream,
                rooms,
                selectedRoom,
                selectedUserId,
                isAddRoomVisible,
                setIsAddRoomVisible,
                isVideoCallVisible,
                setIsVideoCallVisible,
                selectedRoomId,
                setSelectedRoomId,
                user,
                limitMsgAmount,
                setLimitMsgAmount,
                history,
                isGetRoom,
                doctorCheck,
                newPendingAppointmentList,
                setNewPendingAppointmentList,
                pendingAppointmentList,
                setPendingAppointmentList
            }}>
            {children}
        </AppContext.Provider>
    );
}

