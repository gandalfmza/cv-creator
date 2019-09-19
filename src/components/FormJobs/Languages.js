import React from 'react';

const Languages = ({index, languageName, languageLevel, languageNameError, languageLevelError, onChange, hasError, onClick, onDeleteLanguage}) => {

	const handleChange = ({ target }) => {
		// console.log("target", target);
		onChange({ [target.name]: target.value, index, [target.value]: target.dataset.error });
	};
                                                                                                                            
	return (
		<div className="wrapper">
		    <div className="left">
		    	<label className={`label-idiomas ${languageNameError ? 'input-error' : ''}`}>
		            <p className="label-title">Idiomas *</p>
		            <select 
		            	className="input-idiomas" 
		            	name="languageName" 
		            	placeholder="- Seleccione Idioma -"
		            	onChange={handleChange}
		            	data-error={languageNameError}
		            	value={languageName}
		            >
		                <option disabled value="">- Seleccione Idioma -</option>
		                <option value="Espanol">Español</option>
		                <option value="Inglés">Inglés</option>
		                <option value="Italiano">Italiano</option>
		                <option value="Portugués">Portugués</option>
		                <option value="Francés">Francés</option>
		            </select>
		            <p className='errorMessage'>{`${languageNameError ? 'Este campo es requerido' : ''}`}</p>
		        </label>
		    </div>
		    <div className="right">
		    	<label className={`label-nivelIdioma ${languageLevelError ? 'input-error' : ''}`}>
		            <p className="label-title">Nivel de idioma *</p>
		            	
		            <select 
		            	className="input-nivelIdioma" 
		            	name="languageLevel"  
		            	placeholder="- Seleccione Nivel -"
		            	onChange={handleChange}
		            	data-error={languageLevelError}
		            	value={languageLevel}
		            >
		                <option disabled value="">- Seleccione Nivel -</option>
		                <option value="Básico">Básico</option>
		                <option value="Intermedio">Intermedio</option>
		                <option value="Avanzado">Avanzado</option>
		                <option value="Nativo">Nativo</option>
		            </select>
		            <p className='errorMessage'>{`${languageLevelError ? 'Este campo es requerido' : ''}`}</p>
		        </label>
		    </div>
			{index > 0 &&
				<button className="delete-language" onClick={(event) => onDeleteLanguage(event, index)}>x</button>	
			}
		</div>
	)
};

export default Languages;