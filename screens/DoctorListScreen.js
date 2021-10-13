import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';
import { Card, ListItem, Button, Icon, Avatar } from 'react-native-elements';

const doctors = [
    {
        name: 'BS.Pham Van Tam',
        avatar: 'https://i.pinimg.com/736x/34/d6/f4/34d6f424bedf3dbc00ad054aec65a28b.jpg',
        speciality: 'Truyền nhiễm'
    },
    {
        name: 'BS.Le Van Han',
        avatar: 'https://scr.vn/wp-content/uploads/2020/08/H%C3%ACnh-g%C3%A1i-%C4%91%E1%BA%B9p-t%C3%B3c-d%C3%A0i-ng%E1%BA%A7u.jpg',
        speciality: 'Hộ sinh'
    },
    {
        name: 'BS.Hoang Van Dung',
        avatar: 'https://hinhanhdep.net/wp-content/uploads/2015/12/anh-girl-xinh-9x-1.jpg',
        speciality: 'Di truyền'
    }
];

const DoctorListScreen = ({ navigation }) => {
    return (
        <ScrollView>
            {
                doctors.map((item, i) => {
                    return (
                        <Card key={i}>
                            <Card.Title>
                                <SafeAreaView style={styles.container}>
                                    <Avatar
                                        rounded
                                        source={{uri: item.avatar}}
                                        size="medium"
                                    />
                                </SafeAreaView>
                                <SafeAreaView style={styles.container}>
                                    <Text>
                                        {item.name}
                                    </Text>
                                    <Text>
                                        Chuyên khoa {item.speciality}
                                    </Text>
                                </SafeAreaView>
                            </Card.Title>
                            {/* <Card.Divider /> */}
                            <View>
                                <Button
                                    // icon={<Icon name='code' color='#ffffff' />}
                                    buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                                    title='Đặt khám' />
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

export default DoctorListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        paddingHorizontal: 20
    },
});