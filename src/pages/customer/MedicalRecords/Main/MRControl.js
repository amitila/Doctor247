import React from 'react';
import MRControlSearch from './MRControlSearch';
import MRControlSort from './MRControlSort';

export default function MRControl(props) {

    return (
        <div className="row mt-15">
        {/* Search*/}
            <MRControlSearch onSearch={props.onSearch} />
        {/*Sort*/}
            <MRControlSort 
                onSort={props.onSort}
                sortBy={props.sortBy}
                sortValue={props.sortValue}
            />
        </div>
    );
}