import React, { useState } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import TaskControl from './TaskControl';
import { useHistory } from "react-router-dom";

export default function Index() {
    const history = useHistory();
    const flag = (localStorage && localStorage.getItem('tasks')) ? JSON.parse(localStorage.getItem('tasks')) : [];
    const [tasks, setTasks] = useState(flag);
    const [isDisplayForm, setIsDisplayForm] = useState(false);
    const [taskEditing, setTaskEditing] = useState(null);
    //const [filter, setFilter] = useState({name: '', status: -1});
    //const [keyword, setKeyword] = useState('');
    const [sort, setSort] = useState({by: 'name', value: 1});
   
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
        history.push("/appointment");
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

    const onUpdateStatus = (id) => {
        const index = findIndex(id);
        if(index !== -1) {
            tasks[index].status = ! tasks[index].status;
            setTasks(tasks);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
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

    const onFilter = (filterName, filterStatus) => {
        // setFilter({
        //     name : filterName,
        //     status : filterStatus
        // });
        
        let temp = flag.filter((task) => {
            return task.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1;
        });
        
        temp = temp.filter((task) => {
            if(filterStatus === '-1' || filterStatus === -1){
                return task;
            }else{
                return task.status === (parseInt(filterStatus, 10) === 1 ? true : false);
            }
        });
        setTasks(temp);
    }

    const onSearch = (keyword)=>{
        //setKeyword(keyword);
        console.log(flag);
        const temp = flag.filter((task) => {
            return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
        });
        setTasks(temp);
    }

    const onSort = (sortBy, sortValue) => {
        setSort({
            by : sortBy,
            value : sortValue
        })
        if(sortBy === 'name'){
            const typeName = flag.sort((a, b) => {
                if(a.name > b.name) return sortValue;
                else if(a.name < b.name) return - sortValue;
                else return 0;
            });
            setTasks(typeName);
        }else{
            const typeStatus = flag.sort((a, b) => {
                if(a.status > b.status) return -sortValue;
                else if(a.status < b.status) return sortValue;
                else return 0;
            });
            setTasks(typeStatus);
        }
    }
   
    var elmTaskForm = isDisplayForm 
        ?   <TaskForm 
                onSubmit={onSubmit} 
                onCloseForm={onCloseForm} 
                task={taskEditing}
            /> : '';
            
    return (
        <div className="container-fluid m-50">
            <div className="text-center">
                <h1>TASK MANAGER</h1>
                <br/>
            </div>
            <div className="row">
                <div className= {isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ''} >
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
                        Add task
                    </button>&nbsp;
    
                    {/* Search-Sort */}
                    <TaskControl 
                        onSearch={onSearch} 
                        onSort={onSort}
                        sortBy={sort.by}
                        sortValue={sort.value}
                    />

                    {/* List*/}
                    <TaskList 
                        tasks={tasks} 
                        onUpdateStatus = {onUpdateStatus} 
                        onDelete={onDelete}
                        onUpdate={onUpdate}
                        onFilter={onFilter}
                    />
                </div>
            </div>
        </div>
    );
}