import React, { useState, useEffect } from 'react';
import { View, Button, Platform, SafeAreaView, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DatePicker( props ) {
	const [mydate, setDate] = useState(props.date);
	useEffect(() => {
		setDate(props.date)
	}, [props.date])
	const [displaymode, setMode] = useState('date');
	const [isDisplayDate, setShow] = useState(false);
	const changeSelectedDate = (event, selectedDate) => {
		const currentDate = selectedDate || mydate;
		setDate(currentDate);
		props.handleChangeDate(currentDate);
	};
	const showMode = (currentMode) => {
		setShow(!isDisplayDate);
		setMode(currentMode);
	};
	const displayDatepicker = () => {
		showMode('date');
	};
	const getSelectedDate = () => {
		var month = mydate.getMonth() + 1; //months from 1-12
		var day = mydate.getDate();
		var year = mydate.getFullYear();
		return (year + "-" + (month < 10 ? '0' + month : month) + "-" + day);
	}

	return (
		<SafeAreaView style={styles.container}>
			<View>
				<Button onPress={displayDatepicker} title={mydate ? getSelectedDate() : 'Chọn ngày sinh'} />
			</View>
			{isDisplayDate && (
				<DateTimePicker
					testID="dateTimePicker"
					value={mydate}
					mode={displaymode}
					is24Hour={true}
					display="default"
					onChange={changeSelectedDate}
				/>
			)}
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
});