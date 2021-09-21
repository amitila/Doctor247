import React, { useState } from 'react';
import ProfileForm from './ProfileForm';
import ProfileList from './ProfileList';
import { useHistory } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import { Grid } from '@material-ui/core';

export default function Index() {
    const history = useHistory();
    const flag = (localStorage && localStorage.getItem('profiles')) ? JSON.parse(localStorage.getItem('profiles')) : [];
    const [profiles, setProfiles] = useState(flag);
    const [isDisplayForm, setIsDisplayForm] = useState(false);
    const [taskEditing, setTaskEditing] = useState(null);

    const s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    } 

    const generateID = () => {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    const onToggleForm = (event) => {//Add task
        if (isDisplayForm && taskEditing !== null) {
            setIsDisplayForm(true);
            setTaskEditing(null);
        } else {
            setIsDisplayForm(!isDisplayForm);
            setTaskEditing(null);
        }
    }

    const onCloseForm = (event) => {
        setIsDisplayForm(false);
        history.push("/profile");
    }

    const onShowForm = (event) => {
        setIsDisplayForm(true);
    }

    const onSubmit = (data) => {
        if (data.id === '') {
            data.id = generateID();
            profiles.push(data);
        } else {
            //Editing
            const index = findIndex(data.id);
            profiles[index] = data;
        }
        setProfiles(profiles);
        setTaskEditing(null);
        localStorage.setItem('profiles', JSON.stringify(profiles));
    }

    const findIndex = (id) => {
        let result = -1;
        profiles.forEach((task, index) => {
            if (task.id === id) {
                result = index;
            }
        });
        return result;
    }

    const onDelete = (id) => {
        const index = findIndex(id);
        if (index !== -1) {
            profiles.splice(index, 1);
            localStorage.setItem('profiles', JSON.stringify(profiles));
        }
        onCloseForm();
    }

    const onUpdate = (id) => {
        const index = findIndex(id);
        const taskEditing = profiles[index];
        setTaskEditing(taskEditing);
        onShowForm();
    }

    var elmTaskForm = isDisplayForm
        ? <ProfileForm
            onSubmit={onSubmit}
            onCloseForm={onCloseForm}
            task={taskEditing}
        /> : '';

    return (
        <div className="container-fluid m-50">
            <div className="text-center">
                <h1>Hồ sơ gia đình</h1>
                <br />
            </div>
            <div className="row">
                <div  >
                    {isDisplayForm ? 
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={8}>
                                {elmTaskForm}
                                {/* {isDisplayForm ? '' :   
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={onToggleForm}
                                    >
                                        <AddIcon />
                                        Thêm hồ sơ
                                    </button>
                                } */}
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                {/* List*/}
                                <ProfileList
                                    profiles={profiles}
                                    onDelete={onDelete}
                                    onUpdate={onUpdate}
                                />
                            </Grid>
                        </Grid>
                        :
                        <Grid container spacing={2}>
                            {elmTaskForm}
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={onToggleForm}
                            >
                                <AddIcon />
                                Thêm hồ sơ
                            </button>
                            {/* List*/}
                            <ProfileList
                                profiles={profiles}
                                onDelete={onDelete}
                                onUpdate={onUpdate}
                            />
                        </Grid>
                    }
                </div>
            </div>
        </div>
    );
}