const path = require('path')

module.exports = (asset) => {

  let assetType = 'Component'

  asset.classname = `${asset.classname}${assetType}`
  asset.filename  = `${asset.slug}.${assetType.toLowerCase()}`


  let styleContent =
`@import "~assets/styles/imports/variables"

`


  let scriptContent =
`import { Component, OnInit, Input, Output } from '@angular/core';

import { LoadingComponent }       from '@components/loading/loading.component';

import { AppConfig }              from '@config/app.config';

import { Labels }                 from '@labels/labels';

import { lsGetItem, lsSetItem }   from '@helpers/storage.helpers';


@Component({
  selector: '${asset.slug}',
  templateUrl: './${asset.filename}.html',
  styleUrls: ['./${asset.filename}.sass'],
})
export class ${asset.classname} implements OnInit {

  // CONSTANTS
  public labels           = Labels('en-us');
  public user             = lsGetItem('user'); // should always be availble provided our user session is valid


  // BOOLEANS
  public isLoading        = true;


  // COMPONENT INPUTS
  // @Input() KEY = VALUE;


  // COMPONENT OUTPUTS
  // @Output() methodNam e = new EventEmitter();


  // COMPONENT PROPERTIES



  // COMPONENT CONSTRUCTOR
  public constructor(
    public AppConfig: AppConfig,
  ) {}


  // COMPONENT LIFECYCLE METHODS
  ngOnInit(): any {

  }


  // COMPONENT METHODS


}
`

  let templateContent =
`<div>
  ${asset.classname} markup goes here
</div>
`


  let targetPath    = asset.pathsMap[assetType.toLowerCase()]
  let assetBasePath = path.resolve(process.cwd(), targetPath)


  // stylesheet
  asset.files.push({
    content:  styleContent,
    filename: asset.filename,
    filepath: path.resolve(assetBasePath, `${asset.slug}/${asset.filename}.${asset.styleExt}`),
    type:     asset.styleExt,
  })


  // script file
  asset.files.push({
    content:  scriptContent,
    filename: asset.filename,
    filepath: path.resolve(assetBasePath, `${asset.slug}/${asset.filename}.${asset.scriptExt}`),
    type:     asset.scriptExt,
  })


  // template
  asset.files.push({
    content:  templateContent,
    filename: asset.filename,
    filepath: path.resolve(assetBasePath, `${asset.slug}/${asset.filename}.${asset.templateExt}`),
    type:     asset.templateExt,
  })


  return asset;
}
