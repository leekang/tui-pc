import React, { Component } from 'react'
export default class InputTime extends Component {
	getName(name = 'name'){
		return this.props[name];
	}
	getValue(){
		return this.refs.ipt.value;
	}
	setValue(val){
		return this.refs.ipt.value = val;
	}
	onFocus(e){
		this.refs.ipt.select();
		this.props.onFocus && this.props.onFocus(e)
	}
	render(){
		const {onFocus,tuiDatePickerName,...props} = this.props
		return (
			<input
				className="tui-date-picker-time-input tui-form-control"
				type="number"
				onFocus={this.onFocus.bind(this)}
				{...props} ref="ipt"/>
		)
	}
}
