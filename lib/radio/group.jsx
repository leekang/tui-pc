import React, { Component } from 'react'
import classNames from 'classnames';
import {Tool} from 'tui';
export default class RadioGroup extends Component {
	componentDidMount(){
		this.setDefaultValue(this.props)
	}
 /* componentWillReceiveProps(props) {*/
		//this.setDefaultValue(props)
	/*}*/
	setDefaultValue(props){
		let radioInputs = Tool.queryReactDomAll(this.refs.radioGroup,'.tui-radio-input');
		radioInputs.forEach((v)=>{
			v.setName(this.props.name);
			if(v.props.value === props.defaultValue){
				v.setChecked(v.props.value);
			}
		})
	}
	onChange(e,dom){
		if(this.props.onChange){
			this.props.onChange(e,dom)
		}
	}
	getName(name = 'name'){
		return this.props[name];
	}
	getValue(){
		let radioInputs = Tool.queryReactDomAll(this.refs.radioGroup,'.tui-radio-input');
		let value = null;
		radioInputs.forEach((v)=>{
			let val =v.getValue();
			if(val!==null){
				value = val;
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
		const {className,children,onChange,defaultValue,name,disabled,...props } = this.props;
		return (
			<div className={classNames(className)} {...props} className="tui-radio-group tui-form-control" ref="radioGroup">
				{children}
				<If condition={disabled}>
					<div className="tui-radio-group-disabled"></div>
				</If>
			</div>
		)
	}
}
