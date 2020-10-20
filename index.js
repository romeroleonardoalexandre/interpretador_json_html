
// create the canvas and reporting list
export default function initInterpretador(objeto = 'react', json_data = {}){
	if(objeto == 'react'){
		import React from './modules/react.js';
		let Interpretador = new React(json_data)
	}

	return Interpretador.init()
}