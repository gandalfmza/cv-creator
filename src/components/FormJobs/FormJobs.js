import React, { Component } from 'react';
import FormSelector from './FormSelector';
import Form from './Form';
import Thanks from './Thanks';
import './Jobs-form.scss'


class FormJobs extends Component {

	constructor() {
		super();

		this.state = {
			stage: "intro",
			formJob: ""
		}; 
	}

	componentDidMount () {
	  window.scrollTo(0, 0)
	}

	handleClickSelectJob = (formJob) => {
		this.setState({stage: "form"});
		this.setState({ formJob });
	}
	
	handleFormSubmit = () => {
		this.setState({stage: "thanks"});
	}

	render() {

		const { stage } = this.state;

		return (
			<div className="FormJobs">
				<div className="principal">
					<div className="main_title">
						EMPLEOS
					</div>
				</div>

				{stage === "intro" &&
					<FormSelector onSelectJob={this.handleClickSelectJob}/>
				}

				{stage === "form" &&
					<Form name={this.state.formJob} onSubmit={this.handleFormSubmit} />
				}

				{stage === "thanks" &&
					<Thanks />
				}



				
			</div>
		)
	}
}

export default FormJobs