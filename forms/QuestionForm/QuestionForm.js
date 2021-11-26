import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	Button,
	TouchableOpacity,
	Dimensions,
	TextInput,
	Platform,
	StyleSheet,
	ScrollView,
	StatusBar,
	Alert,
	Picker
} from 'react-native';
import * as Animatable from 'react-native-animatable';
// import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import RadioForm from 'react-native-radio-form';
import { Avatar } from 'react-native-elements';
import moment from 'moment';
import APIService from '../../utils/APIService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

const QuestionForm = (props) => {
	
	const [data, setData] = useState({
		title: '',
        content: '',
		images: '',
	});
	const [images, setImages] = useState({
		image_1: '',
		image_2: ''
	})
	
	const [isHaveChange, setIsHaveChange] = useState(-1)

	// upload image to server
	const pickImageFromLibrary_1 = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});
		if (!result.cancelled) {
			setImages(preData => ({ ...preData, image_1: result }))
			// setImages(result)
		}
	};

	const pickImageFromLibrary_2 = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});
		if (!result.cancelled) {
			setImages(preData => ({ ...preData, image_2: result }))
			// setImages(result)
		}
	};
	//////////////////////////
	const postQuestion = () => {
		const arrImage = [images.image_1 ? images.image_1 : null, images.image_2 ? images.image_2 : null]
		AsyncStorage.getItem('token')
			.then((token) => {
				return APIService.postQuestion(
					token,
					{
						title: data.title,
						content: data.content, 
                        images: arrImage
						
					},
					(success, json) => {
						if (success && json.result) {
							// dispatch(updateName(json.result.customer.lastName));
							// APIService.getProfile(token, (success, json) => {
							// 	if(success && json.result){
							// 		dispatch(updateAvatar(json.result.customer.avatarURL));
							// 	}
							// }) 
							setIsHaveChange(0);
							props.onClose();
							return alert("THÀNH CÔNG !");
						} else {
							return console.log("Cập nhật thay đổi THẤT BẠI !");
						}
					})
			})
	}

	return (
		<View style={styles.container}>
			<StatusBar backgroundColor='#036ffc' barStyle="light-content" />
			<View style={styles.header}>
				<Text style={styles.text_header}>Tạo câu hỏi</Text>
			</View>
			<Animatable.View
				animation="fadeInUpBig"
				style={styles.footer}
			>
				<ScrollView>
					<Text style={[styles.text_footer, {
						marginTop: 0
					}]}>Tiêu đề</Text>
					<View style={styles.action}>
						<TextInput
							placeholder="Tiêu đề"
							value={data.title}
							style={styles.textInput}
							autoCapitalize="none"
							onChangeText={(val) => setData({
								...data,
								title: val
							})}
						/>
					</View>

					<Text style={[styles.text_footer, {
						marginTop: 30
					}]}>Nội dung</Text>
					<View style={styles.action}>
						<TextInput
                            multiline={true}
                            numberOfLines={4}
                            placeholder="Tiêu đề"
							value={data.content}
							style={styles.textInput}
							autoCapitalize="none"
							onChangeText={(val) => setData({
								...data,
								content: val
							})}
                        />
					</View>

					<Text style={[styles.text_footer, {
						marginTop: 30
					}]}>Ảnh minh họa</Text>
					<View style={styles.images}>
						<Avatar
							size="xlarge"
							source={{
								uri: images.image_1 ? images.image_1.uri : 'https://lh3.googleusercontent.com/fife/AAWUweVa1ekfdQYYQv0xYqb_F6xq5j3SoxxmntaNXmiJhDbsY9k3giV05I-WK1ro5PO8Sf4vGaxvsJaDDK1Q-FQVsO1LwBKJMKH2IRMYck194n547aNnO0A9cwoUfDJwwgyhXoivSRFQ-W6L7NP0zXDSX6fLgbfnypqNU5TOdQfQ27wlChSbpKsb1im1qJx0kZ1EYk8ZBGh7Tl99hs2SPhjGM9S2X1TkfLTw78lknzBXITJP0kz6yB1zy0eb4Hxs_MjaDTEUtllCeJz9vm7S9iMHmnv0tHYn8Ha43DRI4zlMQAFPCqbOdcgZ0iwX01RKiw1-Te4JmlB0sRgQqGbRzxpugo6u2UXcNc145d1HcHatKLYKBahlR2t96ttTcUjLUCqiG2rgn_fTSfXRyOqMmXvQflSvNRJ8OayRkg75ob8HzrbNf53omchSqjtwJ_1SNHyaGzMqoHaTofEntMp-BIcCpYtDCgky_kxlXGh7dp50JrhylCLtjL6cXXRmCJhcaR-ZzGluo5qjqpMO9YBLnLwvmeb0KDmLjyht5uC0NtOPd1Cox9710lkwb27ypnoj_7hZDA-AHJQbSU9W7su77d9VGthJYDTNfsKeCQ8df8XKTtobfMoJMCuNIMzFomANTF_1JJocguAV-znsKMVx_T0U60oUxsJTg5ACF_7OvCChtEtIe9TVeTnW3pA_1MCNZWCDjzonB2WHq0ahsR6qFxRdVVLoMhPG5pJNZ-AckzjQtTnmlwTXbld8Z0QOPgciULlnhf0sNmXHYEfPiYSAh5tG1OlPe8_Y_Maf8TptVTYDTFY2YodsuF9p4kEo1-9x0E5wFNKINfzsZjxzIYeWxFFGTE7VWDpnJWkoEjMZWdJG9Ty7ejm80rlGz6RDFYXpjImNmR-RZpRN4CWvz7aIJIDa2lzE3BcVdVitsT4cEbSJyyYhf893ld6lwB6BqSYzj1i_yP3OG8f_LNz-7NAelPVf-RTtPj-ll7Kx2UshHHlxySMEsT7E9LDSnUfydvZAAvnoLXd96nJ_ylY3n5pj01ZqaPp0Z41FGjUb3SHlUZwbuO_T-dCFa798xiXf8YX35aaGV-gS_PRdxufeh999Erv9T7rD8V2XmGrEvtB8CXUdr6QgNlQM2K4VOadOm-X3HoIbQuFTIHKNM1LMhVsiBhMTTzXMJFkWEGBwtfZXmSG3thwfK5C4O_0UIBC-w1mOZ6VaBoJERYILHgMGRTqTeGDgKXvN_iqiKELVfEZ24e_XPfVp4RH--8hnGpDGZFWFB_6m0xZp8AqsHVbaSEFV0RBkZz8FEksF1rOXlD4tX60Tp42Uw7rKh1AwJvr26iIZbmftVgiVM4e17uVn2-T9foaV6CjFWy1laHMAupUdLNo9FiTjgWHRet6VMNezPtOeQsKeU61SLbC8h8dsxKmiAv-uXxzdxOy-4RLQb6Y1HALqRyysx4HdE_nBDC7KC0VXGmr-mk-ut_wWofOu8jLtKTJYl7RB_xoz4sXUF7HkPlufJ4iEkC4grN4mDB7PAWcIPNTCgNKZsfqKVax6nDOMxwa3xOlXLnb1Btx_TcpbjJ7VtXDW55fNKH4jxItxuVgtt3I7HYNpnj5bLFeAmD0RXg8a13RdzJesbeI3JBeK5UdwP0BZkuIIPOfcpoYJynXzKWfBAxCXQ_gAGTDID7uTV2Js_HvwN3SHXIKWrcjaZQ-B4rOPz07OxYfACnEVMIiKntteRULMIl2O6toSO-w6q7UtHiU-xWQu0q4zZzm4PHPum1XLIMlvluI6_YrRxqEUeqoLpS2KbOwy9NTNRWquc7adeTiVIvJXi2EL_su6Abvh1QtsRPcLy0NtNGy4hHgsd5BfB1e10ceXuKzJuD4DmUTUrtVzrNy8r-9DQtjHZ0cQrtQKgawHTV2VDWF6jyMkg6juvxlXVr9Syfn-Y4qyjNxfIl8KpGG8YkqZmUzGjQZHVbj5U_s3sNjX6JvMBmaOwwu9Y_6UWJL_36qougqr3Qvn63lkt2Gey7A7ZdF3Lj-KOgaH_B7hf8_uNnD3GYPBbtTxwbLA0HW1SdtPlw5edXJv0rXIqx0qGIWlZCSWhaEDUgdJ3O4YGOyRFwouOZuYhhYnDFlrAgE8IPzHMkRQQxN2FIQ81hqYrEhVEaYYz1Oj4r_F_ZnBPVtGdLZd02VBt31_bX9D_ofaPneVdNsy-K3uHJ0XBgWuVYNz_wUTchfuPBprU40JnQ8TUHT4tFSO_1R3fUG7YPoC3-xHh84ka2QqVGdEvzB1BO8gBBR8nSgcrDQAe56z4_6b5yrreHjRtSRDZtxcxgazXVimAmrjpVRpne5GRumcOGrZ401z-gyJwYI4oUZQmyTAwGJ0_7pGBbknI3S-0O9dxGaAeGyIgogx_ld7ZbmLID0iu-yR1UiOexavMarjYmqIhQSmnf9hZEDCG2WyUyamS9D6BsJ2iDrpfgf71MfMGV180HiOoJRsC6hKNXgQGlpYTZjMTDC993QAcTHhoipVyg0F_6o25SLhpOvjYzBEJkgkeW_iMpvHYWHihntjRZ3o4o88CYSidxVctaJkRHIxPAYCnxG66z09C64sxqAwJyT7uiL17EL9apUMGOIQGUuXYPY1hQc-XtuwG-bgq8QzD7Rh9P7nmEokrp5QeZF1pI4_-rnWfi5hbIXhwHCP4ziUzBxbFHsTgoBXVtQQ3BFqLDDNnWPDCJVl5PfGn69aDVeBS1Z1qRhAyQ7KbgN3NLj-04peCWyXARd2zzW4OLNGWEjfkzb35b2kRukzPpe0kXo_l7ZPBrLND6welq0bUoenaVDaxqkje-R3BAya-7JcvQlSHbpk2-VE3_exbaGJW5jSROwkwGw6sCBJOPzsFH5VP_EanxsE5EuEDKEgPG1pLL7W72aw1KtiHox7kH2YB9-m3hCQ1T3T3nLQuXXBNRQdghL0nkKSVch0V2esqbrBerps4UMgjX9wtGFLy0Q8ZDP5rQDvfBMK-Id8qSzwgOxVQrmtsCiv_9DBCUHZw-KkNnxHT4gxpAl6ZWn9nozznRsimtrcgIEKh_kMBaKhHUqJxqb0y4U97Cx3yk-SCT-NeknvcgNd67AF9mYPfLXnfW_nUQiB2RlXQTCmMTXfDbDbzvmTLdztZ1y4tLIItwwHVbrCrZVIbN5DthOpW1vfCuAVWq-1n6Z5p6uqDITGAeSZjCyCQljA71WSDoGPNFq8NbwcIpISUt10V9B9NUmLYsC8RnNLm604duO18_P5Jp8gC4xlMyWxhWJzkqkG_OFgdJA-RsmrxcS6K6gUKTZLsON1wFU9sNlaUInWV3h4DFEJKQyZnQXL-u002_raGzPOdewxB7LoF-nWfmhPB3YqHuKDTYmXoyTYPusqT4pPKUXwlSH3-f6u3LShSyCSv0rmkloXvjsLNWihGscEKBUSe86ikwqDFASCIzT8BUMiRMpPjROk8hcQ8iWvGdiPhP23eh5rbkm2R4OoeoR5in8O8BCpcTdpnjo0oPMpQ-ouYim3YJugheri-2B08tOyga1nx5zVj400VdoO6k7J1RkNJQ2OiprO9J1nKxeWBOX1ie1FbOreOKxRZHo8wntNE757nPlMZq1g2nkc2umgIsOMufUTOe0Wb5Kcfze35fOS7qFrENqpbJ5Bm__KzfeAgGDrPqO6ZorkhzjlPBSUJAzVVl4YCnT5GgiPT5KsW0lQgBLVIoFOIF2ikjhpjdyQlZU3kHaHl12AJTnSMM3gVRl2fIMgwQ=s664-w584-h664-no?authuser=0',
							}}
							onPress={() => { pickImageFromLibrary_1() }}
						/>	
						<Avatar
							size="xlarge"
							source={{
								uri: images.image_2 ? images.image_2.uri : 'https://lh3.googleusercontent.com/fife/AAWUweVa1ekfdQYYQv0xYqb_F6xq5j3SoxxmntaNXmiJhDbsY9k3giV05I-WK1ro5PO8Sf4vGaxvsJaDDK1Q-FQVsO1LwBKJMKH2IRMYck194n547aNnO0A9cwoUfDJwwgyhXoivSRFQ-W6L7NP0zXDSX6fLgbfnypqNU5TOdQfQ27wlChSbpKsb1im1qJx0kZ1EYk8ZBGh7Tl99hs2SPhjGM9S2X1TkfLTw78lknzBXITJP0kz6yB1zy0eb4Hxs_MjaDTEUtllCeJz9vm7S9iMHmnv0tHYn8Ha43DRI4zlMQAFPCqbOdcgZ0iwX01RKiw1-Te4JmlB0sRgQqGbRzxpugo6u2UXcNc145d1HcHatKLYKBahlR2t96ttTcUjLUCqiG2rgn_fTSfXRyOqMmXvQflSvNRJ8OayRkg75ob8HzrbNf53omchSqjtwJ_1SNHyaGzMqoHaTofEntMp-BIcCpYtDCgky_kxlXGh7dp50JrhylCLtjL6cXXRmCJhcaR-ZzGluo5qjqpMO9YBLnLwvmeb0KDmLjyht5uC0NtOPd1Cox9710lkwb27ypnoj_7hZDA-AHJQbSU9W7su77d9VGthJYDTNfsKeCQ8df8XKTtobfMoJMCuNIMzFomANTF_1JJocguAV-znsKMVx_T0U60oUxsJTg5ACF_7OvCChtEtIe9TVeTnW3pA_1MCNZWCDjzonB2WHq0ahsR6qFxRdVVLoMhPG5pJNZ-AckzjQtTnmlwTXbld8Z0QOPgciULlnhf0sNmXHYEfPiYSAh5tG1OlPe8_Y_Maf8TptVTYDTFY2YodsuF9p4kEo1-9x0E5wFNKINfzsZjxzIYeWxFFGTE7VWDpnJWkoEjMZWdJG9Ty7ejm80rlGz6RDFYXpjImNmR-RZpRN4CWvz7aIJIDa2lzE3BcVdVitsT4cEbSJyyYhf893ld6lwB6BqSYzj1i_yP3OG8f_LNz-7NAelPVf-RTtPj-ll7Kx2UshHHlxySMEsT7E9LDSnUfydvZAAvnoLXd96nJ_ylY3n5pj01ZqaPp0Z41FGjUb3SHlUZwbuO_T-dCFa798xiXf8YX35aaGV-gS_PRdxufeh999Erv9T7rD8V2XmGrEvtB8CXUdr6QgNlQM2K4VOadOm-X3HoIbQuFTIHKNM1LMhVsiBhMTTzXMJFkWEGBwtfZXmSG3thwfK5C4O_0UIBC-w1mOZ6VaBoJERYILHgMGRTqTeGDgKXvN_iqiKELVfEZ24e_XPfVp4RH--8hnGpDGZFWFB_6m0xZp8AqsHVbaSEFV0RBkZz8FEksF1rOXlD4tX60Tp42Uw7rKh1AwJvr26iIZbmftVgiVM4e17uVn2-T9foaV6CjFWy1laHMAupUdLNo9FiTjgWHRet6VMNezPtOeQsKeU61SLbC8h8dsxKmiAv-uXxzdxOy-4RLQb6Y1HALqRyysx4HdE_nBDC7KC0VXGmr-mk-ut_wWofOu8jLtKTJYl7RB_xoz4sXUF7HkPlufJ4iEkC4grN4mDB7PAWcIPNTCgNKZsfqKVax6nDOMxwa3xOlXLnb1Btx_TcpbjJ7VtXDW55fNKH4jxItxuVgtt3I7HYNpnj5bLFeAmD0RXg8a13RdzJesbeI3JBeK5UdwP0BZkuIIPOfcpoYJynXzKWfBAxCXQ_gAGTDID7uTV2Js_HvwN3SHXIKWrcjaZQ-B4rOPz07OxYfACnEVMIiKntteRULMIl2O6toSO-w6q7UtHiU-xWQu0q4zZzm4PHPum1XLIMlvluI6_YrRxqEUeqoLpS2KbOwy9NTNRWquc7adeTiVIvJXi2EL_su6Abvh1QtsRPcLy0NtNGy4hHgsd5BfB1e10ceXuKzJuD4DmUTUrtVzrNy8r-9DQtjHZ0cQrtQKgawHTV2VDWF6jyMkg6juvxlXVr9Syfn-Y4qyjNxfIl8KpGG8YkqZmUzGjQZHVbj5U_s3sNjX6JvMBmaOwwu9Y_6UWJL_36qougqr3Qvn63lkt2Gey7A7ZdF3Lj-KOgaH_B7hf8_uNnD3GYPBbtTxwbLA0HW1SdtPlw5edXJv0rXIqx0qGIWlZCSWhaEDUgdJ3O4YGOyRFwouOZuYhhYnDFlrAgE8IPzHMkRQQxN2FIQ81hqYrEhVEaYYz1Oj4r_F_ZnBPVtGdLZd02VBt31_bX9D_ofaPneVdNsy-K3uHJ0XBgWuVYNz_wUTchfuPBprU40JnQ8TUHT4tFSO_1R3fUG7YPoC3-xHh84ka2QqVGdEvzB1BO8gBBR8nSgcrDQAe56z4_6b5yrreHjRtSRDZtxcxgazXVimAmrjpVRpne5GRumcOGrZ401z-gyJwYI4oUZQmyTAwGJ0_7pGBbknI3S-0O9dxGaAeGyIgogx_ld7ZbmLID0iu-yR1UiOexavMarjYmqIhQSmnf9hZEDCG2WyUyamS9D6BsJ2iDrpfgf71MfMGV180HiOoJRsC6hKNXgQGlpYTZjMTDC993QAcTHhoipVyg0F_6o25SLhpOvjYzBEJkgkeW_iMpvHYWHihntjRZ3o4o88CYSidxVctaJkRHIxPAYCnxG66z09C64sxqAwJyT7uiL17EL9apUMGOIQGUuXYPY1hQc-XtuwG-bgq8QzD7Rh9P7nmEokrp5QeZF1pI4_-rnWfi5hbIXhwHCP4ziUzBxbFHsTgoBXVtQQ3BFqLDDNnWPDCJVl5PfGn69aDVeBS1Z1qRhAyQ7KbgN3NLj-04peCWyXARd2zzW4OLNGWEjfkzb35b2kRukzPpe0kXo_l7ZPBrLND6welq0bUoenaVDaxqkje-R3BAya-7JcvQlSHbpk2-VE3_exbaGJW5jSROwkwGw6sCBJOPzsFH5VP_EanxsE5EuEDKEgPG1pLL7W72aw1KtiHox7kH2YB9-m3hCQ1T3T3nLQuXXBNRQdghL0nkKSVch0V2esqbrBerps4UMgjX9wtGFLy0Q8ZDP5rQDvfBMK-Id8qSzwgOxVQrmtsCiv_9DBCUHZw-KkNnxHT4gxpAl6ZWn9nozznRsimtrcgIEKh_kMBaKhHUqJxqb0y4U97Cx3yk-SCT-NeknvcgNd67AF9mYPfLXnfW_nUQiB2RlXQTCmMTXfDbDbzvmTLdztZ1y4tLIItwwHVbrCrZVIbN5DthOpW1vfCuAVWq-1n6Z5p6uqDITGAeSZjCyCQljA71WSDoGPNFq8NbwcIpISUt10V9B9NUmLYsC8RnNLm604duO18_P5Jp8gC4xlMyWxhWJzkqkG_OFgdJA-RsmrxcS6K6gUKTZLsON1wFU9sNlaUInWV3h4DFEJKQyZnQXL-u002_raGzPOdewxB7LoF-nWfmhPB3YqHuKDTYmXoyTYPusqT4pPKUXwlSH3-f6u3LShSyCSv0rmkloXvjsLNWihGscEKBUSe86ikwqDFASCIzT8BUMiRMpPjROk8hcQ8iWvGdiPhP23eh5rbkm2R4OoeoR5in8O8BCpcTdpnjo0oPMpQ-ouYim3YJugheri-2B08tOyga1nx5zVj400VdoO6k7J1RkNJQ2OiprO9J1nKxeWBOX1ie1FbOreOKxRZHo8wntNE757nPlMZq1g2nkc2umgIsOMufUTOe0Wb5Kcfze35fOS7qFrENqpbJ5Bm__KzfeAgGDrPqO6ZorkhzjlPBSUJAzVVl4YCnT5GgiPT5KsW0lQgBLVIoFOIF2ikjhpjdyQlZU3kHaHl12AJTnSMM3gVRl2fIMgwQ=s664-w584-h664-no?authuser=0',
							}}
							onPress={() => { pickImageFromLibrary_2() }}
						/>						
					</View>

					<View style={styles.button}>
						<TouchableOpacity
							style={[styles.signIn, {
								borderColor: '#036ffc',
								borderWidth: 1,
								marginTop: 15
							}]}
							onPress={() => { postQuestion() }}
						>
							<Text style={[styles.textSign, {
								color: '#036ffc'
							}]}>Đăng câu hỏi</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={[styles.signIn, {
								borderColor: '#036ffc',
								borderWidth: 1,
								marginTop: 15
							}]}
							onPress={() => { props.onClose() }}
						>
							<Text style={[styles.textSign, {
								color: '#036ffc'
							}]}>Quay về</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</Animatable.View>
		</View>
	);
};

export default QuestionForm;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#2196f3'
	},
	header: {
		flex: 0.6,
		justifyContent: 'flex-end',
		alignItems: 'center',
		paddingHorizontal: 80,
		paddingBottom: 18
	},
	footer: {
		flex: Platform.OS === 'ios' ? 3 : 5,
		backgroundColor: '#fff',
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		paddingHorizontal: 20,
		paddingVertical: 30
	},
	text_header: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 30
	},
	text_footer: {
		color: '#05375a',
		fontSize: 18
	},
	action: {
		flexDirection: 'row',
		marginTop: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#f2f2f2',
		paddingBottom: 5
	},
	textInput: {
		flex: 1,
		marginTop: Platform.OS === 'ios' ? 0 : -12,
		paddingLeft: 10,
		color: '#05375a',
	},
	button: {
		alignItems: 'center',
		marginTop: 50
	},
	signIn: {
		width: '100%',
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10
	},
	textSign: {
		fontSize: 18,
		fontWeight: 'bold'
	},
	textPrivate: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginTop: 20
	},
	color_textPrivate: {
		color: 'grey'
	},
	datePickerStyle: {
		width: 250,
		marginTop: 20,
	},
	avatar: {
		flexDirection: 'column',
		marginTop: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#f2f2f2',
		paddingBottom: 5,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 50,
	},
	images: {
		flexDirection: 'row',
	}
});