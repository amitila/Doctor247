import React from 'react';

export default function TaskItem(props) {

    const onUpdateStatus = () => {
        props.onUpdateStatus(props.task.id)
    }

    const onDelete = () => {
        props.onDelete(props.task.id);
    }

    const onUpdate = () => {
        props.onUpdate(props.task.id);
    }

    const {task, index} = props;
    
    return (
        <tr>
            <td>{index}</td>
            <td>{task.name}</td>
            <td className="text-center">
                <span 
                    className={task.status === true ? 'label label-danger':'label label-success'}
                    onClick={onUpdateStatus}
                >
                    {task.status === true ? 'Active':'Hide'}
                </span>
            </td>
            <td className="text-center">
                <button 
                    type="button" 
                    className="btn btn-warning"
                    onClick={onUpdate}
                >
                    <span className="fa fa-pencil mr-5"></span>Edit
                </button>
                &nbsp;
                <button 
                    type="button" 
                    className="btn btn-danger"
                    onClick={onDelete}
                >
                    <span className="fa fa-trash mr-5"></span>Delete
                </button>
            </td>
        </tr>
    );
}