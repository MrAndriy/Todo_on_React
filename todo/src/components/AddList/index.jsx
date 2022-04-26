import React, { useState } from 'react';
import List from '../List';
import './AddList.scss';
import Badge from '../Badge/index';
import closeSvg from '../../assets/img/close.svg';

function AddList({ colors }) {
	const [visiblePopUp, setvisiblePopUp] = useState(false);
	const [selectedColor, setSelectedColor] = useState(colors[0].id);

	console.log(selectedColor);

	return (
		<div className='add-list'>
			<List
				onClick={() => setvisiblePopUp(true)}
				items={[
					{
						className: 'list__add-button',
						icon: (
							<svg
								width='12'
								height='12'
								viewBox='0 0 16 16'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M8 1V15'
									stroke='black'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
								<path
									d='M1 8H15'
									stroke='black'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						),
						name: 'Add list',
					},
				]}
			/>
			{visiblePopUp && (
				<div className='add-list__popup'>
					<img
						onClick={() => setvisiblePopUp(!visiblePopUp)}
						src={closeSvg}
						alt='close btn'
						className='add-list__popup-close-btn'
					/>
					<input className='field' type='text' placeholder='Folder name' />
					<div className='add-list__popup-colors'>
						{colors.map((color) => (
							<Badge
								onClick={() => setSelectedColor(color.id)}
								key={color.id}
								color={color.name}
								className={selectedColor === color.id && 'active'}
							/>
						))}
					</div>
					<button className='button'>Add</button>
				</div>
			)}
		</div>
	);
}

export default AddList;
