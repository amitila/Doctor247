import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function Relationship(props) {

    const [value, setValue] = React.useState(props.dataFromParent);
    const [inputValue, setInputValue] = React.useState('');

    useEffect(() => {
		setValue(props.dataFromParent);
	}, [props]);

    const slectRelationship = (event) => {
        props.handleSelectRelationship(event.target.innerText);
    }

    return (
        <div>
            <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                    slectRelationship(event);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                id="select-relationship"
                options={top11relationships}
                style={{ width: 300 }}
                renderInput={(params) => <TextField style={{width: "80%", marginRight: 55}} variant="filled" size="small" required {...params} label="Mối quan hệ" />}
            />
        </div>
    );
}

const top11relationships = [
    'Vợ',
    'Chồng',
    'Cha',
    'Mẹ',
    'Ông',
    'Bà',
    'Con',
    'Anh/Chị',
    'Cậu/Mợ',
    'Dì/Dượng',
    'Bác',
    'Chú/Thím',
    'Khác'
];
