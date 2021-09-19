import React, { useEffect } from 'react';

export default function TaskForm(props) {

	const flag = props.task ? {
		id : props.task.id,
		name : props.task.name,
		status : props.task.status
	} : {
		id : '',
		name : '',
		status : false
	};
	
	const [state, setState] = React.useState(flag);
	
	useEffect(() => {
		if(props && props.task){
			setState({
				id : props.task.id,
				name :props.task.name,
				status : props.task.status
			});
		}else if(!props.task){
			setState({
				id : '',
				name : '',
				status : false
			});
		}
	},[props]);

	const onCloseForm = (event) => {
		props.onCloseForm();
	}

	const onChange = (event) => {
		let target = event.target;
		let name = target.name;
		let value = target.value;
		if(name === 'status') {
			value = target.value === 'true' ? true : false;
		}
		//setState({name: value});
		setState(prevState => ({...prevState, [name]: value}));
	}

	const onSubmit = (event) => {
		event.preventDefault();
		console.log(state);
		props.onSubmit(state);
		//Clear and Close form
		onClear();
		onCloseForm();
	}

	const onClear = () => {
		setState({
			name : '',
			status : false
		});
	}
   
	return (
		<div className="panel panel-warning">
			<div className="panel-heading">
				<h3 className="panel-title">
					{state.id !== '' ? 'Update task' : 'Add task'}
					<span 
						className="fa fa-times-circle text-right" 
						onClick={onCloseForm}
					></span>
				</h3>
			</div>
			<div className="panel-body">
				<form onSubmit={onSubmit} >
					<div className="form-group">
						<label>Name:</label>
						<input 
							type="text" 
							className="form-control" 
							name="name"
							value={state.name}
							onChange={onChange}
						/>
					</div>
					<label>Status:</label>
					<select 
						className="form-control" 
						name="status"
						value={state.status}
						onChange={onChange}
					>
						<option value={true} >Active</option>
						<option value={false} >Hide</option>
					</select>
					<br/>
					<div className="text-center">
						<button type="submit" className="btn btn-warning">
						<span className="fa fa-plus mr-5"></span>Submit
						</button>
						&nbsp;
						<button 
							type="button" 
							className="btn btn-danger"
							onClick={onClear}
						><span className="fa fa-close mr-5"></span>Clear
						</button>
					</div>
				</form>
			</div>
		</div>
	);

}

