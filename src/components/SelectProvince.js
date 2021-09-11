import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function SelectProvince(props) {

    const [value, setValue] = React.useState(props.dataFromParent);
    const [inputValue, setInputValue] = React.useState('');

    const changeProvince = (event) => {
        props.handleChangeProvince(event.target.innerText);
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
                }}
                id="select-province"
                options={top63provinces}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Chọn tỉnh/thành phố" variant="standard" />}
            />
        </div>
    );
}

const top63provinces = [
    'Hà Nội',
    'Hà Giang',
    'Cao Bằng',
    'Bắc Kạn',
    'Tuyên Quang',
    "Lào Cai",
    'Điện Biên',
    'Lai Châu',
    'Sơn La',
    'Yên Bái',
    'Hoà Bình',
    'Thái Nguyên',
    'Lạng Sơn',
    'Quảng Ninh',
    'Bắc Giang',
    "Phú Thọ",
    'Vĩnh Phúc',
    'Bắc Ninh',
    'Hải Dương',
    'Hải Phòng',
    'Hưng Yên',
    'Thái Bình',
    'Hà Nam',
    "Nam Định",
    'Ninh Bình',
    'Thanh Hóa',
    'Nghệ An',
    'Hà Tĩnh',
    'Quảng Bình',
    'Quảng Trị',
    'Thừa Thiên Huế',
    'Đà Nẵng',
    'Quảng Nam',
    'Quảng Ngãi',
    'Bình Định',
    'Phú Yên',
    'Khánh Hòa',
    'Ninh Thuận',
    'Bình Thuận',
    'Kon Tum',
    'Gia Lai',
    'Đắk Lắk',
    'Đắk Nông',
    'Lâm Đồng',
    'Bình Phước',
    'Tây Ninh',
    'Bình Dương',
    'Đồng Nai',
    'Bà Rịa - Vũng Tàu',
    'Hồ Chí Minh',
    'Long An',
    'Tiền Giang',
    'Bến Tre',
    'Trà Vinh',
    'Vĩnh Long',
    'Đồng Tháp',
    'An Giang',
    'Kiên Giang',
    'Cần Thơ',
    'Hậu Giang',
    'Sóc Trăng',
    'Bạc Liêu',
    'Cà Mau'
];
