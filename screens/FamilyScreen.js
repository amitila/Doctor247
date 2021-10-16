import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';
import { Card, ListItem, Button, Icon, Avatar } from 'react-native-elements';

const people = [
    {
        name: 'Pham Van Tam',
        birthday: '19/09/1999',
        phone: '0398296632',
        avatar: 'https://i.pinimg.com/736x/34/d6/f4/34d6f424bedf3dbc00ad054aec65a28b.jpg',
        address: 'Phú Yên'
    },
    {
        name: 'Le Van Han',
        birthday: '19/09/1999',
        phone: '0398296632',
        avatar: 'https://scr.vn/wp-content/uploads/2020/08/H%C3%ACnh-g%C3%A1i-%C4%91%E1%BA%B9p-t%C3%B3c-d%C3%A0i-ng%E1%BA%A7u.jpg',
        address: 'Đăk Lăk'
    },
    {
        name: 'Hoang Van Dung',
        birthday: '19/09/1999',
        phone: '0398296632',
        avatar: 'https://hinhanhdep.net/wp-content/uploads/2015/12/anh-girl-xinh-9x-1.jpg',
        address: 'Đồng Nai'
    },
    {
        name: 'Ami Lila',
        birthday: '19/09/1999',
        phone: '0398296632',
        avatar: 'https://hinhanhdep.net/wp-content/uploads/2015/12/anh-girl-xinh-9x-1.jpg',
        address: 'Tuy Hòa'
    }
];

const FamilyScreen = ({ navigation }) => {
    return (
        <ScrollView>
            {
                people.map((item, i) => {
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
                                        Ngày sinh: {item.birthday}
                                    </Text>
                                </SafeAreaView>
                            </Card.Title>
                            <Card.Divider />
                            <View>
                                <Text style={{ marginBottom: 5 }}>
                                    Số điện thoại: {item.phone}
                                </Text>
                                <Text style={{ marginBottom: 10 }}>
                                    Địa chỉ: {item.address}
                                </Text>
                                <View style={styles.containerView}>
                                    <Button
                                        // icon={<Icon name='code' color='#ffffff' />}
                                        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                                        title='Cập nhật thông tin' />
                                    <Button
                                        // icon={<Icon name='code' color='#ffffff' />}
                                        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                                        title='Xóa thẻ' /> 
                                </View>
                            </View>
                        </Card>
                    );
                })
            }
        </ScrollView>
    );
};

export default FamilyScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        paddingHorizontal: 20
    },
    containerView: {
		flex: 0.5,
		alignItems: 'flex-start',
		justifyContent: 'space-around',
		textAlign: 'center',
        display: 'flex',
        flexDirection: 'row'
	},
	buttonContainer: {
		flex: 0.5,
		// backgroundColor: 'gold',
		width: 110,
		height: 150,
		justifyContent: 'center',
		alignItems: 'center',
	},
});