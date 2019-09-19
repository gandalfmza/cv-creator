import React from 'react';

const Input = ({ name, title, type, placeholder, onChange, onBlur, onFocus, value, hasError, valueType, validateOnBlur, validateOnChange }) => (

	<label className={`label-${name} ${hasError ? 'input-error' : ''}`}>
		<p className="label-title">{title}</p>
		<input
			className={`input-${name} ${valueType}`}
			type={type}
			name={name}
			placeholder={placeholder}
			onChange={event => onChange(event, validateOnChange)}
			onBlur={event => onBlur(event, validateOnBlur)}
			onFocus={onFocus}
			value={value}
		/>

		<p className='errorMessage'>{hasError}</p>
	</label>

);

export default Input;