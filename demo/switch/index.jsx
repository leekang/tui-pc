import React, { Component } from 'react'
import {Switch} from 'tui';

export default class SwitchDemo extends Component {
	onChange(e){
		console.log(e)
	}
	render() {
		return (
			<div>
				<div className="p">
					<Switch defaultChecked={true}/>
					<Switch />
				</div>
				<div className="p">
					<Switch defaultChecked={true} size="sm"/>
					<Switch size="sm"/>
				</div>
				<div className="p">
					<Switch defaultChecked={true} size="md"/>
					<Switch size="md"/>
				</div>
				<div className="p">
					<Switch checked disabled />
					<Switch disabled />
				</div>
			</div>
		)
	}
}
