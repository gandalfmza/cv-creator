import React from 'react';

const Select = ({ name, title, type, placeholder, onChange, onBlur, onFocus, value, options }) => (

	<label className={`label-${name}`}>
		<p className="label-title">{title}</p>
		<select
			className={`input-${name}`}
			type={type}
			name={name}
			placeholder={placeholder}
			onChange={onChange}
			onBlur={onBlur}
			onFocus={onFocus}
			value={value}
		>
			<option disabled="true" value="">{placeholder}</option>
			{options.map(optionValue => <option key={optionValue} value={optionValue}>{optionValue}</option>)}		
		</select>
	</label>

);

export default Select;