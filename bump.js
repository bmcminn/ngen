
const fs  = require('grunt').file

fs.writeJSON = function(filepath, content, opts) {
  let defaults = {
    spaces:   0,
    replacer: null,
  }

  opts = Object.assign({}, defaults, opts)

  content = JSON.stringify(content, opts.replacer, opts.spaces)
  this.write(filepath, content)
}

const pkgFilepath = './package.json'

const pkg = require(pkgFilepath)


function bump(tick) {

  let version = pkg.version
    .split('.')
    .map((part) => {
      return parseInt(part, 10)
    })

  switch(tick) {
    case 'patch':
      version[2] += 1
      break;

    case 'minor':
      version[1] += 1
      break;

    case 'major':
      version[0] += 1
      break;
  }

  pkg.version = version.join('.')

  console.log('Version bumped to', pkg.version)

  fs.writeJSON(pkgFilepath, pkg, { spaces: 2 })
}


bump(process.argv[2])

