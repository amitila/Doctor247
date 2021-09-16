import React from 'react';
import ProfileCard from './ProfileCard';

export default function ProfileList(props) {

    const { tasks } = props;
    const elmCards = tasks.map((task, index) => {
        return <ProfileCard
            key={task.id}
            index={index + 1}
            task={task}
            onDelete={props.onDelete}
            onUpdate={props.onUpdate}
        />
    });

    return (
        <div>
            {elmCards}
        </div>
    );

}