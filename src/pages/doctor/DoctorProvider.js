import React from 'react';
import { useMemo, useState } from 'react/cjs/react.development';
import Peer from 'peerjs';
import useFirestore from './../../firebase/useFirestore';

const ScreenCode = {
    HOME: 1,
    MEDICAL_RECORDS: 2,
    WORK_PLAN: 3,
    PROFILE: 4,
    FORM: 5,
    CHAT: 6,
    NOTIFY: 7,
    TEST: 10,
}

const ContentCode = {
    LIST: 1,
    DETAIL: 2
}


export const DoctorContext =  React.createContext();

export default function DoctorProvider({children}) {
    const [currentMenuItem, setCurrentMenuItem] = useState(ScreenCode.HOME);
    const [userId, setUserId] = useState('0');
    const [username, setUsername] = useState('Bin');
    const [isCalling, setIsCalling] = useState(false);
    const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState('0');
    const [isVideoCallVisible, setIsVideoCallVisible] = useState(false);
    const [limitMsgAmount, setLimitMsgAmount] = useState(10);
    
    // const [user, setUser] = useState({
    //     displayName : 'Dung',
    //     id : '1',
    //     photoURL : 'https://pdp.edu.vn/wp-content/uploads/2021/01/anh-avatar-dep-dai-dien-facebook-zalo.jpg'
    // });

    const peer = new Peer();
    
    const [contentId, setContentId] = useState(ContentCode.LIST);

    const roomsCondition = useMemo(() => {
        return {
            fieldName: 'id',
            operator: '!=',
            compareValue: userId
        }
    }, [userId]);

    const userCondition = useMemo(() => {
        return {
            fieldName: 'id',
            operator: '!=',
            compareValue: userId
        }
    }, [userId]);

    const users = useFirestore("users", userCondition);

    const rooms = useFirestore('rooms', roomsCondition);

    const user = useMemo(() =>
        users.find((u) => u.id === userId),
        [userId]
    );
    
    const selectedRoom = useMemo(() => 
        rooms.find((room) => room.id === selectedRoomId),
        [rooms, selectedRoomId]
    );

    return (
        <DoctorContext.Provider 
        value={{
            username,
            setUsername,
            userId,
            setUserId,
            isCalling,
            setIsCalling,
            currentMenuItem,
            setCurrentMenuItem,
            ScreenCode,
            contentId,
            setContentId,
            ContentCode,
            peer,
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
            setLimitMsgAmount
        }}>
            {children}
        </DoctorContext.Provider>
    );
}

