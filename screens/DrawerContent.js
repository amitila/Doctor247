import React from 'react';
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

export function DrawerContent(props) {

	const paperTheme = useTheme();

	const { signOut, toggleTheme } = React.useContext(AuthContext);

	return (
		<View style={{ flex: 1 }}>
			<DrawerContentScrollView {...props}>
				<View style={styles.drawerContent}>
					<View style={styles.userInfoSection}>
						<View style={{ flexDirection: 'row', marginTop: 15 }}>
							<Avatar.Image
								source={{
									uri: 'https://lh3.googleusercontent.com/Cw_4j9FPOsUNG3jUVG16Fmh3_dHfSQ34Z_POHauZQICVcSIWe4Y5OZJSDoj1enJW7FaknRXVWXGGwjq82ww6OTIsKtd-pFvS9o_xgA5mG72pAfCbfe2fbM_3Ubiyj3aCW1zTvZBQyNey7_E8_75WBOms4prr_qsA9VgAhgx0fYp-NzHbvJpfccbd6fivpiAYSIq3Q-lnxq7dO9yILqOGlFE32CKZj21meKCu47nm9aCa8XVA2N-AlGFgmkhS95UgTtrUKbiwFeHyCr3GBvf3bFAL0Oyr0yqryROxYK0Ghd_QOCk8gOr_C0wiGqRVZlefXPXCTY3iL1Lnk384zDo007vLuYz_JMk9cadXqItDtgFIrQ_n4C6ASV6H-onv1UN2inATi6XDyBUme98-RpfIAsPNL5Z76jhLTid5qFjZuQQnWg6hOee3ny3N47C2iHljRtDlQXDXFHK4_mc4R2SRz-FxXegJHIYMn2aPaWm3fPQXljdbZISsl62Ahf42xlk1masoDrTeHDMzuhb4SAhYF1-J5ti3jqz_H1CKDlx3MPIZn7k64QE-M-fvvc4AufLtQMB7IQQeFT2MNZLTzQ3NAaS8mPBstFgFlcgC2ZrbXio8tNVuB2eXbZ9VObI2pNeyqopGugdKLKsLKeP7CxPhhGydx2enEqBqMJVhltvClXuj3tJc5iQSY900TcB0SUeCeBgZFEEhzQEkpmLiEl-EFNtVEQ=s500-no?authuser=0'
								}}
								size={50}
							/>
							<View style={{ marginLeft: 15, flexDirection: 'column' }}>
								<Title style={styles.title}>Doctor247</Title>
								<Caption style={styles.caption}>Ứng dụng y tế</Caption>
							</View>
						</View>

						<View style={styles.row}>
							<View style={styles.section}>
								<Paragraph style={[styles.paragraph, styles.caption]}>800</Paragraph>
								<Caption style={styles.caption}>Theo dõi</Caption>
							</View>
							<View style={styles.section}>
								<Paragraph style={[styles.paragraph, styles.caption]}>1000</Paragraph>
								<Caption style={styles.caption}>Đánh giá</Caption>
							</View>
						</View>
					</View>

					<Drawer.Section style={styles.drawerSection}>
						<DrawerItem
							icon={({ color, size }) => (
								<Icon
									name="home-outline"
									color={color}
									size={size}
								/>
							)}
							label="Trang chủ"
							onPress={() => { props.navigation.navigate('Home') }}
						/>
						<DrawerItem
							icon={({ color, size }) => (
								<Icon
									name="account-outline"
									color={color}
									size={size}
								/>
							)}
							label="Cá nhân"
							onPress={() => { props.navigation.navigate('Profile') }}
						/>
						<DrawerItem
							icon={({ color, size }) => (
								<Icon
									name="bookmark-outline"
									color={color}
									size={size}
								/>
							)}
							label="Điều khoản"
							onPress={() => { props.navigation.navigate('BookmarkScreen') }}
						/>
						<DrawerItem
							icon={({ color, size }) => (
								<Icon
									name="cog-outline"
									color={color}
									size={size}
								/>
							)}
							label="Bảo mật"
							onPress={() => { props.navigation.navigate('SettingsScreen') }}
						/>
						<DrawerItem
							icon={({ color, size }) => (
								<Icon
									name="account-check-outline"
									color={color}
									size={size}
								/>
							)}
							label="Hỗ trợ"
							onPress={() => { props.navigation.navigate('SupportScreen') }}
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
		borderTopWidth: 1
	},
	preference: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 12,
		paddingHorizontal: 16,
	},
});