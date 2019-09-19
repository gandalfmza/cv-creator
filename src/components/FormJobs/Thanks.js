import React, { Component } from 'react';

class Thanks extends Component {

	componentDidMount () {
	  window.scrollTo(0, 0)
	}

	render() {

		return (
			<div id="form_succes">
				<div id="form_succes-text"> MENSAJE ENVIADO CON ÉXITO </div>
				<div id="botones">
				    <a href="/" className="boton">Volver al Home</a>
				</div>
			</div>
		)
	}
}

export default Thanks