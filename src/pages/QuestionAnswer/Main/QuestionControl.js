import React from 'react';
import QuestionControlSearch from './QuestionControlSearch';
import QuestionControlSort from './QuestionControlSort';

export default function QuestionControl(props) {

    return (
        <div className="row mt-15">
        {/* Search*/}
            <QuestionControlSearch onSearch={props.onSearch} />
        {/*Sort*/}
            <QuestionControlSort 
                onSort={props.onSort}
                sortBy={props.sortBy}
                sortValue={props.sortValue}
            />
        </div>
    );
}