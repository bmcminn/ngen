#!/usr/bin/env node

const asset         = require('assert')
const pkg           = require('./package.json')
const program       = require('commander')
const { ngenerate } = require('./generate')
const { prompt }    = require('inquirer')


const promptNewAsset = [
  {
    type: 'list',
    name: 'type',
    choices: [
      'Component',
      'Config',
      'Model',
      'Module',
      'Pipe',
      'Route',
      'Service',
      'View',
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


program.parse(process.argv)

