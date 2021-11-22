import React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react/cjs/react.development';
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
    const [currentMenuItem, setCurrentMenuItem] = useState(ScreenCode.HOME);
    const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState('0');
    const [isVideoCallVisible, setIsVideoCallVisible] = useState(false);
    const [limitMsgAmount, setLimitMsgAmount] = useState(10);
    const [workPlaceList, setWorkPlaceList] = useState([]);
    const [currentCall, setCurrentCall] = useState(null);

    const history = useHistory();

    // for video call ->
    const [userInfo, setUserInfo] = useState({
        name: '',
        id: 0,
        avatarURL: null
    });
    const [listOnlineUsers, setListOnlineUsers] = useState([]);
    const [myPeerId, setMyPeerId] = useState('');
    const [callingUserId, setCallingUserId] = useState(-1);
    const peer = useRef();

    const socket = io('http://localhost:5000/');

    const openStream = () => {
        const config = { audio: false, video: true };
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
        console.log('userInfo.id');
        console.log(userInfo.id.toString());
        return {
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: userInfo.id.toString()
        }
    }, [userInfo.id]);

    const userCondition = useMemo(() => {
        return {
            fieldName: 'id',
            operator: '!=',
            compareValue: userInfo.id.toString()
        }
    }, [userInfo.id]);

    const users = useFirestore("users", userCondition);

    const rooms = useFirestore('rooms', roomsCondition);

    const user = useMemo(() =>
        users.find((u) => u.id === userInfo.id.toString()),
        [userInfo.id]
    );

    const selectedRoom = useMemo(() =>
        rooms.find((room) => room.id === selectedRoomId),
        [rooms, selectedRoomId]
    );

    useEffect(() => {
        console.log('selectedRoom');
        console.log(selectedRoom);
        console.log('rooms');
        console.log(rooms);
    }, [selectedRoom, rooms]);

    useEffect(() => {
        const token = getToken();
        APIService.getDoctorProfile(token, (success, json) => {
            if (success && json.result) {
                setUserInfo({
                    id: json.result.id,
                    name: json.result.doctor.firstName + " " + json.result.doctor.lastName,
                    avatarURL: json.result.doctor.avatar
                });
            } else {
                console.log('Không lấy được thông tin bác sĩ')
                APIService.getProfile(token, (success, json) => {
                    if(success && json.result){
                        setUserInfo({
                            id: json.result.id,
                            name: json.result.customer.firstName + " " + json.result.customer.lastName,
                            avatarURL: json.result.customer.avatarURL ? json.result.customer.avatarURL : ''
                        });
                    } else {
                        console.log('Không lấy được thông tin bệnh nhân')
                    }
                }) 
            }
        });
        peer.current = new Peer();    
        peer.current.on('call', (call) => {
            setCurrentCall(call);
        });
    }, []);

    useEffect(() => {
        if (userInfo.id !== 0) {
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
    }, [userInfo.id]);


    const getWorkPlaceName = (id) => {
        const wp = workPlaceList.find(x => x.id === id);
        //const type = wp.type === 'HOSPITAL'? 'Bệnh viện ': 'Phòng Khám ';
        return wp.name;
    }

    return (
        <AppContext.Provider
            value={{
                userInfo,
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
                workPlaceList,
                getWorkPlaceName
            }}>
            {children}
        </AppContext.Provider>
    );
}

