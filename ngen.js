const asset   		= require('assert')
const program 		= require('commander')
const { prompt } 	= require('inquirer')
const pkg     		= require('./package.json')

const {
	newComponent,
	newModel,
	newModule,
	newService,
} = require('./generate')



const promptNewAsset = [
	{
		type: 'list',
		name: 'assetType',
		choices: [
			'Component',
			'Module',
			'Model',
			'Service',
		],
	},
]

const promptNewComponent = [
	{
		type: 'input',
		name: 'componentName',
		message: 'Enter component name ',
	},
	// {
	// 	type: '',
	// 	name: '',
	// 	message: '',
	// },
	// {
	// 	type: '',
	// 	name: '',
	// 	message: '',
	// },
]



program
	.version(pkg.version)
	.description(pkg.description)


program
	.command('newAsset')
	.description('Add a new asset to your project!')
	.action(() => {
		prompt(promptNewAsset)
			.then((answers) => {

				switch(answers.assetType) {
					case 'Component':
						prompt(promptNewComponent).then(newComponent)
						break;
				}
				console.log(answers)

			})
	})


program
	.command('newModel <modelname>')
	.description('Add a new model to your project')
	.action((modelname) => {
		newComponent({ modelname })
	})


program
	.command('newModule <modulename>')
	.description('Add a new module to your project')
	.action((modulename) => {
		newComponent({ modulename })
	})


program.parse(process.argv)

