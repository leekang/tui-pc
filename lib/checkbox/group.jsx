import React, { Component } from 'react'
import classNames from 'classnames';
import {Tool} from 'tui';
export default class CheckboxGroup extends Component {
	componentDidMount(){
		let checkboxInputs = Tool.queryReactDomAll(this.refs.checkboxGroup,'.tui-checkbox-input');
		checkboxInputs.forEach((v)=>{
			v.setName(this.props.name);
			if((this.props.defaultValue || []).indexOf(v.props.value) >= 0){
				v.setChecked(v.props.value);
			}
		})
	}
	onChange(e,dom){
		if(this.props.onChange){
			let checkboxInputs = Tool.queryReactDomAll(this.refs.checkboxGroup,'.tui-checkbox-input');
			let values = [];
			let checkedList = [];
			checkboxInputs.forEach((v)=>{
				if(v.getValue()){
					values.push(v.getValue());
					checkedList.push(v);
				}
			})
			this.props.onChange(values,checkedList)
		}
	}
	getName(){
		return this.props.name;
	}
	getValue(){
		let checkboxInputs = Tool.queryReactDomAll(this.refs.checkboxGroup,'.tui-checkbox-input');
		let value = [];
		checkboxInputs.forEach((v)=>{
			let val =v.getValue();
			if(val!==null){
				value.push(val);
			}
		})
		return value;
	}
	getInfo(){
		return {
			name:this.props.name,
			value:this.getValue(),
		}
	}
	render() {
		const {className,children,onChange,value,name,disabled,...props } = this.props;
		return (
			<div className={classNames(className)} {...props} className="tui-checkbox-group tui-form-control" ref="checkboxGroup">
				{children}
				<If condition={disabled}>
					<div className="tui-checkbox-group-disabled"></div>
				</If>
			</div>
		)
	}
}
