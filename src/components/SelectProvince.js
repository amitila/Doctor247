import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import APIService from '../utils/APIService';

let top63provinces =[];
APIService.getProvinces((success, json) => {
    if(success && json.result){
        json.result.map(item => {
            return top63provinces.push(item.name);
        })
    } 
});

export default function SelectProvince(props) {

    const [value, setValue] = React.useState(props.province);
    const [inputValue, setInputValue] = React.useState('');

    useEffect(() => {
		setValue(props.province);
	}, [props, value]);

    const changeProvince = (event) => {
        APIService.getProvinces((success, json) => {
            if(success && json.result){
                json.result.map(item => {
                    if(event.target.innerText === item.name) {
                        console.log(item);
                        return props.handleChangeProvince(item);
                    }
                    return 0;
               })
            } 
        });
    }

    const handleChangeInit = () => {
        if(!props.provinceId) {
            APIService.getProvinces((success, json) => {
                if(success && json.result){
                    json.result.map(item => {
                        if(props.province === item.name) {
                            return props.handleChangeProvince(item);
                        }
                        return 0;
                   })
                } 
            });
        }
    }

    return (
        <div>
            <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                    changeProvince(event);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                    handleChangeInit();
                }}
                id="select-province"
                options={top63provinces}
                style={{ width: 300 }}
                renderInput={(params) => <TextField style={{width: "80%", marginRight: 55}} variant="filled" size="small" required {...params} label="Chọn tỉnh/thành phố" />}
            />
        </div>
    );
}


// const top63provinces = [
//     'Hà Nội',
//     'Hà Giang',
//     'Cao Bằng',
//     'Bắc Kạn',
//     'Tuyên Quang',
//     "Lào Cai",
//     'Điện Biên',
//     'Lai Châu',
//     'Sơn La',
//     'Yên Bái',
//     'Hoà Bình',
//     'Thái Nguyên',
//     'Lạng Sơn',
//     'Quảng Ninh',
//     'Bắc Giang',
//     "Phú Thọ",
//     'Vĩnh Phúc',
//     'Bắc Ninh',
//     'Hải Dương',
//     'Hải Phòng',
//     'Hưng Yên',
//     'Thái Bình',
//     'Hà Nam',
//     "Nam Định",
//     'Ninh Bình',
//     'Thanh Hóa',
//     'Nghệ An',
//     'Hà Tĩnh',
//     'Quảng Bình',
//     'Quảng Trị',
//     'Thừa Thiên Huế',
//     'Đà Nẵng',
//     'Quảng Nam',
//     'Quảng Ngãi',
//     'Bình Định',
//     'Phú Yên',
//     'Khánh Hòa',
//     'Ninh Thuận',
//     'Bình Thuận',
//     'Kon Tum',
//     'Gia Lai',
//     'Đắk Lắk',
//     'Đắk Nông',
//     'Lâm Đồng',
//     'Bình Phước',
//     'Tây Ninh',
//     'Bình Dương',
//     'Đồng Nai',
//     'Bà Rịa - Vũng Tàu',
//     'Hồ Chí Minh',
//     'Long An',
//     'Tiền Giang',
//     'Bến Tre',
//     'Trà Vinh',
//     'Vĩnh Long',
//     'Đồng Tháp',
//     'An Giang',
//     'Kiên Giang',
//     'Cần Thơ',
//     'Hậu Giang',
//     'Sóc Trăng',
//     'Bạc Liêu',
//     'Cà Mau'
// ];
