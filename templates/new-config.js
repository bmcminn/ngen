module.exports = (asset) => {

	let assetType = 'Component'

	asset.classname = `${asset.name}${assetType}`
	asset.filename  = `${asset.slug}.${assetType.toLowerCase()}`


	let styleContent =
`@import "~assets/styles/imports/variables"

`


	let scriptContent =
`import { Component, OnInit, Input, Output } from '@angular/core';

import { LoadingComponent }     	from '@components/loading/loading.component';

import { AppConfig }            	from '@config/app.config';

import { Labels }               	from '@labels/labels';

import { lsGetItem, lsSetItem } 	from '@helpers/storage.helpers';


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
	public isValidAddress   = false;
	public isFormComplete   = false;


	// COMPONENT INPUTS
	// @Input() KEY = VALUE;


	// COMPONENT OUTPUTS
	// @Output() methodName = new EventEmitter();


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


	// stylesheet
	asset.files.push({
		type: 		asset.styleExt,
		filepath: path.resolve('', `${asset.filename}.${asset.styleExt}`),
		content: 	styleContent,
	})


	// script file
	asset.files.push({
		type: 		asset.scriptExt,
		filepath: path.resolve('', `${asset.filename}.${asset.scriptExt}`),
		content: 	scriptContent,
	})


	// template
	asset.files.push({
		type: 		asset.templateExt,
		filepath: path.resolve('', `${asset.filename}.${asset.templateExt}`),
		content: 	templateContent,
	})


	return asset;
}
