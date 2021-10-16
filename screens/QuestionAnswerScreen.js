import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Image, SafeAreaView, CheckBox } from 'react-native';
import { Card, ListItem, Button, Avatar, CheckBox as Like } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const questions = [
    {
        id: 1,
        title: 'Đau khớp vai',
        content: 'Tôi là nữ, 32 tuổi, đã bị đau khớp vai gần 10 năm nay nhưng chưa hết.',
        images: 'https://vinmec-prod.s3.amazonaws.com/images/20190521_161217_044450_dau-moi-vai-gay-la-.max-1800x1800.jpg'
    },
    {
        id: 2,
        title: 'Covid-19',
        content: 'Bé trai 3 tuổi, không may bị dương tính với covid 19. Giờ tôi nên làm gì bác sĩ',
        images: 'https://d2v9ipibika81v.cloudfront.net/uploads/sites/40/COVID-19.jpg'
    },
    {
        id: 3,
        title: 'Trật khớp',
        content: 'Tôi 25 tuổi, không may vấp cục đá té bị trật khớp',
        images: 'https://vinmec-prod.s3.amazonaws.com/images/20200305_184236_575371_trat-khop-co-chan.max-1800x1800.jpg'
    }
];

const QuestionAnswerScreen = ({ navigation }) => {
    const [isSelected, setSelection] = useState(false);

    return (
        <ScrollView>
            {
                questions.map((item, i) => {
                    return (
                        <Card key={i}>
                            <Card.Title>
                                <SafeAreaView style={styles.container}>
                                    <Text>
                                        Tiêu đề #{item.id}:
                                    </Text>
                                    <Text>
                                        {item.title}
                                    </Text>
                                </SafeAreaView>
                                <View style={styles.container}>
                                    <Like
                                        checkedIcon={<Icon 
                                            name="heart" 
                                            color="red" 
                                            size={20} 
                                        />}
                                        uncheckedIcon={<Icon 
                                            name="heart" 
                                            color="pink" 
                                            size={20} 
                                        />}
                                        checked={isSelected}
                                        onPress={() => setSelection(!isSelected)}
                                    />
                                </View>
                            </Card.Title>
                            <Card.Divider />
                            <View>
                                <Text style={{ marginBottom: 10 }}>
                                    {item.content}
                                </Text>
                            </View>
                            <Card.Image source={{uri: item.images}}>
                                
                            </Card.Image>
                            <View>
                                <Button
                                    icon={<Icon name='code' color='#ffffff' />}
                                    buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                                    title='Xem bình luận' 
                                />
                            </View>
                        </Card>
                    );
                })
            }
        </ScrollView>
    );
};

export default QuestionAnswerScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10
    },
});