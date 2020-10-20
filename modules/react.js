export default class React {
	formStepsList = []
	formData = ""

	constructor(Json_data){
		this.formData = Json_data
	}

	init ()  {
		return this.initReact(this.formData)
	}

	elementCreate(formData){
		let elements = ""
		formData.forEach((element) => {
			switch(element.name) {
				case "heading":
					elements += this.heading(element)
					break;
				case "paragraph":
					elements += this.paragriph(element)
					break;
				case "text":
					elements += this.text(element)
					break;
				case "email":
					elements += this.text(element)
					break;
				case "textarea":
					elements += this.textarea(element)
					break;
				case "pagebreak":
					elements += this.pagebreak(element)
					break;
				case "radio":
					elements += this.radio(element)
					break;
				case "checkbox":
					elements += this.checkbox(element)
					break;
				case "selectlist":
					elements += this.selectlist(element)
					break;
				case "date":
					elements += this.date(element)
					break;
				case "file":
					elements += this.file(element)
					break;
				case "button":
					elements += this.button(element) 
					break;
				
				default:
					elements += ""
			} 
		})

		return elements

	}

	 formInit (formData)  {
		return this.classReact(formData)
	}

	 importsReact ()  {
		return `
		import React, { Component } from 'react'

		`
	}

	 initReact (formData)  {
		return	`
		${this.importsReact()}
		export default class Formulario extends Component {
			${this.constructorReact() + this.componentDidupdateReact() + this.componentWillMountReact() + this.functionsReact() + this.initRenderReact(formData)}
		}

		`
	}

	 constructorReact ()  {
		return `
			constructor() {
				super();
				this.state = {
					exemplo: false,
					page: 0
				};
			}

		`
	}

	 componentWillMountReact ()  {
		return `
		componentWillMount() {
			this.setState({ exemplo: true, page: 0 });
		}

		`
	}

	 componentDidupdateReact ()  {
		return `
		componentDidUpdate(prevProps, prevState) {
			if (prevState.page != this.state.page){
				
				for (let field of document.getElementsByTagName("fieldset")){
					if (parseInt(field.getAttribute('data-index')) == this.state.page){
						
						field.classList.remove("hidden")
						field.classList.add("show")
					}else{
						field.classList.remove("show")
						field.classList.add("hidden")
					}
				}

				let steps = document.querySelectorAll('.step')

				for (var i = 0; i < steps.length; ++i){
					if (parseInt(steps[i].getAttribute('data-step')) == this.state.page){
						steps[i].classList.add("current")
					}else{
						steps[i].classList.remove("current")
					}
				}
			}
		}

		`
	}

	 functionsReact ()  {
		return `
		submit ()  {
			alert("submitou")
		}

		next ()  {
			this.setState({page: this.state.page + 1})
		}

		previous ()  {
			this.setState({page: this.state.page - 1})
		}

		`
	}

	 initRenderReact (form_data)  {
		return `
			render(){
				return (
					${this.formReact(form_data)}
				)
			}
		`
	}

	 heading (data)  {
		return `
		<div className="col-xs-12">
			<h3 className="legend">${data.fields.text.value}</h3>
		</div>

		`
	}

	 paragriph (data)  {
		return `
		<div className="col-xs-12">
			<p>${data.fields.text.value}</p>
		</div>

		`
	}

	 text (data)  {
		return `
		<div className="col-xs-12">
			<div className="form-group">
				<label  className="${data.fields.labelClass.value}" htmlFor="${data.fields.id.value}">${data.fields.label.value}</label>
				<input type="${data.name}" id="${data.fields.id.value}" name="${data.fields.id.value}" data-alias="${data.fields.alias.value}" placeholder="${data.fields.placeholder.value}" className="${data.fields.cssClass.value}" />
			</div>
		</div>

		`
	}

	 textarea (data)  {
		return `
		<div className="col-xs-12">
			<div className="form-group">
				<label  className="${data.fields.labelClass.value}" htmlFor="${data.fields.id.value}">${data.fields.label.value}</label>
				<textarea type="${data.name}" rows="${data.fields.fieldSize.value}" id="${data.fields.id.value}" name="${data.fields.id.value}" data-alias="${data.fields.alias.value}" placeholder="${data.fields.placeholder.value}" className="${data.fields.cssClass.value}" />
			</div>
		</div>

		`
	}

	 formStepsActions (index)  {
		if (index == 1){
			return `<div className="form-action col-xs-12">
				<button onClick={()  this.next()} type="button" className="btn btn-primary next" >Seguinte</button>
			</div>`
		}else if(index < this.formStepsList.length){
			return `<div className="form-action col-xs-12">
				<button onClick={()  this.previous()} type="button" className="btn btn-primary previous" >Anterior</button>
				<button onClick={()  this.next()} type="button" className="btn btn-primary next" >Seguinte</button>
			</div>`
		}
		return ``
	}

	 pagebreak (data)  {
		let page = data.fields.id.value.split("_")
		let action = this.formStepsActions(parseInt(page[1]))
		return `
				${action}
		</fieldset>
		<fieldset className="row" data-index="${page[1]}">				
		`
	}

	 radio (data)  {
		let loop = ""
		return `
		<div className="col-xs-12">
			<div className="form-group"> 
				<label className="${data.fields.labelClass.value}" htmlFor="${data.fields.id.value}">${data.fields.label.value}</label>
					${data.fields.radios.value.forEach((radio, index) => {
						loop += `<div className="radio ">
							<input type="radio" name="${data.fields.id.value}_${radio[index]}" id="${data.fields.id.value}_${radio[index]}" defaultValue="Azul" data-alias="" defaultChecked />
								<label htmlFor="${data.fields.id.value}_${index}" className="${data.fields.cssClass.value}">
									${radio.split("|")[0]}
								</label>
							</div>
							`
					}) }
					${loop}
				<span id="${data.fields.id.value}"></span>
			</div>
		</div>

		`
	}

	 checkbox (data)  {
		let loop = ""
		return `
		<div className="col-xs-12">
			<div className="form-group"> 
				<label className="${data.fields.labelClass.value}" htmlFor="${data.fields.id.value}">${data.fields.label.value}</label>
				${data.fields.checkboxes.value.forEach((checkbox, index) => {
					loop += `<div className="checkbox ">
						<input type="checkbox" name="${data.fields.id.value}[]" id="${data.fields.id.value}_${checkbox[index]}" defaultValue="${checkbox}" data-alias="" defaultChecked />
						<label htmlFor="${data.fields.id.value}_${checkbox[index]}" className="checkbox-inline">
							${checkbox.split("|")[0]} </label>
					</div>
					`
				}) }
				${loop}
				<span id="${data.fields.id.value}"></span>
			</div>
		</div>

		`
	}

	 selectlist (data)  {
		let loop = ""
		return `
		<div className="col-xs-12">
			<div className="form-group">
				<label className="${data.fields.labelClass.value}" htmlFor="${data.fields.id.value}">${data.fields.label.value}</label>
				<select id="${data.fields.id.value}" name="${data.fields.id.value}[]" data-alias=""  className="${data.fields.cssClass.value}">
					${data.fields.options.value.forEach((option) => {
						loop += `<option>${option.split("|")[0]}</option>

						`
					})}
					${loop}
				</select>
			</div>
		</div>

		`
	}

	 date (data)  {
		return `
		<div className="col-xs-12">
			<div className="form-group">
				<label className="${data.fields.labelClass.value}" htmlFor="${data.fields.id.value}">${data.fields.label.value}</label>
				<input type="date" id="${data.fields.id.value}" name="${data.fields.id.value}" defaultValue="" data-alias="" className="${data.fields.cssClass.value}" />
			</div>
		</div>

		`
	}

	 file (data)  {
		return `
		<div className="col-xs-12">
			<div className="form-group">
				<label className="${data.fields.labelClass.value}" htmlFor="${data.fields.id.value}">${data.fields.label.value}</label>
				<input type="file" id="${data.fields.id.value}" name="${data.fields.id.value}[]" data-alias="" accept=".gif, .jpg, .png" />
			</div>
		</div>

		`
	}

	/*
	explicar como funcionar essa parte mais detalhado, fazer um diagrama de sequencia para mostrar o fluxo
	considerações: citar num readme orientando sobre a inclusão das libs "bootstrap, css, etc..."
	*/
	 formReact (form_data)  {
		return `
		<div className="container">
			<div className="row">
				<div className="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
					<div className="form-view">
						<div className="panel panel-default">
							
							<div className="panel-body">
								<div className="form-container">
									<div id="messages"></div>
									<form action="#" method="post" encType="multipart/form-data"  id="form-app">
										${form_data.settings.formSteps ? this.formSteps(form_data.settings.formSteps) : ""}
										<fieldset className="row" data-index="0">
										${this.elementCreate(form_data.initForm)}
										</fieldset>
									</form>
									${form_data.settings.formSteps.progressBar ? this.progressBar() : ""}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		`
	}

	 button (data)  {
		return `
		<div class="col-xs-12">
		${this.formStepsList.length ? `
				<button onClick={()  this.previous()} type="button" className="btn btn-primary previous" >Anterior</button>
			` : ``}
		<button onClick={()  this.submit()} type="button" id="${data.fields.id.value}" name="${data.fields.id.value}" className="${data.fields.cssClass.value}">Enviar</button>
		</div>
		`
	}

	 formSteps (data)  {
		let steps = ""
		this.formStepsList = data.fields.steps.value

		return `
		<div className="${data.fields.steps.name}">
			${data.fields.steps.value.forEach((step, index) => {
				steps += `<div className="step ${index == 0 ? "current" : ""}" data-step="${index}">
					<div className="stage">${index + 1}</div> 
					<div className="title">${step}</div>
				</div>
				`
			})}
			${steps}
		</div>

		`
	}

	 progressBar ()  {
		return `
		<div id="progress" className="progress" style={{display: "none"}}>
			<div id="bar" className="progress-bar" role="progressbar" style={{width: 0}}>
				<span id="percent" className="sr-only">0% Complete</span>
			</div>
		</div>

		`
	}
}