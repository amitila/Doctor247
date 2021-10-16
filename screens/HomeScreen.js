import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image, SafeAreaView, StatusBar } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Card, ListItem, Button, Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const doctors = [
    {
        name: 'Bác sĩ',
        icon: 'https://i.pinimg.com/736x/34/d6/f4/34d6f424bedf3dbc00ad054aec65a28b.jpg',
    },
    {
        name: 'Lịch khám',
        icon: 'https://scr.vn/wp-content/uploads/2020/08/H%C3%ACnh-g%C3%A1i-%C4%91%E1%BA%B9p-t%C3%B3c-d%C3%A0i-ng%E1%BA%A7u.jpg',
    },
    {
        name: 'Hỏi đáp',
        icon: 'https://hinhanhdep.net/wp-content/uploads/2015/12/anh-girl-xinh-9x-1.jpg',
    },
	{
        name: 'Danh bạ',
        icon: 'https://i.pinimg.com/736x/34/d6/f4/34d6f424bedf3dbc00ad054aec65a28b.jpg',
    },
    {
        name: 'Chuyên khoa',
        icon: 'https://scr.vn/wp-content/uploads/2020/08/H%C3%ACnh-g%C3%A1i-%C4%91%E1%BA%B9p-t%C3%B3c-d%C3%A0i-ng%E1%BA%A7u.jpg',
    },
    {
        name: 'Đã lưu',
        icon: 'https://hinhanhdep.net/wp-content/uploads/2015/12/anh-girl-xinh-9x-1.jpg',
    }
];

const HomeScreen = ({ navigation }) => {

	const { colors } = useTheme();

	const theme = useTheme();

	return (
		<View>
			<StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />
			{/* <Text style={{ color: colors.text }}>Home Screen</Text>
			<Button
				title="Go to details screen"
				onPress={() => navigation.navigate("Details")}
			/> */}
				<Card>
					<Card.Title style={{backgroundColor: '#b9e3fa'}} >
						<View style={styles.container}>
							<SafeAreaView style={styles.goldContainer}>
								<Icon 
									name="user-md" 
									color="blue" size={50} 
									onPress={() => navigation.navigate('Danh sách bác sĩ')}
								/>
								<View>
									<Text style={{ color: colors.text, fontSize: 18, fontWeight: 'bold' }}>Bác sĩ</Text>
								</View>
							</SafeAreaView>
							<SafeAreaView style={styles.redContainer}>
								<Icon 
									name="star" 
									color="purple" 
									size={50} 
									onPress={() => alert('Button Clicked!')}
								/>
								<View>
									<Text style={{ color: colors.text, fontSize: 18, fontWeight: 'bold' }}>Khoa</Text>
								</View>
							</SafeAreaView>
						</View>
						<View style={styles.container}>
							<SafeAreaView style={styles.goldContainer}>
								<Icon 
									name="calendar" 
									color="red" 
									size={50} 
									onPress={() => navigation.navigate('Lịch khám')}
								/>
								<View>
									<Text style={{ color: colors.text, fontSize: 18, fontWeight: 'bold' }}>Lịch khám</Text>
								</View>
							</SafeAreaView>
							<SafeAreaView style={styles.redContainer}>
								<Icon 
									name="question-circle" 
									color="green" 
									size={50} 
									onPress={() => navigation.navigate('Hỏi đáp cùng bác sĩ')}
								/>
								<View>
									<Text style={{ color: colors.text, fontSize: 18, fontWeight: 'bold' }}>Hỏi đáp</Text>
								</View>
							</SafeAreaView>
						</View>
						<View style={styles.container}>
							<SafeAreaView style={styles.goldContainer}>
								<Icon 
									name="users" 
									color="orange" 
									size={50} 
									onPress={() => navigation.navigate('Hồ sơ gia đình')}
								/>
								<View>
									<Text style={{ color: colors.text, fontSize: 18, fontWeight: 'bold' }}>Gia đình</Text>
								</View>
							</SafeAreaView>
							<SafeAreaView style={styles.redContainer}>
								<Icon 
									name="address-book" 
									color="#e19dfa" 
									size={50} 
									onPress={() => alert('Button Clicked!')}
								/>
								<View>
									<Text style={{ color: colors.text, fontSize: 18, fontWeight: 'bold' }}>Danh bạ</Text>
								</View>
							</SafeAreaView>
						</View>
					</Card.Title>
				</Card>
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 0.5,
		alignItems: 'flex-end',
		justifyContent: 'space-around',
		width: 95,
		height: 200,
		textAlign: 'center',
	},
	goldContainer: {
		flex: 0.5,
		// backgroundColor: 'gold',
		width: 110,
		height: 150,
		justifyContent: 'center',
		alignItems: 'center',
	},
	redContainer: {
		flex: 0.5,
		// backgroundColor: 'red',
		width: 110,
		height: 150,
		justifyContent: 'center',
		alignItems: 'center',
	},

});
