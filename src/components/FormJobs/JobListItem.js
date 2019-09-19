import React from 'react';

const JobListItem = ({ onSelectJob, name, title }) => (

	<li onClick={() => onSelectJob(name)}>
		<div 
			className={`icn_public ${name} subtitle`}>
		</div>
		
		<button 
			className="jobs-list-button">
			{name}
		</button>
	</li>
);

export default JobListItem;