class React {
	// contrutor basico da classe que recebe os dados do json contendo o array com os elementos
	constructor(Json_data){
		this.formData = Json_data
		this.formStepsList = []
	}
	
	// metodo chamado para inicializar a conversão
	init ()  {
		return this.initReact(this.formData)
	}
	
	/*
	Metodo responsavel por pagar cada elemento no json e converter para o respectivo elemento em codigo react
	*/
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
				case "number":
					elements += this.number(element)
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
				case "recaptcha":
					elements += this.recaptcha(element)
					break;
				case "spacer":
					elements += this.spacer(element)
					break;
				case "signature":
					elements += this.signature(element)
					break;
				case "matrix":
					elements += this.matrix(element)
					break;
				case "snippet":
					elements += this.snippet(element)
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

	/*
	Neste metodo é realizado o cabeçalho do componente formulario do codigo react
	*/
	 importsReact ()  {
		return `
		import React, { Component } from 'react'

		`
	}

	/*
	Metodo responsável por juntar o cabeçalho com a criação do export do componente
	*/
	initReact (formData)  {
		return	`
		${this.importsReact()}
		export default class Formulario extends Component {
			${this.constructorReact() + this.componentDidupdateReact() + this.componentWillMountReact() + this.functionsReact() + this.initRenderReact(formData)}
		}

		`
	}

	/*
	Metodo que cria o contrutor da classe do componente react
	*/
	 constructorReact ()  {
		return `
			constructor() {
				super();
				this.state = {
					exemplo: false,
					page: 0
				};
				this.handleChange = this.handleChange.bind(this);
			}

		`
	}

	/*
	Esse metodo cria o método componentWillMount, que é executado 1 vez por componente e pode inclusive realizar alterações no estado
	*/
	 componentWillMountReact ()  {
		return `
		componentWillMount() {
			this.setState({ exemplo: true, page: 0 });
		}

		`
	}

	/*
	Metodo que cria o metoo do ciclo de vida do react, é executado após o novo render indicando que o componente 
	foi atualizado com sucesso. Recebe as propriedades e estado antigos como parâmetro.
	*/
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

	/*
	Metodo responsavel por armazenar os metodos customizados que foram criados para funcionamento da exportação
	*/
	 functionsReact ()  {
		return `
		submit ()  {
			console.log(this.state)
			alert("Formulario submitou");
		}

		next ()  {
			this.setState({page: this.state.page + 1})
		}

		previous ()  {
			this.setState({page: this.state.page - 1})
		}

		onValueChange(event) {
			this.setState({
			  selectedOption: event.target.value
			});
		}

		handleChange (evt) {
			this.setState({ [evt.target.name]: evt.target.value });
		}

		`
	}

	/*
	Metodo que cria o metodo principal de renderização do React, esse método é chamado toda vez 
	que uma alteração nas propriedades ou estado do componente é realizada
	*/
	 initRenderReact (form_data)  {
		return `
			render(){
				return (
					${this.formReact(form_data)}
				)
			}
		`
	}

	// Metodoque cria heading do formulario
	 heading (data)  {
		return `
		<div className="col-xs-12">
			<h3 className="legend">${data.fields.text.value}</h3>
		</div>

		`
	}

	//metodo que cria um paragrafo
	 paragriph (data)  {
		return `
		<div className="col-xs-12">
			<p>${data.fields.text.value}</p>
		</div>

		`
	}

	//Metodo que cria o input type text
	 text (data)  {
		// let type = data.fields.inputType.value.filter(function(type) {
		// 	return type.selected == true;
		// });
		return `
		<div className="${data.fields.containerClass.value}">
			<div className="form-group">
				<label  className="${data.fields.labelClass.value}" htmlFor="${data.fields.id.value}">${data.fields.label.value}</label>
				<input type="text" onChange={(event)=>this.handleChange(event)} id="${data.fields.id.value}" name="${data.fields.id.value}" data-alias="${data.fields.alias.value}" placeholder="${data.fields.placeholder.value}" className="${data.fields.cssClass.value}" />
			</div>
		</div>

		`
	}
	// metodo criar elemento input type number
	number (data) {
		let type = data.fields.inputType.value.filter(function(type) {
			return type.selected == true;
		});
		
		return `
		<div className="${data.fields.containerClass.value}">
			<div className="form-group">
				<label  className="${data.fields.labelClass.value}" htmlFor="${data.fields.id.value}">${data.fields.label.value}</label>
				<input type="${type[0].value}" onChange={(event)=>this.handleChange(event)} id="${data.fields.id.value}" name="${data.fields.id.value}" data-alias="${data.fields.alias.value}"  className="${data.fields.cssClass.value}" />
			</div>
		</div>
		`
	}		

	spacer(data) {
		return `
		<div className="${data.fields.containerClass.value}">
			<div style="{{height: ${data.fields.height.value}}}" ></div>
		</div>
		`
	}
	
	// metodo input do tipo textarea
	 textarea (data)  {
		return `
		<div className="${data.fields.containerClass.value}">
			<div className="form-group">
				<label  className="${data.fields.labelClass.value}" htmlFor="${data.fields.id.value}">${data.fields.label.value}</label>
				<textarea type="${data.name}" onChange={(event)=>this.handleChange(event)} rows="${data.fields.fieldSize.value}" id="${data.fields.id.value}" name="${data.fields.id.value}" data-alias="${data.fields.alias.value}" placeholder="${data.fields.placeholder.value}" className="${data.fields.cssClass.value}" />
			</div>
		</div>

		`
	}

	//Metodo responsavel por navegar entre os passo-a-passo do formulario Wizard
	 formStepsActions (index, data)  {
		if (index == 1){
			return `<div className="form-action col-xs-12">
				<button onClick={() => this.next()} type="button" className="btn btn-primary next" >Seguinte</button>
			</div>`
		}else if(index < this.formStepsList.length){
			return `<div className="form-action col-xs-12">
				<button onClick={() => this.previous()} type="button" className="btn btn-primary previous" >Anterior</button>
				<button onClick={() => this.next()} type="button" className="btn btn-primary next" >Seguinte</button>
			</div>`
		}
		return ``
	}

	//Metodo responsavel por criar a tag que sera usado para ligar os passo-a-passo
	 pagebreak (data)  {
		let page = data.fields.id.value.split("_")
		let action = this.formStepsActions(parseInt(page[1]), data)
		return `
				${action}
		</fieldset>
		<fieldset className="row" data-index="${page[1]}">				
		`
	}
	
	// metodo que cria input do tipo radio
	 radio (data)  {
		let loop = ""
		for(var i = 0; i < data.fields.radios.value.length; i++){
			loop += `<div className="radio ">
				<input type="radio" name="${data.fields.id.value}" id="${data.fields.id.value}_${data.fields.radios.value[i]}" defaultValue="" data-alias="" />
					<label htmlFor="${data.fields.id.value}_${i}" className="${data.fields.cssClass.value}">
						${data.fields.radios.value[i].split("|")[0]}
					</label>
				</div>
				`
		}
		return `
		<div className="${data.fields.containerClass.value}">
			<div className="form-group"> 
				<label className="${data.fields.labelClass.value}" htmlFor="${data.fields.id.value}">${data.fields.label.value}</label>
					${loop}
				<span id="${data.fields.id.value}"></span>
			</div>
		</div>

		`
	}

	//Metodo que cria o input type checkbox
	 checkbox (data)  {
		let loop = ""

		for (var i = 0; i < data.fields.checkboxes.value.length; i++) {
			let split = data.fields.checkboxes.value[i].split("|")
			
			loop += `<div className="checkbox ">
				<input type="checkbox" onChange={(event)=>this.handleChange(event)} name="${data.fields.id.value}[]" id="${data.fields.id.value}_${data.fields.checkboxes.value[i]}" defaultValue="${data.fields.checkboxes.value[i]}" data-alias="" ${split.length > 1 ? "defaultChecked" : ""} />
				<label htmlFor="${data.fields.id.value}_${data.fields.checkboxes.value[i]}" className="checkbox-inline">
					${split[0]} </label>
			</div>
			`
		}
		
		return `
		<div className="${data.fields.containerClass.value}">
			<div className="form-group"> 
				<label className="${data.fields.labelClass.value}" htmlFor="${data.fields.id.value}">${data.fields.label.value}</label>
				
				${loop}
				<span id="${data.fields.id.value}"></span>
			</div>
		</div>

		`
	}

	//Metodo que cria o elemento select
	 selectlist (data)  {
		let loop = ""
		return `
		<div className="${data.fields.containerClass.value}">
			<div className="form-group">
				<label className="${data.fields.labelClass.value}" htmlFor="${data.fields.id.value}">${data.fields.label.value}</label>
				<select onChange={(event)=>this.handleChange(event)} id="${data.fields.id.value}" name="${data.fields.id.value}[]" data-alias=""  className="${data.fields.cssClass.value}">
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

	// metodo que cria o elemento input type date
	 date (data)  {

		let type = data.fields.inputType.value.filter(function(type) {
			return type.selected == true;
		});

		return `
		<div className="${data.fields.containerClass.value}">
			<div className="form-group">
				<label className="${data.fields.labelClass.value}" htmlFor="${data.fields.id.value}">${data.fields.label.value}</label>
				<input type="${type[0].value}" onChange={(event)=>this.handleChange(event)} id="${data.fields.id.value}" name="${data.fields.id.value}" defaultValue="" data-alias="" className="${data.fields.cssClass.value}" />
			</div>
		</div>

		`
	}

	//metodo que cria o input type file
	 file (data)  {
		return `
		<div className="${data.fields.containerClass.value}">
			<div className="form-group">
				<label className="${data.fields.labelClass.value}" htmlFor="${data.fields.id.value}">${data.fields.label.value}</label>
				<input type="file" id="${data.fields.id.value}" name="${data.fields.id.value}[]" data-alias="" accept=".gif, .jpg, .png" />
			</div>
		</div>

		`
	}

	signature (data) {
		return `
		<div className="${data.fields.containerClass.value}">
			<div className="form-group">
				<label  className="${data.fields.labelClass.value}" htmlFor="${data.fields.id.value}">Signature</label>
				<div className="signature-pad">
					<canvas id="${data.fields.id.value}" width="${data.fields.width.value}" height="${data.fields.height.value}" data-color="${data.fields.color.value}" ></canvas>
				</div>
				
				<div className="signature-pad-actions">
					<button type="button" id="clear_${data.fields.id.value}" name="clear_${data.fields.id.value}" className="btn btn-sm btn-default btn-clear" data-exclude="true">Apagar</button>
					<button type="button" id="undo_${data.fields.id.value}" name="undo_${data.fields.id.value}" className="btn btn-sm btn-default btn-undo" data-exclude="true">Undo</button>
				</div>
				<input type="hidden" name="hidden_${data.fields.id.value}" id="hidden_${data.fields.id.value}" value="" data-alias="${data.fields.alias.value}" data-label="${data.fields.id.value}"  />
			</div>
		</div>
		`
	}

	//Metodo para colocar o recaptcha
	recaptcha (data) {
		return `
		<div className="form-group ${data.fields.containerClass.value}">
			<div id="${data.fields.id.value}" className="g-recaptcha" data-sitekey="6Lf5Tt4ZAAAAAPCMN7WSRFSpb40H4tWNU9FcTuwI" data-theme="${data.fields.theme.value[0].selected === true ? data.fields.theme.value[0].value : data.fields.theme.value[1].value}" data-type="${data.fields.theme.value[0].selected === true ? data.fields.type.value[0].value : data.fields.type.value[1].value}" data-size="${data.fields.size.value[0].selected === true ? data.fields.size.value[0].value : data.fields.size.value[1].value}"></div>
		</div>
		`
	}

	//metodo que cria tabela com inputs
	matrix (data) {
		let matrix = ""
		let matrix_type = data.fields.inputType.value.filter(function(type) {
			return type.selected == true;
		});

		let answersHeaders = ''
		for (var i = 0; i < data.fields.answers.value.length; i++ ){
			answersHeaders += `<th className="text-center">${data.fields.answers.value[i].split("|")[0]}</th>`
		}

		let tableLines = ''
		switch(matrix_type[0].value){
			case 'checkbox':
				tableLines += this.matrix_checkbox(data)
				break;
			default:
				tableLines += ''

		}

		matrix += `<div className="${data.fields.containerClass.value}">
					<table id="${data.fields.id.value}" className="table-matrix table table-striped table-hover" data-matrix-type="${matrix_type[0].value}">
						<caption>
							<label htmlFor="${data.fields.id.value}" className="control-label">${data.fields.label.value}</label>
						</caption>
						<thead>
							<tr>
								<th>&nbsp;</th>
								${answersHeaders}
							</tr>
						</thead>
						<tbody>
							${tableLines}
						</tbody>
					</table>
					</div>
					`
		return matrix
	}
	
	//Cria o typo de input da tabela
	matrix_checkbox (data) {
		let tablecolumns = ''
		for(var i = 0; i < data.fields.questions.value.length; i++){
			tablecolumns  += `<tr>
								<th>
									<label htmlFor="${data.fields.id.value}_${i}">${data.fields.questions.value[i]}</label>
								</th>
								`
			for(var j = 0; j < data.fields.answers.value.length; j++){
				tablecolumns +=`<td class="text-center ${data.fields.id.value}_q_${i} ${data.fields.id.value}_a_${j}" title="${data.fields.answers.value[i]}">
								<div class="checkbox">
									<span id="${data.fields.id.value}_0"></span>
									<input type="checkbox" onChange={(event)=>this.handleChange(event)} name="${data.fields.id.value}_${i}[]" 
										id="${data.fields.id.value}_${i}_${j}" 
										data-matrix-id="${data.fields.id.value}" 
										data-matrix-label="${data.fields.label.value}" 
										data-matrix-question="${data.fields.questions.value[i]}"
										data-matrix-answer="${data.fields.answers.value[i]}" 
										value="${data.fields.answers.value[i]}" />
									<label htmlFor="${data.fields.id.value}_${i}_${j}"></label>
								</div>
							</td>
							`
			}
		
			tablecolumns  += '</tr>'
		}

		return tablecolumns
	}

	snippet (data) {
		data.fields.snippet.value.replace("\"font-family: monospace;\"", "{{fontFamily: 'monospace'}}")
		data.fields.snippet.value.replace("\"background-color: #b4d7ff;\"", "{{backgroundColor: '#b4d7ff'}}")
		return `
		<div className="snippet ${data.fields.containerClass.value}">
			${data.fields.snippet.value}
		</div>
		`
	}

	/*
	Nesta parte é realizado a conversão do JSON com estrutura do formulário para codigo React e utilizando boostrap para lidar com o visual,
	O metodo "formSteps" verifica se ha a necessidade de criar o formulario do tipo passo-a-passo (Wizard), é verificado se existe o elemento de nome "formStep" 
	que é gerado a partir da utilização do elemento "page break" que é incluído opcionalmente na ferramenta WebForms.
	Após é chamado o metodo elementCreate que é responsavel por ler cada elemento dentro do JSON e converter para um elemento HTML React, o processo é realizado
	de forma sequencial, lendo cada elemento no array dentro da variavel "formData". Após a conversão do formulario, é chamado o metodo "progressBar" que verifica se
	ha a necessidade de criar uma barra de progresso.
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
									<form action="#" method="post" encType="multipart/form-data" id="form-app">
										${typeof form_data.settings.formSteps !== 'undefined' ? this.formSteps(form_data.settings.formSteps) : ""}
										<fieldset className="row" data-index="0">
										${this.elementCreate(form_data.initForm)}
										</fieldset>
									</form>
									${typeof form_data.settings.formSteps.progressBar !== 'undefined' ? this.progressBar() : ""}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		`
	}

	//Cria botão o formulário do tipo submit
	 button (data)  {
		return `
		<div className="${data.fields.containerClass.value}">
		${this.formStepsList.length > 0 ? `
				<button onClick={() => this.previous()} type="button" className="btn btn-primary previous" >Anterior</button>
			` : ``}
		<button onClick={() => this.submit()} type="button" id="${data.fields.id.value}" name="${data.fields.id.value}" className="${data.fields.cssClass.value}">Enviar</button>
		</div>
		`
	}

	//Metodo responsavel por criar o 
	 formSteps (data)  {
		let steps = ""
		this.formStepsList = data.fields.steps.value

		for (var i = 0; i < this.formStepsList.length; i++){
			steps += `<div className="step ${i == 0 ? "current" : ""}" data-step="${i}">
						<div className="stage">${i + 1}</div> 
						<div className="title">${this.formStepsList[i]}</div>
					</div>
				`
		}
		
		return `
		<div className="steps">
			${steps}
		</div>

		`
	}

	//Metodo que cria a barra de progresso
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

/*
Metodo responsavel por verificar qual o tipo de formulario se deseja converter, parametro padrão é react, mas pode ser 
atualizado e inserido Angular, segundo parametro é o json com os elementos necessários para conversão
*/
function initInterpretador(objeto = 'react', json_data = {}){
	let Interpretador = {}
	if(objeto == 'react' && json_data)
		Interpretador = new React(json_data)

	return Interpretador.init()
}
