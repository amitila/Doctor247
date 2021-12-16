import './ChatRoom.css';
import React, { useMemo } from 'react';
import { doc, setDoc, updateDoc } from '@firebase/firestore';
import styled from 'styled-components';
import { db } from '../../../firebase/config';
import { getNowDateTimeCode, getDateTimeShow } from '../../../firebase/service';
import Message from './Message';
import { AppContext } from '../../../store/AppProvider';
import { GetMessages } from '../../../firebase/useFirestore';

import { useContext, useState, useEffect } from 'react/cjs/react.development';
import Button from '@mui/material/Button';
import Grid from '@material-ui/core/Grid';
import OutlinedInput from '@material-ui/core/OutlinedInput';

const avatarTemplate = 'https://img.flaticon.com/icons/png/512/149/149071.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const HeaderStyled = styled.div`
    display: flex;
    justify-content: space-between;
    height: 56px;
    padding: 0 16px;
    align-items: center;
    border-bottom: 1px solid rgb(230, 230, 230);

    .header {
        &__info {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        &__title {
            margin: 0;
            font-weight: bold;
        }
        &__description {
            font-size: 12px;
        }
    }
`;

const WrapperStyled = styled.div`
    height: 80vh;
    background: 'lightgray';
`;

const ContentStyled = styled.div`
    height: calc(100% - 56px);
    display: flex;
    flex-direction: column;
    padding: 11px;
    justify-content: flex-end;
`;

const MessageListStyled = styled.div`
    display: flex;
    flex-direction: column-reverse;
    max-height: 100%;
    overflow-y: auto;
`;

function ChatWindow(props) {
    const { selectedRoom, userInfo } = useContext(AppContext);
    const { selectedUser, chatUsersList } = props;

    const [inputMessage, setInputMessage] = useState('');
    const [limitAmount, setLimitAmount] = useState(10);

    const roomCondition = useMemo(() => ({
        fieldName: 'roomId',
        operator: '==',
        compareValue: (selectedRoom === null || selectedRoom === undefined) ? '0' : selectedRoom.id
    }), [selectedRoom]);

    const messages = GetMessages(roomCondition, limitAmount);

    useEffect(() => {
        var s = document.getElementById("msg-panel");
        s.addEventListener("scroll", (event) => {
            if (Math.abs(s.scrollTop) >= Math.abs(s.scrollHeight - 600)) {
                let maxLength = ((selectedRoom === null || selectedRoom === undefined) ? 0 : selectedRoom.length);
                if (limitAmount < maxLength) {
                    setLimitAmount(limitAmount + 10);
                }
            }
        });
    }, [messages]);

    useEffect(() => {
        setLimitAmount(10);
        var s = document.getElementById("msg-panel");
        s.scrollTo(0, 0);
    }, [selectedRoom]);

    const handleOnSubmit = () => {
        if (inputMessage === '') {
            return;
        }
        let maxLength = ((selectedRoom === null || selectedRoom === undefined) ? 0 : selectedRoom.length);
        let sid = ((selectedRoom === null || selectedRoom === undefined) ? '0' : selectedRoom.id);
        updateDoc(doc(db, "rooms", sid), {
            "length": maxLength + 1
        });
        setDoc(doc(db, "messages", getNowDateTimeCode() + userInfo.id.toString()), {
            text: inputMessage,
            uid: userInfo.id.toString(),
            photoURL: '',
            roomId: selectedRoom.id,
            createdAt: getNowDateTimeCode()
        });
        setInputMessage('');
    }

    return (
        <WrapperStyled>
            <HeaderStyled>
                <div className="header__info">
                    <p className="header__title">{selectedUser.name}</p>
                    <span className="header__description">{(selectedRoom === null || selectedRoom === undefined) ? '' : selectedRoom.description}</span>
                </div>
                {/* <i style={{ fontSize: '25px' }} className="fas fa-video"></i> */}
            </HeaderStyled>
            <ContentStyled>
                <MessageListStyled id="msg-panel">
                    {
                        messages.map((msg) =>
                            <Message
                                align={(msg.uid === userInfo.id.toString()) ? 'right' : 'left'}
                                text={msg.text}
                                photoURL={(msg.uid === userInfo.id.toString()) ? userInfo.avatarURL : avatarTemplate}
                                displayName={(msg.uid === userInfo.id.toString()) ? '' : selectedUser.name}
                                createdAt={getDateTimeShow(msg.createdAt)}
                            />
                        )
                    }
                </MessageListStyled>

                <Grid container spacing={3} style={{ marginTop: '10px' }}>
                    <Grid item xs={10} sm={10}>
                        <OutlinedInput
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleOnSubmit();
                                }
                            }}
                            style={{ backgroundColor: 'white' }}
                            onChange={(e) => setInputMessage(e.target.value)}
                            id="msg"
                            fullWidth
                            multiline
                            placeholder="Nhập tin nhắn"
                            value={inputMessage}
                            disabled={(selectedRoom === null || selectedRoom === undefined) ? true : false}
                        />
                    </Grid>
                    <Grid item xs={2} sm={2}>
                        <Button onClick={handleOnSubmit} variant="contained" color="primary">Gửi</Button>
                    </Grid>
                </Grid>
            </ContentStyled>
        </WrapperStyled>
    );
}

export default ChatWindow;