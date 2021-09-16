import React, { useState } from 'react';
import ProfileForm from './ProfileForm';
import ProfileList from './ProfileList';
import { useHistory } from "react-router-dom";

export default function Index() {
    const history = useHistory();
    const flag = (localStorage && localStorage.getItem('tasks')) ? JSON.parse(localStorage.getItem('tasks')) : [];
    const [tasks, setTasks] = useState(flag);
    const [isDisplayForm, setIsDisplayForm] = useState(false);
    const [taskEditing, setTaskEditing] = useState(null);
   
    const s4 = () => {
        return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1);
    }

    const generateID = () => {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    const onToggleForm = (event) => {//Add task
        if(isDisplayForm && taskEditing !== null){
            setIsDisplayForm(true);
            setTaskEditing(null);
        }else{
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
        if(data.id === ''){
            data.id = generateID();
            tasks.push(data);
        }else{
            //Editing
            const index = findIndex(data.id);
            tasks[index] = data;
        }
        setTasks(tasks);
        setTaskEditing(null);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    const findIndex = (id) => {
        let result = -1;
        tasks.forEach((task, index) => {
            if(task.id === id) {
                result = index;
            }
        });
        return result;
    }

    const onDelete = (id) => {
        const index = findIndex(id);
        if(index !== -1) {
            tasks.splice(index, 1);
            console.log(tasks);
            // setTasks(tasks);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
        onCloseForm();
    }

    const onUpdate = (id) => {
        const index = findIndex(id);
        const taskEditing = tasks[index];
        setTaskEditing(taskEditing);
        onShowForm();
    }
   
    var elmTaskForm = isDisplayForm 
        ?   <ProfileForm 
                onSubmit={onSubmit} 
                onCloseForm={onCloseForm} 
                task={taskEditing}
            /> : '';
            
    return (
        <div className="container-fluid m-50">
            <div className="text-center">
                <h1>Hồ sơ gia đình</h1>
                <br/>
            </div>
            <div className="row">
                <div className= {isDisplayForm ? "col-xs-12 col-sm-12 col-md-12 col-lg-12" : ''} >
                    {/*Form*/}
                    {elmTaskForm}
                </div>
                <div className= {isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"} >
                    <button 
                        type="button" 
                        className="btn btn-primary"
                        onClick={onToggleForm}
                    >
                        <span className="fa fa-plus mr-5"></span>
                        Thêm hồ sơ
                    </button>&nbsp;

                    {/* List*/}
                    <ProfileList 
                        tasks={tasks} 
                        onDelete={onDelete}
                        onUpdate={onUpdate}
                    />
                </div>
            </div>
        </div>
    );
}