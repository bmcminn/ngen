

function ngenerate(opts) {

	console.log(opts)


}


const newComponent = (opts) => {
	console.log('newComponent() has run!', opts);
	let file = generateFile(opts)
}


const newModule = (opts) => {
	console.log('newModule() has run!');
}


const newService = (opts) => {
	console.log('newService() has run!');
}


const newModel = (opts) => {
	console.log('newModel() has run!');
}



module.exports = {
	ngenerate,
}
