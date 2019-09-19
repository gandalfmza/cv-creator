import React from 'react';

const Radio = ({ name, title, type, placeholder, onChange, onBlur, onFocus, value, checked, valueType, hasError, validateOnChange }) => (
	<label className={`label-${name} ${type} ${hasError ? 'input-error' : ''}`}>
		<input
			className={`input-${name} ${type}`}
			type="radio"
			name={name}
			onChange={event => onChange(event, validateOnChange)}
			// onBlur={onBlur}
			// onFocus={onFocus}
			value={value}
			checked={checked}
		/>
		<p className="radio-title">{title}</p> <br/>
	</label>

);

export default Radio;