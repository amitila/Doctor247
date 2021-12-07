// import { useSelector } from "react-redux";
// import { selectId, selectRole, selectEmail, selectPassword, selectToken } from '../store/userSlice';
// const id = useSelector(selectId);
// import APIService from '../utils/APIService';
// import {
// 	Alert
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // var user = {
// //     id: '', 
// //     email: '',
// //     username: '', 
// //     password: '', 
// //     userToken: ''
// // };
// var token = AsyncStorage.getItem('token')
// .then((value) => {
//     console.log(value)
//     return value
// })
// async () => {
//     try {
//         console.log('token_user: ', await AsyncStorage.getItem('token'));
//         token = await AsyncStorage.getItem('token');
//         APIService.checkToken(token, (success, json) => {
//             if(success && json.result){
//                 Alert.alert('da xac thuc')
//                 return user = {
//                     id: json.result.id, 
//                     email: json.result.email,
//                     username: json.result, 
//                     userToken: json.result.token
//                 };
//             } else {
//                 return Alert.alert(token ? token.toString() : 'chua co token')
//             }
//         }) 
//     } catch (e) {
//         console.log(e);
//     }
// }
// console.log('amiiiiiii :', token.toString())

export default Users = [
    {
        id: 1, 
        email: 'user1@email.com',
        username: 'user1', 
        password: 'user1', 
        userToken: 'token123'
    },
    {
        id: 2, 
        email: 'user2@email.com',
        username: 'user2', 
        password: 'user2', 
        userToken: 'token12345'
    },
    {
        id: 3, 
        email: 'testuser@email.com',
        username: 'testuser', 
        password: 'testuser', 
        userToken: 'testtoken'
    },
];