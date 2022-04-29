import React, { useState } from 'react';
import axios from 'axios';

//import svg
import addSvg from '../../assets/img/add.svg';

const AddTaskForm = ({ list, onAddTask }) => {
	const [visibleForm, setVisibleForm] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const [sendingData, setSendingData] = useState(false);

	const toggleVisibleForm = () => {
		setVisibleForm(!visibleForm);
		setInputValue('');
	};

	const addTask = () => {
		const obj = {
			listId: list.id,
			text: inputValue,
			completed: false,
		};
		setSendingData(true);
		axios
			.post('http://localhost:3001/tasks', obj)
			.then(({ data }) => {
				onAddTask(list.id, data);
				toggleVisibleForm();
			})
			.catch(() => alert('error with adding the task'))
			.finally(() => setSendingData(false));
	};

	return (
		<div className='tasks__form'>
			{!visibleForm ? (
				<div onClick={toggleVisibleForm} className='tasks__form-new'>
					<img src={addSvg} alt='add icon' />
					<span>new task</span>
				</div>
			) : (
				<div className='tasks__form-block'>
					<input
						onChange={(e) => setInputValue(e.target.value)}
						value={inputValue}
						className='field'
						type='text'
						placeholder='Type your task'
					/>
					<button disabled={sendingData} onClick={addTask} className='button'>
						{sendingData ? 'Addding....' : 'Add'}
					</button>
					<button onClick={toggleVisibleForm} className='button button--grey'>
						Cancel
					</button>
				</div>
			)}
		</div>
	);
};

export default AddTaskForm;
