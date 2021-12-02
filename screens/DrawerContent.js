import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import {
	useTheme,
	Avatar,
	Title,
	Caption,
	Paragraph,
	Drawer,
	Text,
	TouchableRipple,
	Switch
} from 'react-native-paper';
import {
	DrawerContentScrollView,
	DrawerItem
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../components/context';
import APIService from '../utils/APIService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function DrawerContent(props) {

	const [data, setData] = useState({
		firstName: '',
		lastName: '',
		avatar: '',
	})
	const [isHaveChange, setIsHaveChange] = useState(true);

	const paperTheme = useTheme();

	const { signOut, toggleTheme } = React.useContext(AuthContext);

	useEffect(() => {
		if(isHaveChange) {
			AsyncStorage.getItem('token')
			.then((token) => {
				return APIService.getProfile(token, (success, json) => {
					if (success && json.result) {
						// dispatch(updateAvatar(json.result.customer.avatarURL));
						// setOpen(true);
						setData({
							firstName: json.result.customer.firstName,
							lastName: json.result.customer.lastName,
							avatar: json.result.customer.avatarURL,
						});
						setIsHaveChange(false);
						return console.log('success')
					}
				})
			})
		}
	}, [isHaveChange])

	return (
		<View style={{ flex: 1 }}>
			<DrawerContentScrollView {...props}>
				<View style={styles.drawerContent}>
					<View style={styles.userInfoSection}>
						<View style={{ flexDirection: 'row', marginTop: 15 }}>
							<Avatar.Image
								source={{
									uri: data.avatar ? data.avatar : 'https://lh3.googleusercontent.com/f5tEpqTxxRxqCelMN1iN7kFlkv0ilHwvfg2DibOhvFVGryRNsxQA6iKoYhZ6YcFSP-yOXm4bZO2hLd3mBM_EFabTsm_59vneDggIOa8GTgJYZGV2IHmtA1lPnJNsgZ_YhCD6Y4rP15nGEYV79DKUZaNaHxhk6-S_9U0pCikIwPfcDbrEah-287x2DrgLskIZ3GwbtlAOIps3JMtRoD4Q14S1OzYIm_TlcAHkcZJSFbJ0ww_8kH8rirqxtU2Oi-Oo39Wwop3r1TXEm39r19CDGRhA47_TvydegHWbNxXOiU8JWN_WPfRCPDTozZ8lX0zmBRUdAybLUjFsjPRHUJ6V6h-mXH-UchjrUiridBwepeoF5qR0iz5XBl8_bDg8shvqbHniuVk5hDetv-e0adQMF1o5sQdv3LzLqtskBmbfRUSsTT67_NVYOC9Auvqxhtf1Fmjnv5U5bfj1DAhC1N9v1OCVBobzbbGcCw6u4J3111w-x4k50Y4u9d5GkdqwDPPnuud2udm2AfAtGj06YsUPH6YcZ_ZkdwgKfaQQYMOQJpoaD-Ng8Bb-gxfjrmSo-Zb0v6hFzxGnVGbig8EKeaEdd9W8OWmESoFwJVlOLRyXZkbfh_rG6daURul2UxJmYpNGXW4lOyHn81tnsXGiglDcdANskL0eCVCCkt85G6C2A38hQM8QEWeijiQBTwDcB9_MH__RKNWMVz3Kza2Row8GTN0eng=s500-no?authuser=0',
								}}
								size={50}
								
							/>
							<View style={{ marginLeft: 15, flexDirection: 'column' }}>
								<Title style={styles.title}>{data.firstName + ' ' + data.lastName}</Title>
								<Caption style={styles.caption}>Chào buổi sáng</Caption>
							</View>
						</View>

						<View style={styles.row}>
							<View style={styles.section}>
								<Paragraph style={[styles.paragraph, styles.caption]}>20</Paragraph>
								<Caption style={styles.caption}>Lần đặt khám</Caption>
							</View>
							<View style={styles.section}>
								<Paragraph style={[styles.paragraph, styles.caption]}>30</Paragraph>
								<Caption style={styles.caption}>Đánh giá</Caption>
							</View>
						</View>
					</View>

					<Drawer.Section style={styles.drawerSection}>
						<DrawerItem
							icon={({ color, size }) => (
								<Icon
									name="home"
									color={'blue'}
									size={size}
								/>
							)}
							label="Trang chủ"
							onPress={() => { props.navigation.navigate('Home') }}
						/>
						<DrawerItem
							icon={({ color, size }) => (
								<Icon
									name="account"
									color={'blue'}
									size={size}
								/>
							)}
							label="Cá nhân"
							onPress={() => { props.navigation.navigate('Profile') }}
						/>						
						<DrawerItem
							icon={({ color, size }) => (
								<Icon
									name="cog"
									color={'blue'}
									size={size}
								/>
							)}
							label="Cài đặt"
							onPress={() => { props.navigation.navigate('Cài đặt') }}
						/>
						<DrawerItem
							icon={({ color, size }) => (
								<Icon
									// name="account-check-outline"
									name='chat-outline'
									color={'blue'}
									size={size}
								/>
							)}
							label="Trò chuyện - Tư vấn"
							onPress={() => { props.navigation.navigate('Trò chuyện - Tư vấn trực tuyến') }}
						/>
						<DrawerItem
							icon={({ color, size }) => (
								<Icon
									// name="bookmark-outline"
									name='facebook'
									color={'blue'}
									size={size}
								/>
							)}
							label="Fanpage Doctor247"
							onPress={() => { props.navigation.navigate('Fanpage Doctor247') }}
						/>
					</Drawer.Section>
					<Drawer.Section title="Tùy chọn">
						<TouchableRipple onPress={() => { toggleTheme() }}>
							<View style={styles.preference}>
								<Text>Tối màu</Text>
								<View pointerEvents="none">
									<Switch value={paperTheme.dark} />
								</View>
							</View>
						</TouchableRipple>
					</Drawer.Section>
				</View>
			</DrawerContentScrollView>
			<Drawer.Section style={styles.bottomDrawerSection}>
				<DrawerItem
					style={{color: 'green', backgroundColor: '#fcc6c0', fontWeight: 'bold'}}
					icon={({ color, size }) => (
						<Icon
							name="exit-to-app"
							color={color}
							size={size}
						/>
					)}
					label="Đăng xuất"
					onPress={() => { signOut() }}
				/>
			</Drawer.Section>
		</View>
	);
}

const styles = StyleSheet.create({
	drawerContent: {
		flex: 1,
	},
	userInfoSection: {
		paddingLeft: 20,
	},
	title: {
		fontSize: 16,
		marginTop: 3,
		fontWeight: 'bold',
	},
	caption: {
		fontSize: 14,
		lineHeight: 14,
	},
	row: {
		marginTop: 20,
		flexDirection: 'row',
		alignItems: 'center',
	},
	section: {
		flexDirection: 'row',
		alignItems: 'center',
		marginRight: 15,
	},
	paragraph: {
		fontWeight: 'bold',
		marginRight: 3,
	},
	drawerSection: {
		marginTop: 15,
	},
	bottomDrawerSection: {
		marginBottom: 15,
		borderTopColor: '#f4f4f4',
		borderTopWidth: 1,
	},
	preference: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 12,
		paddingHorizontal: 16,
	},
});