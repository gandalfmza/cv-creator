import React, { Component } from 'react';
import Input from './Input';
import Select from './Select';
import TextArea from './TextArea';
import Radio from './Radio';
import PreviousJobs from './PreviousJobs';
import Languages from './Languages';
import axios from 'axios';
import { isNumber, isRequired, maxLength, isEmail, isDate, isChecked, isPhone } from './ValidationRules'
import { nationalityOptions, cityOptions, maritalStatusOptions, workAreaOptions, studiesOptions, computerOptions, languageOptions, languageLevelOptions, workHoursOptions } from './selectOptions';


function logChange(val) {
  console.log("Selected: " + JSON.stringify(val));
}

class Form extends Component {

	componentDidMount () {
	  window.scrollTo(0, 0)
	}

	constructor() {
		super();
		this.state = {
			userId: "",
			photo: {
				name: "",
				uploaded: false
			},
			jobs: [
				{
					previousJobNameError: false,
					previousJobObsError: false,
					nombreEmpleo: "",
					detallesEmpleo: ""
				}],
			languages: [
				{
					languageHasError: false,
					levelHasError: false,
					languageName: "",
					languageLevel: ""
				}],
			field: {
				foto: '',
				nombre: '',
				apellido: '',
				domicilio: '',
				telefono: '',
				celular: '',
				email: '',
				dni: '',
				nacimiento: '',
				nacionalidad: '',
				provincia: '',
				localidad: '',
				estadoCivil: '',
				areaPostulacion: '',
				nivelEstudios: '',
				nivelEstudiosObs: '',
				analiticoSecundario: '',
				estudiaActualmente: '',
				horariosEstudio: '',
				nivelComputacion: '',
				nivelComputacionObs: '',
				idiomas: {
					Ingles: "",
					Italiano: "",
					Frances: "",
					Portugues: ""
				},
				trabajaActualmente: '',
				trabajoActual: '',
				trabajoActualObs: '',
				disponibilidadLaboral: '',
				remuneracionPretendida: ''
			},
			isSubmitError: false,
			inputHasError: {
				foto: "",
				nombre: "",
				apellido: "",
				domicilio: "",
				telefono: "",
				celular: "",
				email: "",
				dni: "",
				nacimiento: "",
				nacionalidad: "",
				provincia: "",
				localidad: "",
				estadoCivil: "",
				areaPostulacion: "",
				nivelEstudios: "",
				nivelEstudiosObs: "",
				analiticoSecundario: "",
				estudiaActualmente: "",
				horariosEstudio: "",
				nivelComputacion: "",
				nivelComputacionObs: "",
				idiomas: "",
				trabajaActualmente: "",
				trabajoActual: "",
				trabajoActualObs: "",
				empleoAnterior: "",
				empleoAnteriorObs: "",
				disponibilidadLaboral: "",
				remuneracionPretendida: ""
			}
		};

		this.fields = [ "nombre", "apellido", "domicilio", "telefono", "celular", "email", "dni", "nacimiento", "nacionalidad", "provincia", "localidad", "estadoCivil", "areaPostulacion", "nivelEstudios", "nivelEstudiosObs", "analiticoSecundario", "estudiaActualmente", "horariosEstudio", "nivelComputacion", "nivelComputacionObs", "trabajaActualmente", "trabajoActual", "trabajoActualObs", "disponibilidadLaboral", "remuneracionPretendida"];

		this.validations = {
			nombre: [isRequired],
			apellido: [isRequired],
			domicilio: [isRequired],
			telefono: [isRequired, isPhone],
			celular: [isRequired, isPhone],
			email: [isRequired, isEmail],
			dni: [isRequired, isNumber],
			nacimiento: [isRequired, isDate],
			nacionalidad: [isRequired],
			provincia: [isRequired],
			localidad: [isRequired],
			estadoCivil: [isRequired],
			areaPostulacion: [isRequired],
			nivelEstudios: [isRequired],
			nivelEstudiosObs: [isRequired],
			analiticoSecundario: [isRequired],
			estudiaActualmente: [isRequired],
			horariosEstudio: "",
			nivelComputacion: [isRequired],
			nivelComputacionObs: [isRequired],
			trabajaActualmente: [isRequired],
			trabajoActual: [isRequired],
			trabajoActualObs: [isRequired],
			empleoAnterior: [isRequired],
			empleoAnteriorObs: [isRequired],
			disponibilidadLaboral: [isRequired],
			remuneracionPretendida: [isRequired],
			foto: [isRequired],
			languageName: [isRequired],
			languageLevel: [isRequired],
			nombreEmpleo: [isRequired],
			detallesEmpleo: [isRequired]
		}
	}

	
	handleInputChange = (event) => {
		const { target } = event;
		const { value, name, className, type } = target;
		const field = Object.assign({}, this.state.field);

		if (type === "radio") {

			this.setState((prevState) => {
				const inputHasError = Object.assign({}, prevState.inputHasError);
				inputHasError[name] = "";
				return { inputHasError }
			})
		}

		field[name] = value;
			return this.setState({ field });


		if(value === '') {
			return this.setState({ field });
		}
	}


	handleSelect = (event) => {
		const { value, name } = event.target;

		this.setState({
			field: Object.assign({}, this.state.field, {
				[name]: value,
			}),
		});
	}

	addLanguage = (event) => {
		event.preventDefault();
		const languages = [...this.state.languages, { languageName: "", languageLevel: "", languageHasError: false, levelHasError: false, }];
		this.setState({ languages });
	}

	handleLanguageChange = (language) => {

		const { index } = language;
		
		const languages = this.state.languages.map((currentLanguage, currentIndex) => {
			if(currentIndex != index) {
				return currentLanguage;
			}

			const updatedCurrentLanguage = Object.assign({}, currentLanguage);

			if(language.languageName) {
				updatedCurrentLanguage.languageName = language.languageName;
			}

			if(language.languageLevel) {
				updatedCurrentLanguage.languageLevel = language.languageLevel;
			}

			return updatedCurrentLanguage;
		});


		this.setState({ languages })
	}

	handleDeleteLanguage = (event, index) => {
		event.preventDefault();
		const languagesArray = this.state.languages;
		languagesArray.splice(index,1);
		this.setState({ languages: languagesArray });
	}

	addJob = (event) => {
		event.preventDefault();
		const jobs = [...this.state.jobs, { nombreEmpleo: "", detallesEmpleo: "" }];
		this.setState({ jobs });
	}

	handleJobChange = (job) => {
		const { index, detallesEmpleo, nombreEmpleo } = job;
		
		const jobs = this.state.jobs.map((currentJob, currentIndex) => {
			if(currentIndex != index) {
				return currentJob;
			}
			const updatedCurrentJob = Object.assign({}, currentJob);
			
			if(typeof job.nombreEmpleo == 'string') {
				updatedCurrentJob.nombreEmpleo = job.nombreEmpleo;
			} 

			if(typeof job.detallesEmpleo == 'string') {
				updatedCurrentJob.detallesEmpleo = job.detallesEmpleo;
			} 

			return updatedCurrentJob;
		});
		
		this.setState({ jobs })
	}

	handleDeleteJob = (event, index) => {
		event.preventDefault();
		const jobsArray = this.state.jobs;
		jobsArray.splice(index,1);
		this.setState({ jobs: jobsArray });
	}

	updateInputErrorState(name, message) {
		this.setState((prevState) => {
			const inputHasError = Object.assign({}, prevState.inputHasError);
			inputHasError[name] = message;
			return { inputHasError }
		})
	}

	attachFile = (event) => {
		const {name} = event.target.files[0];
		const field = Object.assign({}, this.state.field);

		this.setState({
			photo: Object.assign({}, this.state.photo, {
				name,
			}),
		});

		this.setState({
			field: Object.assign({}, this.state.field, {
				foto: name,
			}),
		});

	}


	validateLanguages = () => {
		const languages = this.state.languages.slice();

		this.state.languages.forEach((name, index) => {
			const languageName = this.state.languages[index].languageName;
			const languageLevel = this.state.languages[index].languageLevel;

			if (languageName == '') {
				let languagesNameNew = languages;
				languagesNameNew[index].languageHasError = true;
				this.setState({languages: languagesNameNew});
			} else {
				let languagesNameNew = languages;
				languagesNameNew[index].languageHasError = false;
				this.setState({languages: languagesNameNew});
			}
			
			if (languageLevel == '') {
				let languagesLevelNew = languages;
				languagesLevelNew[index].levelHasError = true;
				this.setState({languages: languagesLevelNew});
			} else {
				let languagesLevelNew = languages;
				languagesLevelNew[index].levelHasError = false;
				this.setState({languages: languagesLevelNew});
			}
		});
	}

	validateJobs = () => {
		const jobs = this.state.jobs.slice();

		this.state.jobs.forEach((name, index) => {
			const nombreEmpleo = this.state.jobs[index].nombreEmpleo;
			const detallesEmpleo = this.state.jobs[index].detallesEmpleo;

			if (nombreEmpleo == '') {
				let jobsNameNew = jobs;
				jobsNameNew[index].previousJobNameError = true;
				this.setState({jobs: jobsNameNew});
			} else {
				let jobsNameNew = jobs;
				jobsNameNew[index].previousJobNameError = false;
				this.setState({jobs: jobsNameNew});
			}
			
			if (detallesEmpleo == '') {
				let jobsLevelNew = jobs; 
				jobsLevelNew[index].previousJobObsError = true;
				this.setState({jobs: jobsLevelNew});
			} else {
				let jobsLevelNew = jobs;
				jobsLevelNew[index].previousJobObsError = false;
				this.setState({jobs: jobsLevelNew});
			}

		});
	}

	setPostulatioState = () => {
		const field = Object.assign({}, this.state.field);

		if (this.props.name == "Cajero") {
			this.setState({
				field: Object.assign({}, this.state.field, {
					areaPostulacion: "Cajero",
				}),
			});
		} else if (this.props.name == "Vendedor") {
			this.setState({
				field: Object.assign({}, this.state.field, {
					areaPostulacion: "Vendedor",
				}),
			});
		} else if (this.props.name == "Cadete") {
			this.setState({
				field: Object.assign({}, this.state.field, {
					areaPostulacion: "Cadete",
				}),
			});
		}
	}

	validateTextInputs = () => {

		const inputHasError = Object.assign({}, this.state.inputHasError);

		Object.keys(this.validations).forEach(name => {
			const validations = this.validations[name];
			const value = this.state.field[name];
			const message = this.getMessageError(value, validations);
			inputHasError[name] = message;
		});

		const isValid = Object.keys(inputHasError).every(name => inputHasError[name] == '');

		this.setState({ inputHasError, isSubmitError: !isValid });

		// if(isValid) {
		// 	*******.MasterData.insert({}, "PO").done(res => {
		// 		const id = res.getResults().Id.replace('PO-', '');
		// 		this.setState({userId: id})
		// 		{this.submitForm()}
		// 	})
		// }
	}

	handleSubmit = (event) => {
		event.preventDefault();

		this.setPostulatioState();

		this.validateLanguages();

		this.validateJobs();

		this.validateTextInputs();
	}

	getMessageError(value, validations) {
		let message = '';

		for(const validate of validations) {
			message = validate(value);

			if(message) {
				break;
			}
		}

		return message;
	}

	handleOnBlur = (event, validations) => {
		const { value, name } = event.target;
		
		const message = this.getMessageError(value, validations)

		this.updateInputErrorState(name, message);
	}

	submitForm() {
		const { field, termsChecked, inputHasError, jobs, languages } = this.state;

		const { foto, nombre, apellido, domicilio, telefono, celular, email, dni, nacimiento, nacionalidad, provincia, localidad, estadoCivil, areaPostulacion, 
			nivelEstudios, nivelEstudiosObs, analiticoSecundario, estudiaActualmente, horariosEstudio, nivelComputacion, nivelComputacionObs,
			trabajaActualmente, trabajoActual, trabajoActualObs, disponibilidadLaboral, remuneracionPretendida } = this.state.field;

		const { nombreEmpleo, detallesEmpleo } = this.state.jobs;
		const { languageName, languageLevel } = this.state.languages;

		

		let previousJobs =
			jobs.map(function(elem){
			return "Empresa: " + elem.nombreEmpleo + " - Detalle: " + elem.detallesEmpleo + " ";
			}).join(" / ");

		let totalLanguages =
			languages.map(function(elem){
			return "Idioma: " + elem.languageName + " - Nivel: " + elem.languageLevel + " ";
			}).join(" / ");


		let config = {
		  headers: {
			'Accept': 'application/vnd.vtex.ds.v10+json'
		  }
		};

		const userId = this.state.userId;

		var formData = new FormData();
		var imagefile = document.getElementById('input-foto');
		formData.append('image', imagefile.files[0]);
		// axios.post(`http://api.vtex.com/********/dataentities/PO/documents/${userId}/foto/attachments`, formData, {
		// 	headers: {
		// 	  'Content-Type': 'multipart/form-data'
		// 	}
		// })

		const postulacion = this.props.name;

		const fieldsData = {
			postulacion: postulacion,
			jobs: previousJobs,
			languages: totalLanguages,
			nombre: nombre,
			apellido: apellido,
			domicilio: domicilio,
			telefono: telefono,
			celular: celular,
			email: email,
			dni: dni,
			nacimiento: nacimiento,
			nacionalidad: nacionalidad,
			provincia: provincia,
			localidad: localidad,
			estadoCivil: estadoCivil,
			areaPostulacion: areaPostulacion,
			nivelEstudios: nivelEstudios,
			nivelEstudiosObs: nivelEstudiosObs,
			analiticoSecundario: analiticoSecundario,
			estudiaActualmente: estudiaActualmente,
			horariosEstudio: horariosEstudio,
			nivelComputacion: nivelComputacion,
			nivelComputacionObs: nivelComputacionObs,
			trabajaActualmente: trabajaActualmente,
			trabajoActual: trabajoActual,
			trabajoActualObs: trabajoActualObs,
			disponibilidadLaboral: disponibilidadLaboral,
			remuneracionPretendida: remuneracionPretendida
		}

		// Fizzmod.MasterData.insertUpdate(userId, fieldsData, "PO");

		this.props.onSubmit()
	}


	render() {
		const { nombre, apellido, domicilio, telefono, celular, email, dni, nacimiento, nacionalidad, provincia, localidad, estadoCivil, areaPostulacion, nivelEstudios, nivelEstudiosObs, analiticoSecundario, estudiaActualmente, horariosEstudio, nivelComputacion, nivelComputacionObs, trabajaActualmente, trabajoActual,trabajoActualObs, empleoAnterior, empleoAnteriorObs, disponibilidadLaboral, remuneracionPretendida, foto } = this.state.field;
		const { inputHasError } = this.state;

		return (
			<div className="Form">
				<h2>{this.props.name}</h2>

				<form className="form-jobs" onSubmit= {this.handleSubmit}>
					<h3>DATOS PERSONALES</h3>

					<div className="personal-data">
						<div className={`label-foto ${inputHasError.foto ? 'input-error' : ''}`}>
							<p className="label-title">Foto *</p>
							<input type="file" className="input-foto" id="input-foto" name="foto" onChange={this.attachFile}/>
							<label htmlFor="input-foto"><strong>Subir archivo</strong></label>
							<p className="photo-name">{this.state.photo.name}</p>
							<p className="errorMessage">Este campo es requerido</p>
						</div>

						<Input
							title="Nombre *"
							name="nombre"
							type="text"
							placeholder=""
							onChange={this.handleInputChange}
							onBlur={this.handleOnBlur}
							hasError={inputHasError.nombre}
							value={nombre}
							valueType="text"
							validateOnBlur={this.validations.nombre}
						/>

						<Input
							title="Apellido *"
							name="apellido"
							type="text"
							placeholder=""
							onChange={this.handleInputChange}
							onBlur={this.handleOnBlur}
							hasError={inputHasError.apellido}
							value={apellido}
							valueType="text"
							validateOnBlur={this.validations.apellido}
						/>

						<Input
							title="Domicilio *"
							name="domicilio"
							type="text"
							placeholder=""
							onChange={this.handleInputChange}
							onBlur={this.handleOnBlur}
							hasError={inputHasError.domicilio}
							value={domicilio}
							valueType="text"
							validateOnBlur={this.validations.domicilio}
						/>

						<Input
							title="Teléfono *"
							name="telefono"
							type="text"
							placeholder=""
							onChange={this.handleInputChange}
							onBlur={this.handleOnBlur}
							hasError={inputHasError.telefono}
							value={telefono}
							valueType="number"
							validateOnChange={[maxLength]}
							validateOnBlur={this.validations.telefono}
						/>

						<Input
							title="Celular *"
							name="celular"
							type="text"
							placeholder=""
							onChange={this.handleInputChange}
							onBlur={this.handleOnBlur}
							hasError={inputHasError.celular}
							value={celular}
							valueType="number"
							validateOnBlur={this.validations.celular}
						/>

						<Input
							title="E-Mail *"
							name="email"
							type="text"
							placeholder=""
							onChange={this.handleInputChange}
							onBlur={this.handleOnBlur}
							hasError={inputHasError.email}
							value={email}
							valueType="text"
							validateOnBlur={this.validations.email}
						/>

						<Input
							title="D.N.I. *"
							name="dni"
							type="text"
							placeholder=""
							onChange={this.handleInputChange}
							onBlur={this.handleOnBlur}
							hasError={inputHasError.dni}
							value={dni}
							valueType="number"
							validateOnChange={[isNumber]}
							validateOnBlur={this.validations.dni}
						/>

						<Input
							title="Fecha de nacimiento * (dd/mm/aa)"
							name="nacimiento"
							type="text"
							placeholder=""
							onChange={this.handleInputChange}
							onBlur={this.handleOnBlur}
							hasError={inputHasError.nacimiento}
							value={nacimiento}
							valueType="text"
							validateOnBlur={this.validations.nacimiento}
						/>

						<Select
							title="Nacionalidad *"
							name="nacionalidad"
							value={this.state.field.nacionalidad}
							placeholder={"- Seleccione Nacionalidad -"}
							options={nationalityOptions}
							onChange={this.handleSelect}
							hasError={inputHasError.nacionalidad}
							onBlur={this.handleOnBlur}
							validateOnBlur={this.validations.nacionalidad}
						/>

						<Select
							title="Provincia *"
							name="provincia"
							value={this.state.field.provincia}
							placeholder={"- Seleccione Provincia -"}
							options={cityOptions}
							onChange={this.handleSelect}
							hasError={inputHasError.provincia}
							onBlur={this.handleOnBlur}
							validateOnBlur={this.validations.provincia}
						/>

						<Input
							title="Localidad *"
							name="localidad"
							type="text"
							placeholder=""
							onChange={this.handleInputChange}
							onBlur={this.handleOnBlur}
							hasError={inputHasError.localidad}
							value={localidad}
							valueType="text"
							validateOnBlur={this.validations.localidad}
						/>

						<Select
							title="Estado Civil *"
							name="estadoCivil"
							value={this.state.field.estadoCivil}
							placeholder={"- Seleccione Estado Civil -"}
							options={maritalStatusOptions}
							onChange={this.handleSelect}
							hasError={inputHasError.estadoCivil}
							onBlur={this.handleOnBlur}
							validateOnBlur={this.validations.estadoCivil}
						/>

						{this.props.name == "Administrativo" &&
							<Select
								title="Área que se postula *"
								name="areaPostulacion"
								value={this.state.field.areaPostulacion}
								placeholder={"- Seleccione Área -"}
								options={workAreaOptions}
								onChange={this.handleSelect}
								hasError={inputHasError.areaPostulacion}
								onBlur={this.handleOnBlur}
								validateOnBlur={this.validations.areaPostulacion}
							/>
						}
					</div>

					<h3>ESTUDIOS Y EXPERIENCIA LABORAL</h3>

					<div className="prev-experience">

						<div className="container studies">
					
							<div className="left">
								<Select
									title="Nivel de estudios *"
									name="nivelEstudios"
									value={this.state.field.nivelEstudios}
									placeholder={"- Seleccione Nivel -"}
									options={studiesOptions}
									onChange={this.handleSelect}
									hasError={inputHasError.nivelEstudios}
									onBlur={this.handleOnBlur}
									validateOnBlur={this.validations.nivelEstudios}
								/>
							</div>

							<div className="right">
								<TextArea
									title="Observaciones (Detallar lugar y Carrera) *"
									name="nivelEstudiosObs"
									type="text"
									placeholder=""
									onChange={this.handleInputChange}
									onBlur={this.handleOnBlur}
									hasError={inputHasError.nivelEstudiosObs}
									value={nivelEstudiosObs}
									valueType="textarea"
									validateOnBlur={this.validations.nivelEstudiosObs}
								/>
							</div>
						</div>

						<div className="container highschool">
							<div className="left">
								<div className={`radio-wrapper ${inputHasError.analiticoSecundario ? 'input-error' : ''}`}>
									<p className="label-title">Analitico del Secundario *</p>
									<div className={`radio-container ${inputHasError.analiticoSecundario ? 'input-error' : ''}`}>
										<Radio
											title="Si"
											name="analiticoSecundario"
											type="radio"
											onChange={this.handleInputChange}
											// onBlur={this.handleOnBlur}
											hasError={inputHasError.analiticoSecundario}
											value="Si"
											activeValue={analiticoSecundario}
											checked={this.state.field.analiticoSecundario === "Si"}
											valueType="radio"
											validateOnChange={[isRequired]}
										/>

										<Radio
											title="No"
											name="analiticoSecundario"
											type="radio"
											onChange={this.handleInputChange}
											// onBlur={this.handleOnBlur}
											hasError={inputHasError.analiticoSecundario}
											value="No"
											activeValue={analiticoSecundario}
											checked={this.state.field.analiticoSecundario === "No"}
											valueType="radio"
											validateOnChange={[isRequired]}
										/>

										<Radio
											title="En trámite"
											name="analiticoSecundario"
											type="radio"
											onChange={this.handleInputChange}
											// onBlur={this.handleOnBlur}
											hasError={inputHasError.analiticoSecundario}
											value="En trámite"
											activeValue={analiticoSecundario}
											checked={this.state.field.analiticoSecundario === "En trámite"}
											valueType="radio"
											validateOnChange={[isRequired]}
										/>
									</div>
									<p className='errorMessage'>Este campo es requerido</p>
								</div>
							</div>
							<div className="right">
							<div className={`radio-wrapper ${inputHasError.estudiaActualmente ? 'input-error' : ''}`}>
									<p className="label-title">¿Estudia actualmente? *</p>
									<div className="radio-container">
										<Radio
											title="Si"
											name="estudiaActualmente"
											type="radio"
											onChange={this.handleInputChange}
											// onBlur={this.handleOnBlur}
											hasError={inputHasError.estudiaActualmente}
											value="Si"
											activeValue={estudiaActualmente}
											checked={this.state.field.estudiaActualmente === "Si"}
											valueType="radio"
											validateOnChange={[isRequired]}
										/>

										<Radio
											title="No"
											name="estudiaActualmente"
											type="radio"
											onChange={this.handleInputChange}
											// onBlur={this.handleOnBlur}
											hasError={inputHasError.estudiaActualmente}
											value="No"
											activeValue={estudiaActualmente}
											checked={this.state.field.estudiaActualmente === "No"}
											valueType="radio"
											validateOnChange={[isRequired]}
										/>
									</div>
									<p className='errorMessage'>Este campo es requerido</p>
								</div>
								<Input
									title="¿En qué horarios?"
									name="horariosEstudio"
									type="text"
									placeholder=""
									onChange={this.handleInputChange}
									onBlur={this.handleOnBlur}
									hasError={inputHasError.horariosEstudio}
									value={horariosEstudio}
									valueType="text"
									validateOnBlur={this.validations.horariosEstudio}
								/>
							</div>
						</div>

						<div className="container computerLevel">
							<div className="left">
								<Select
									title="Nivel de computación *"
									name="nivelComputacion"
									value={this.state.field.nivelComputacion}
									placeholder={"- Seleccione Nivel -"}
									options={computerOptions}
									onChange={this.handleSelect}
									hasError={inputHasError.nivelComputacion}
									onBlur={this.handleOnBlur}
									validateOnBlur={this.validations.nivelComputacion}
								/>
							</div>
							<div className="right">
								<TextArea
									title="Observaciones *"
									name="nivelComputacionObs"
									type="text"
									placeholder=""
									onChange={this.handleInputChange}
									onBlur={this.handleOnBlur}
									hasError={inputHasError.nivelComputacionObs}
									value={nivelComputacionObs}
									valueType="textarea"
									validateOnBlur={this.validations.nivelComputacionObs}
								/>
							</div>
						</div>
					
						<div className="container languages">
							{this.state.languages.map((language, i) => 
							<Languages 
								key={i} 
								languageName={language.languageName} 
								languageNameError={language.languageHasError} 
								languageLevel={language.languageLevel} 
								languageLevelError={language.levelHasError} 
								index={i} 
								onChange={this.handleLanguageChange} 
								onClick={this.validateLanguages}
								onDeleteLanguage={this.handleDeleteLanguage}
							/>)}
							<button className="form-jobs-button" id="add-language" onClick={this.addLanguage}>Añadir</button>
						</div>
					

						<div className="container current-job">
							<div className="left">
								<div className={`radio-wrapper ${inputHasError.trabajaActualmente ? 'input-error' : ''}`}>
									<p className="label-title">¿Está trabajando actualmente? *</p>
									<div className="radio-container">
										<Radio
											title="Si"
											name="trabajaActualmente"
											type="radio"
											onChange={this.handleInputChange}
											hasError={inputHasError.trabajaActualmente}
											value="Si"
											activeValue={trabajaActualmente}
											checked={this.state.field.trabajaActualmente === "Si"}
											valueType="radio"
											validateOnChange={[isRequired]}
										/>

										<Radio
											title="No"
											name="trabajaActualmente"
											type="radio"
											onChange={this.handleInputChange}
											hasError={inputHasError.trabajaActualmente}
											value="No"
											activeValue={trabajaActualmente}
											checked={this.state.field.trabajaActualmente === "No"}
											valueType="radio"
											validateOnChange={[isRequired]}
										/>
									</div>
									<p className='errorMessage'>Este campo es requerido</p>
								</div>

								<Input
									title="Empresa *"
									name="trabajoActual"
									type="text"
									placeholder=""
									onChange={this.handleInputChange}
									onBlur={this.handleOnBlur}
									hasError={inputHasError.trabajoActual}
									value={trabajoActual}
									valueType="text"
									validateOnBlur={this.validations.trabajoActual}
								/>
							</div>
							<div className="right">
								<TextArea
									title="Detallar área, cargo, empresa, tareas que realiza, fecha de ingreso y egreso *"
									name="trabajoActualObs"
									type="text"
									placeholder=""
									onChange={this.handleInputChange}
									onBlur={this.handleOnBlur}
									hasError={inputHasError.trabajoActualObs}
									value={trabajoActualObs}
									valueType="textarea"
									validateOnBlur={this.validations.trabajoActualObs}
								/>
							</div>
						</div>

						<div className="container previous-jobs">
							{this.state.jobs.map((job, i) => 
							<PreviousJobs 
								key={i} 
								nombreEmpleo={job.nombreEmpleo} 
								detallesEmpleo={job.detallesEmpleo} 
								index={i}
								onChange={this.handleJobChange} 
								validateOnBlurJobs={this.validateJobs}
								previousJobNameError={job.previousJobNameError}
								previousJobObsError={job.previousJobObsError} 
								onDeleteJob={this.handleDeleteJob}
							/>)}

							<button className="form-jobs-button" id="add-previus-job" onClick={this.addJob}>Añadir</button>
						</div>

						<div className="container jobs-more-info">
							<div className="left">
								<Select
									title="Disponibilidad Laboral *"
									name="disponibilidadLaboral"
									value={this.state.field.disponibilidadLaboral}
									placeholder={"- Seleccione Disponibilidad -"}
									options={workHoursOptions}
									onChange={this.handleSelect}
									hasError={inputHasError.disponibilidadLaboral}
									onBlur={this.handleOnBlur}
									validateOnBlur={this.validations.disponibilidadLaboral}
								/>
							</div>
							<div className="right">
								<Input
									title="Remuneración pretendida *"
									name="remuneracionPretendida"
									type="text"
									placeholder=""
									onChange={this.handleInputChange}
									onBlur={this.handleOnBlur}
									hasError={inputHasError.remuneracionPretendida}
									value={remuneracionPretendida}
									valueType="number"
									validateOnBlur={this.validations.remuneracionPretendida}
								/>
							</div>
						</div>
						</div>

					<p className="datos-obligatorios">* Datos obligatorios</p>

					<button className="form-jobs-button" id="form-jobs-button-send" type="submit">Enviar</button>

				</form>
			
			</div>
		)
	}
}

export default Form