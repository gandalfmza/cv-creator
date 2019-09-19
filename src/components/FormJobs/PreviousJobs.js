import React from 'react';

const PreviousJobs = ({index, nombreEmpleo, detallesEmpleo, onChange, validateOnBlurNombreEmpleo, validateOnBlurDetallesEmpleo, validateOnBlurJobs, previousJobNameError, previousJobObsError, onBlur, onDeleteJob}) => {
	const handleChange = ({ target }) => {
		onChange({ 
			[target.name]: target.value, 
			index, 
			"data-error": target.dataset.error 
		});
	};

	return (
		<div className="wrapper previous-jobs-wrapper">
			<div className={`left ${previousJobNameError ? 'input-error' : ''}`}>
				<p className="label-title">Empleo Anterior *</p>
				<input 
					type="text" 
					className="input-empleoAnterior text" 
					name="nombreEmpleo"
					placeholder="" 
					onChange={handleChange}
					onBlur={validateOnBlurJobs}
					value={nombreEmpleo}
					data-error={previousJobNameError}
				/>
				<p className='errorMessage'>{`${previousJobNameError ? 'Este campo es requerido' : ''}`}</p>

			</div>
			<div className={`right ${previousJobObsError ? 'input-error' : ''}`}>
				<label className="label-empleoAnteriorObs textarea">
					<p className="label-title">Detallar área, cargo, empresa, tareas que realiza, fecha de ingreso y egreso *</p>
					<textarea 
						className="input-empleoAnteriorObs" 
						name="detallesEmpleo"
						onChange={handleChange}
						placeholder="" 
						onBlur={validateOnBlurJobs}
						value={detallesEmpleo}
						data-error={previousJobObsError}
					></textarea>
				</label>
				<p className='errorMessage'>{`${previousJobObsError ? 'Este campo es requerido' : ''}`}</p>
			</div>

			{index > 0 &&
				<button className="delete-job" onClick={(event) => onDeleteJob(event, index)}>x</button>	
			}
		</div>
	)
};

export default PreviousJobs;