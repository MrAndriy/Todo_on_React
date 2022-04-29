import React from 'react';
import axios from 'axios';

import './Tasks.scss';

//svg
import editSvg from '../../assets/img/edit.svg';
import TaskItem from './TaskItem';

function Tasks({ lists, onEditTitle, onAddTask, onDelete }) {
	const { name, id } = lists;

	const editTitle = () => {
		const newTitle = window.prompt('enter new name of list', name);
		if (newTitle) {
			onEditTitle(id, newTitle);
			axios
				.patch('http://localhost:3001/lists/' + id, {
					name: newTitle,
				})
				.catch(() => {
					alert('Opps unsucces rename the list');
				});
		}
	};

	return (
		<div className='tasks'>
			<h2 className='tasks__title'>
				{name}
				<img onClick={editTitle} src={editSvg} alt='edit icon' />
			</h2>
			<TaskItem lists={lists} onAddTask={onAddTask} onDelete={onDelete} />
		</div>
	);
}

export default Tasks;
