import React from 'react';
import SearchIcon from '@material-ui/icons/Search';

export default function AppointmentSearchControl(props) {

    const [keyword, setKeyword] = React.useState('');

    const onHandleChange = (event) => {
        setKeyword(event.target.value);
    }

    const onSearch = () => {
        props.onSearch(keyword);
    }

    return (
        <div className="input-group">
            <input
                name="keyword"
                value={keyword} 
                type="text"
                className="form-control"
                placeholder="Nhập từ khóa..."
                onChange={onHandleChange}
            />
            &nbsp;
            <span className="input-group-btn">
                <button className="btn btn-primary" type="button" onClick={onSearch}>
                    <SearchIcon /> Tìm kiếm
                </button>
            </span>
        </div>
    );
}
