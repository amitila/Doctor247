import React from 'react';
import TaskControlSearch from './TaskControlSearch';
import TaskControlSort from './TaskControlSort';

export default function TaskControl(props) {

    return (
        <div className="row mt-15">
        {/* Search*/}
            <TaskControlSearch onSearch={props.onSearch} />
        {/*Sort*/}
            <TaskControlSort 
                onSort={props.onSort}
                sortBy={props.sortBy}
                sortValue={props.sortValue}
            />
        </div>
    );
}