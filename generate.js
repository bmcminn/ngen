
const newComponent = (opts) => {
	console.log('newComponent() has run!', opts);
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
	newComponent,
	newModule,
	newService,
	newModel,
}
