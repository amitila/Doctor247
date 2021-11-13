import React from 'react';
import SearchIcon from '@material-ui/icons/Search';

export default function MRSearchControl(props) {

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
                placeholder="Tên bệnh nhân, bác sĩ khám, mã hồ sơ (ví dụ: #1)..."
                onChange={onHandleChange}
            />
            &nbsp;
            <span className="input-group-btn">
                <button className="btn btn-primary" type="button" onClick={onSearch}>
                    <SearchIcon /> Tìm nhanh
                </button>
            </span>
        </div>
    );
}
