import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';
import { Card, ListItem, Button, Icon, Avatar } from 'react-native-elements';

const appointments = [
    {
        code: 1,
        status: 'Đang chờ',
        date: '13/10/2021'
    },
    {
        code: 2,
        status: 'Đang chờ',
        date: '14/10/2021'
    },
    {
        code: 3,
        status: 'Đang chờ',
        date: '15/10/2021'
    },
];

const AppointmentScreen = ({ navigation }) => {
    return (
        <ScrollView>
            {
                appointments.map((item, i) => {
                    return (
                        <Card key={i}>
                            <Card.Title>
                                <SafeAreaView style={styles.container}>
                                    <Text>
                                        Mã nhận dạng: #{item.code}
                                    </Text>
                                    <Text>
                                        Tình trạng {item.status}
                                    </Text>
                                    <Text>
                                        Ngày khám {item.date}
                                    </Text>
                                </SafeAreaView>
                            </Card.Title>
                            <Card.Divider />
                            <View>
                                <Button
                                    // icon={<Icon name='code' color='#ffffff' />}
                                    buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                                    title='Chi tiết' />
                            </View>
                            {/* <Card.Image>
                                <Text style={{ marginBottom: 10 }}>
                                    The idea with React Native Elements is more about component structure than actual design.
                                </Text>
                                <Button
                                    icon={<Icon name='code' color='#ffffff' />}
                                    buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                                    title='VIEW NOW' />
                            </Card.Image> */}
                        </Card>
                    );
                })
            }
        </ScrollView>
    );
};

export default AppointmentScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20
    },
});