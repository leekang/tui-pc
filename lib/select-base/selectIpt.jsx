import React, { Component } from 'react'
import classNames from 'classnames';
import {Input} from 'tui';

export default class SelectIpt extends Component {
	constructor(props){
		super(props)
		this.ctrl = props.ctrl;
	}
	onChange(val){
		this.ctrl._onInput(val)
	}
	render(){
		const {showSearch} = this.props.info;
		return (
			<div className="">
				<Input readOnly={!showSearch} onChange={this.onChange.bind(this)}/>
			</div>
		)
	}
}
