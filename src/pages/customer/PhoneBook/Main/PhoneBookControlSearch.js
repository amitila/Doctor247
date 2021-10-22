import React from 'react';
import SearchIcon from '@material-ui/icons/Search';

export default function PhoneBookSearchControl(props) {

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
                placeholder="Nhập các từ khóa về bác sĩ..."
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
