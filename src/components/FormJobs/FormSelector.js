import React, { Component } from 'react';
import JobListItem from './JobListItem';

class FormSelector extends Component {

	componentDidMount () {
	  window.scrollTo(0, 0)
	}

	constructor() {
		super();

		this.state = {
			jobFormSelector: {
				puestoAdministrativo: false,
				puestoCajero: false,
				puestoVendedor: false,
				puestoCadete: false
			}		
		}; 
	}


	render() {

		return (
			<div className="FormSelector">
				<div className="wrapper">
					<div className="content">
						<div className="text">
							<p>Si te interesa desarrollar tu carrera laboral en una empresa en pleno crecimiento, tienes una oportunidad para vos.</p>
							<p>Elegí el cargo que te interese y completá el formulario e ingresá en forma directa a participar de las búsquedas de personal que hacemos habitualmente. Es importante llenar todos los campos solicitados y agregar los datos que creas de importancia referente a tus habilidades. Desde luego toda la información es estrictamente confidencial.</p>
						</div>
						<ul className="jobs-list">
							<JobListItem onSelectJob={this.props.onSelectJob} name="Administrativo"/>
							<JobListItem onSelectJob={this.props.onSelectJob} name="Cajero"/>
							<JobListItem onSelectJob={this.props.onSelectJob} name="Vendedor"/>
							<JobListItem onSelectJob={this.props.onSelectJob} name="Cadete"/>
						</ul>
					</div>
					<div className="requirements">
						<p><span>REQUISITOS EXCLUYENTES PARA TODOS LOS PUESTOS:</span></p>
						<div className="requirements-list">
							<p>- Secundario Completo</p>
							<p>- Experiencia Comprobable</p>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default FormSelector