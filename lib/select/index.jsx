import React, { Component } from 'react'
import {Select} from 'antd';
import classNames from 'classnames';

const Option = Select.Option;
export default class TuiSelect extends Component {
	static Option = Option;
	state = {
	}
	componentDidMount(){
		let defaultValue = this.props.defaultValue;
		if(defaultValue){
			this.value = this.props.defaultValue;
		}
	}
	valueChange(value){
		this.value = value;
		if(this.props.onChange){
			this.props.onChange(value)
		}
	}
	getName(name = 'name'){
		return this.props[name];
	}
	getValue(){
		return this.value;
	}
	render(){
		const {children,onChange,...props} = this.props;//这里直接先用蚂蚁金服的select组件，然后在一点点写。
		return (
			<div className={classNames("tui-select-single tui-form-control")}>
				<Select {...props} onChange = {this.valueChange.bind(this)}>
					{children}
				</Select>
			</div>
		)
	}
}
