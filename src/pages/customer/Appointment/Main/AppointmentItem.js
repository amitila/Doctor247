import React from 'react';
import { CardMedia } from '@material-ui/core';

export default function TaskItem(props) {

    const onDelete = () => {
        props.onDelete(props.task.id);
    }

    const onUpdate = () => {
        props.onUpdate(props.task.id);
    }

    const {task, index} = props;
    const images = task.images;
    
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
               {task.doctor}
            </td>
            <td className="text-center">
               {task.symptom}
            </td>
            <td className="text-center">
                {
                    images ? images.map(image => {
                        return<CardMedia
                            component="img"
                            height={task.images.length === 1 ? 250 : 150}
                            image={image}
                            alt="Ảnh đính kèm"
                        />
                    }) : ''
                }
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