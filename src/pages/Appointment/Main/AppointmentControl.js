import React from 'react';
import AppointmentControlSearch from './AppointmentControlSearch';
import AppointmentControlSort from './AppointmentControlSort';

export default function TaskControl(props) {

    return (
        <div className="row mt-15">
        {/* Search*/}
            <AppointmentControlSearch onSearch={props.onSearch} />
        {/*Sort*/}
            <AppointmentControlSort 
                onSort={props.onSort}
                sortBy={props.sortBy}
                sortValue={props.sortValue}
            />
        </div>
    );
}