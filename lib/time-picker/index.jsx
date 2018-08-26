import React, { Component } from 'react'
import classNames from 'classnames';
import {TimePicker} from 'antd';
import {Tool} from 'tui';

export default class TimeSelect extends Component {
	state={
		value: null || this.props.defaultValue
	}
	getName(name = 'name'){
		return this.props[name];
	}
	getValue(){
		return this.state.value;
	}
	onChange(time,timeString){
		this.setState({
			value: timeString
		})
		if(this.props.onChange){
			this.props.onChange(time,timeString)
		}
	}
	render(){
		const { className,defaultValue,format,style,placeholder,disabled, ...props } = this.props;
		let fmt = format || 'HH:mm:ss'
		return(
			<div className={classNames("tui-time-wrapper tui-form-control",className)}>
				<If condition={defaultValue}>
					<TimePicker defaultValue={Tool.momentTime(defaultValue,'HH:mm:ss')} disabled={disabled} placeholder={placeholder} format={fmt} style={style} onChange={this.onChange.bind(this)}/>
				</If>
				<If condition={!defaultValue}>
					<TimePicker format={fmt} style={style} disabled={disabled} placeholder={placeholder} onChange={this.onChange.bind(this)}/>
				</If>
			</div>
		)
	}
}
