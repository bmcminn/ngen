#!/usr/bin/env node

const asset   		  = require('assert')
const pkg     		  = require('./package.json')
const program 		  = require('commander')
const { ngenerate } = require('./generate')
const { prompt } 	  = require('inquirer')


const promptNewAsset = [
	{
		type: 'list',
		name: 'type',
		choices: [
			'Component',
			'Module',
			'Model',
			'Service',
		],
	},
	{
		type: 'input',
		name: 'name',
		message: 'Enter asset name ',
	},
]


program
	.version(pkg.version)
	.description(pkg.description)


program
	.command('new')
	.description('Add a new asset to your project!')
	.action(() => {
		prompt(promptNewAsset)
			.then(ngenerate)
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

