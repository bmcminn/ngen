
const path          = require('path')
const fs            = require('grunt').file

const newComponent  = require('./templates/new-component')
const newConfig     = require('./templates/new-config')
const newModel      = require('./templates/new-model')
const newModule     = require('./templates/new-module')
const newPipe       = require('./templates/new-pipe')
const newRoute      = require('./templates/new-route')
const newService    = require('./templates/new-service')
const newView       = require('./templates/new-view')


function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^\w\d-\s]/g, '')
    .replace(/[-_\s]+/g, '-')
    .trim()
}


function camelize(str) {
  return str
    .replace(/-/g, ' ')
    .split(' ')
    .map((word, i) => {
        word = word.split('')
        word[0] = word[0].toUpperCase() //.splice(0, 1, word[0].toUpperCase())
        return word.join('')
    })
    .join('')
    .replace(/[^\w\d]/g, '')
    .trim()
}


function normalizePathsMap() {

  let assetMapPath  = path.resolve(process.cwd(), './src/tsconfig.app.json')

  // console.log(assetMapPath)

  let assetPaths    = fs.readJSON(assetMapPath).compilerOptions.paths

  let newPaths = {}

  Object.keys(assetPaths)
    .map((key) => {
      let prop  = assetPaths[key][0]

      prop = prop.substring(0, prop.length-2)

      key = key
        .replace(/[^\w\d]/g, '')
        .replace(/s$/, '')

      newPaths[key] = path.resolve(process.cwd(), './src', prop)
    })

  return newPaths
}


/**
 * [description]
 * @param  {[type]} asset [description]
 * @return {[type]}       [description]
 */
const ngenerate = (asset) => {

  asset.slug        = slugify(asset.name)
  asset.classname   = camelize(asset.name)

  asset.styleExt    = 'sass'
  asset.templateExt = 'html'
  asset.scriptExt   = 'ts'

  asset.pathsMap    = normalizePathsMap()

  asset.files       = []

  // run through the necessary macros based on what type of thing we just initialized
  switch(asset.type) {

    case 'Component':
      asset = newComponent(asset)
      break;

    case 'Config':
      asset = newConfig(asset)
      break;

    case 'Model':
      asset = newModel(asset)
      break;

    case 'Module':
      asset = newModule(asset)
      // asset = newRoute(asset)
      break;

    case 'Pipe':
      asset = newPipe(asset)
      break;

    case 'Route':
      asset = newRoute(asset)
      break;

    case 'Service':
      asset = newService(asset)
      asset = newModel(asset)
      break;

    case 'View':
      asset = newView(asset)
      asset = newModule(asset)
      asset = newRoute(asset)
      asset = newService(asset)
      asset = newModel(asset)
      break;
  }


  asset.files
    .map((file) => {
      console.log(`creating ${file.name}...`, file)

      let opts = {}

      fs.write(file.filepath, file.content, opts)
      // fs.writeFileSync(file.)
    })


  // console.log(asset)
}



module.exports = {
  ngenerate,
}
