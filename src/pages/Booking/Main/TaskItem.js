import React from 'react';

export default function TaskItem(props) {

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
               {task.date}
            </td>
            <td className="text-center">
               {task.hour}
            </td>
            <td className="text-center">
               {task.symptom}
            </td>
            <td className="text-center">
                <button 
                    type="button" 
                    className="btn btn-warning"
                    onClick={onUpdate}
                >
                    <span className="fa fa-pencil mr-5"></span>Chỉnh sửa
                </button>
                &nbsp;
                <button 
                    type="button" 
                    className="btn btn-danger"
                    onClick={onDelete}
                >
                    <span className="fa fa-trash mr-5"></span>Xóa lịch hẹn
                </button>
            </td>
        </tr>
    );
}