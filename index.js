
// create the canvas and reporting list
import React from './react.js'

export default function initInterpretador(objeto = 'react', json_data = {}){
	if(objeto == 'react'){
		let Interpretador = new React(json_data)
	}

	return Interpretador.init()
}