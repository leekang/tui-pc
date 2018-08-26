import React, { Component } from 'react'
import {Select} from 'antd';
import classNames from 'classnames';

const Option = Select.Option;
export default class Multiselect extends Component {
	static Option = Option;
	state = {

	}
	componentDidMount(){
		let defaultValue = this.props.defaultValue;
		if(defaultValue){
			this.setState({value:defaultValue})
		}
	}
	valueChange(value){
		//this.state.value = value;
		this.setState({value:value})
		if(this.props.onChange){
			this.props.onChange(value)
		}
	}
	getName(){
		return this.props.name;
	}
	getValue(){
		return this.state.value;
	}
	render(){
		const {children,multiple,onChange,...props} = this.props;//这里直接先用蚂蚁金服的select组件，然后在一点点写。
		return (
			<div className={classNames("tui-select-multi tui-form-control")}>
				<Select multiple={true} {...props} onChange={this.valueChange.bind(this)}>
					{children}
				</Select>
			</div>
		)
	}
}
