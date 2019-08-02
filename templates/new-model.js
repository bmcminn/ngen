module.exports = (asset) => {

  let assetType = 'Model'

  asset.classname = `${asset.classname}${assetType}`
  asset.filename  = `${asset.slug}.${assetType.toLowerCase()}`

	let modelContent =
`export class ${asset.classname}Model {
  stringVlue: string;     //
  numberValue: number;    // must be in a range of 1-12
  anyValue: any;          //
}`


  let targetPath    = asset.pathsMap[assetType.toLowerCase()]
  let assetBasePath = path.resolve(process.cwd(), targetPath)


  // model script
  asset.files.push({
    content:  modelContent,
    filename: asset.filename,
    filepath: path.resolve(assetBasePath, `${asset.slug}/${asset.filename}.${asset.scriptExt}`),
    type:     asset.scriptExt,
  })


  return asset;
}
