import Es6Promise from 'es6-promise';
import 'whatwg-fetch'; //fetch补丁


class Polyfill{
	init(){
		//promise补丁
		Es6Promise.polyfill();
		this.assign();
	}
	//object assign 补丁
	assign(){
		//补丁
		if (typeof Object.assign != 'function') {
			Object.assign = function(target) {
				'use strict';
				if (target == null) {
					throw new TypeError('Cannot convert undefined or null to object');
				}
				target = Object(target);
				for (let index = 1; index < arguments.length; index++) {
					let source = arguments[index];
					if (source != null) {
						for (let key in source) {
							if (Object.prototype.hasOwnProperty.call(source, key)) {
								target[key] = source[key];
							}
						}
					}
				}
				return target;
			};
		}
	}
}
export default new Polyfill;
