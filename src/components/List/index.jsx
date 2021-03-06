import React from 'react';
import classNames from 'classnames';
import axios from 'axios';
//styles
import './List.scss';
//components
import Badge from '../Badge/index';
import removeSvg from '../../assets/img/close.svg';

const List = ({
	items,
	isRemovable,
	onClick,
	onRemove,
	onClickItem,
	activeItem,
}) => {
	const removeList = (item) => {
		if (window.confirm('You wanna remove list ?')) {
			axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
				onRemove(item.id);
			});
		}
	};

	return (
		<ul onClick={onClick} className='list'>
			{items.map((item, index) => (
				<li
					key={item.id || index}
					className={classNames(item.className, {
						active: activeItem && activeItem.id === item.id,
					})}
					onClick={onClickItem ? () => onClickItem(item) : null}
				>
					<i>{item.icon ? item.icon : <Badge color={item.color.name} />}</i>
					<span>
						{item.name}
						{item.tasks && ` (${item.tasks.length})`}
					</span>
					{isRemovable && (
						<img
							onClick={() => removeList(item)}
							className='list__remove-icon'
							src={removeSvg}
							alt='remove icons'
						/>
					)}
				</li>
			))}
		</ul>
	);
};

export default List;
