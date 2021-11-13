import React from 'react';
import MRItem from './MRItem';
import { Grid } from '@material-ui/core'

export default function MRList(props) {

    const [state, setState] = React.useState({
        filterId : '',
        filterPatient : '',
        filterDoctor : '',
        filterDateTime : '',
        filterCreatedAt : '',
    });

    const onChange = (event) => {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        props.onFilter(
            name === 'filterId' ? value : state.filterId,
            name === 'filterPatient' ? value : state.filterPatient,
            name === 'filterDoctor' ? value : state.filterDoctor,
            name === 'filterDateTime' ? value : state.filterDateTime,
            name === 'filterCreatedAt' ? value : state.filterCreatedAt,   
        )
        setState(prevState => ({...prevState, [name]: value}));
        console.log(state);
    }
 
    const {medicalRecords} = props;
    const elmTasks = medicalRecords.map((task, index) => {
        return <MRItem 
                    key={task.id} 
                    index={index + 1} 
                    task={task} 
                    handleChangeVisible={props.handleChangeVisible}
                />
    });

    const unique = (arr) => {
        var newArr = []
        for (var i = 0; i < arr.length; i++) {
            if (newArr.indexOf(arr[i]) === -1) {
                newArr.push(arr[i])
            }
        }
        return newArr
    }

    const filterPatientArr = medicalRecords?.map(item => {
        return item.patient;
    })
    const filterDoctorArr = medicalRecords?.map(item => {
        return item.doctor;
    })
    const filterDateTimeArr = medicalRecords?.map(item => {
        return item.dateTime;
    })
    const filterCreatedAt = medicalRecords?.map(item => {
        return item.createdAt;
    })

    return (
        <>
            <table className="table table-borderd table-hover mt-15">
                <thead>
                    <tr>
                        <th className="text-center" >Mã nhận dạng</th>
                        <th className="text-center">Bệnh nhân</th>
                        <th className="text-center">Bác sĩ</th>
                        <th className="text-center">Ngày khám</th>
                        <th className="text-center">Ngày trả kết quả</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <select 
                            className="form-control"
                            name="filterId"
                            value={state.filterId}
                            onChange={onChange}
                        >
                            <option value={''} >Tất cả</option>
                            {
                                medicalRecords?.map(item => {
                                    return <option value={item.id} >#{item.id}</option>
                                })
                            }
                        </select>
                    </td>
                    <td>
                        <select 
                            className="form-control"
                            name="filterPatient"
                            value={state.filterPatient}
                            onChange={onChange}
                        >
                            <option value={''} >Tất cả</option>
                            {
                                unique(filterPatientArr).map(item => {
                                    return <option value={item} >{item}</option>
                                })
                            }
                        </select>
                    </td>
                    <td>
                        <select 
                            className="form-control"
                            name="filterDoctor"
                            value={state.filterDoctor}
                            onChange={onChange}
                        >
                            <option value={''} >Tất cả</option>
                            {
                                unique(filterDoctorArr).map(item => {
                                    return <option value={item} >{item}</option>
                                })
                            }
                        </select>
                    </td>
                    <td>
                        <select 
                            className="form-control"
                            name="filterDateTime"
                            value={state.filterDateTime}
                            onChange={onChange}
                        >
                            <option value={''} >Tất cả</option>
                            {
                                unique(filterDateTimeArr).map(item => {
                                    return <option value={item.slice(0,10)} >{item.slice(0,10)}</option>
                                })
                            }
                        </select>
                    </td>
                    <td>
                        <select 
                            className="form-control"
                            name="filterCreatedAt"
                            value={state.filterCreatedAt}
                            onChange={onChange}
                        >
                            <option value={''} >Tất cả</option>
                            {
                                unique(filterCreatedAt).map(item => {
                                    return <option value={item.slice(0,10)} >{item.slice(0,10)}</option>
                                })
                            }
                        </select>
                    </td>
                </tr>
                </tbody> 
            </table>  
            <Grid container spacing={5}>
                <Grid item xs={12} sm={11}>
                    {elmTasks}
                </Grid>
                <Grid item xs={12} sm={1}>
                   
                </Grid>
            </Grid>
        </>
    );

}