import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity, Linking } from 'react-native';
import { Card, ListItem, Button, Icon, Avatar } from 'react-native-elements';
import APIService from '../utils/APIService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PhoneBookScreen = ({ navigation }) => {
    const [phoneCards, setPhoneCards] = useState([
        {
            "name": "Phú Yên – Bệnh Viện Đa Khoa Tỉnh Phú Yên",
            "phoneNumber": "0963361414",
            "lat": 13.1092808,
            "lng": 109.2970928,
            "distance" : 0
        },
        {
            "name": "Phú Yên – Bệnh Viện Điều Dưỡng Và Phục Hồi Chức Năng",
            "phoneNumber": "0963351414",
            "lat": 13.171919202996422, 
            "lng": 109.29366292562965,
            "distance" : 0
        },
        {
            "name": "Phú Yên – Bệnh Viện Mắt Phú Yên",
            "phoneNumber": "0963201414",
            "lat": 13.090611546235369, 
            "lng": 109.31840597522388,
            "distance" : 0
        },
        {
            "name": "Phú Yên – Bệnh Viện Sản Nhi Phú Yên",
            "phoneNumber": "0963301414",
            "lat": 13.092414289950959, 
            "lng": 109.30236695261658,
            "distance" : 0
        },
        {
            "name": "Phú Yên – Trung Tâm Da Liễu Phú Yên",
            "phoneNumber": "0963181414",
            "lat": 13.091558740610596, 
            "lng": 109.292201367958,
            "distance" : 0
        },
        {
            "name": "Khánh Hòa – Bệnh Viện Đa Khoa Tỉnh Khánh Hòa",
            "phoneNumber": "0965371515",
            "lat": 12.2486775,
            "lng": 109.1900883,
            "distance" : 0
        },
        {
            "name": "Lâm Đồng – Bệnh Viện Đa Khoa Lâm Đồng",
            "phoneNumber": "0964591515",
            "lat": 11.5481015,
            "lng": 107.8073639,
            "distance" : 0
        },
        {
            "name": "Kon Tum – Bệnh Viện Đa Khoa Tỉnh Kon Tum",
            "phoneNumber": "0964951515",
            "lat": 14.3558789,
            "lng": 107.996474,
            "distance" : 0
        },
        {
            "name": "Cà Mau – Bệnh Viện Đa Khoa Tỉnh Cà Mau",
            "phoneNumber": "0967731818",
            "lat": 9.1713151,
            "lng": 105.1584296,
            "distance" : 0
        },
        {
            "name": "Tp. Hồ Chí Minh – Bệnh Viện Chợ Rẫy",
            "phoneNumber": "0969871010",
            "lat": 10.757836156223908,
            "lng": 106.65952201026082,
            "distance" : 0
        },
        {
            "name": "Tp. Hồ Chí Minh – Bệnh Viện Thống Nhất",
            "phoneNumber": "0969861010",
            "lat": 10.791557174281282, 
            "lng": 106.6534321967672,
            "distance" : 0
        },
        {
            "name": "Tp. Hồ Chí Minh – Bệnh Viện Chấn Thương Chỉnh Hình",
            "phoneNumber": "0967841010",
            "lat": 10.7898283398828,
            "lng": 106.65339502785093,
            "distance" : 0
        },
        {
            "name": "Tp. Hồ Chí Minh – Bệnh Viện Nhi Đồng 1",
            "phoneNumber": "0967681010",
            "lat": 10.773450774007289, 
            "lng": 106.66912892941775,
            "distance" : 0
        },
        {
            "name": "Tp. Hồ Chí Minh – Bệnh Viện Nhi Đồng 2",
            "phoneNumber": "0967671010",
            "lat": 10.78508641002898, 
            "lng": 106.70140126608159,
            "distance" : 0
        },
    ]);

    const callToHospital = (phoneNumber) => {
        return Linking.openURL(`tel:${phoneNumber}`)
    }

    return (
        <>
            <ScrollView>
                <View>
                    <Text style={styles.note}>
                        Đây là danh sách các bệnh viện mà hệ thống đã thu thập được 
                        từ các trang công bố chính thức của bộ y tế. {'\n'}
                        Quý khách hàng có thể sử dụng trong trường hợp khẩn cấp. {'\n'}
                        *Lưu ý: Các bệnh viện trên không thuộc quyền quản lý của Doctor247
                    </Text>
                </View>
                <View>
                    {
                        phoneCards.map((item, index) => (
                            <TouchableOpacity
                                key = {index}
                                style = {styles.container}
                                onPress = {() => callToHospital(item.phoneNumber)}
                            >
                                <Text style = {styles.text}>
                                    {item.name}
                                </Text>
                                <Text style = {styles.text}>
                                    {item.phoneNumber}
                                </Text>
                                <Text style = {styles.text}>
                                    Khoảng cách hiện tại: {item.distance}
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </ScrollView>
        </>
    );
};

export default PhoneBookScreen;

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginTop: 3,
        backgroundColor: '#d9f9b1',
        alignItems: 'center',
    },
    text: {
        color: '#4f603c'
    },
    note: {
        fontSize: 20, 
        color: 'red', 
        textAlign: 'center', 
        backgroundColor: 'pink', 
        padding: 10
    }
});