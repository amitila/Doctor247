import React from 'react';
import ProfileCard from './ProfileCard';

export default function ProfileList(props) {

    const { profiles } = props;
    const elmCards = profiles.map((task, index) => {
        return <ProfileCard
            key={task.id}
            index={index + 1}
            task={task}
            onDelete={props.onDelete}
            handleConfirmDelete={props.handleConfirmDelete}
            onUpdate={props.onUpdate}
            verifyGuardianUser={props.verifyGuardianUser}
            handleConfirmGuardianUser={props.handleConfirmGuardianUser}
        />
    });

    return (
        <div>
            {elmCards}
        </div>
    );

}