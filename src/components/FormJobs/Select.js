import React from 'react';

const Select = ({ name, title, type, placeholder, onChange, onBlur, onFocus, value, hasError, valueType, options, validateOnChange, validateOnBlur }) => (

	<label className={`label-${name} ${hasError ? 'input-error' : ''}`}>
		<p className="label-title">{title}</p>
		<select
			className={`input-${name}`}
			type={type}
			name={name}
			placeholder={placeholder}
			onChange={event => onChange(event, validateOnChange)}
			onBlur={event => onBlur(event, validateOnBlur)}
			onFocus={onFocus}
			value={value}
		>
			<option disabled="true" value="">{placeholder}</option>
			{options.map(optionValue => <option key={optionValue} value={optionValue}>{optionValue}</option>)}		
		</select>
		<p className='errorMessage'>Este campo es requerido</p>
	</label>

);

export default Select;