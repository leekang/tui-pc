import React, { Component } from 'react';
import classNames from 'classnames';
import {Tool} from 'tui';
import {Tooltip} from 'antd';
import { findDOMNode } from 'react-dom';
import CheckboxGroup from './group';
export default class Checkbox extends Component {
	static Group = CheckboxGroup;
	getName(){
		return this.props.name;
	}
	setName(value){
		this.refs.checkbox.name = value;
	}
	getValue(){
		return this.refs.checkbox.checked?this.refs.checkbox.value:null;
	}
	getInfo(){
		return {
			name:this.props.name,
			value:this.getValue(),
		}
	}
	onChange(e){
		this.parent = Tool.getReactDom(Tool.queryParent(findDOMNode(this),'.tui-checkbox-group'));
		if(this.parent){
			this.parent.onChange(e,this);
			return;
		}
	}
	setChecked(value){
		if(this.refs.checkbox.value == value){
			this.refs.checkbox.checked = true;
		}
	}
	render() {
		const { className,children,defaultChecked,value,name,style,type,title,showTip,substring, ...props } = this.props;
		let checkbox = null;
		if(type == "text" || !type){
			checkbox = <label style={style} className={classNames("tui-checkbox-wrapper",className)} {...props} >
							<span className={classNames("tui-checkbox")} >
								<input type="checkbox" name={name} value={value} defaultChecked={defaultChecked} 
								 onChange={this.onChange.bind(this)} className="tui-checkbox-input tui-form-control" ref="checkbox" />
								<span className="tui-checkbox-inner"></span>
							</span>
							<span> {children}</span>
						</label>
		}else if(type == "image"){
			checkbox = <div className={classNames("",className)} {...props}>
							<div>{children}</div>
							<label className="tui-checkbox-wrapper">
								<span className={classNames("tui-checkbox")} >
									<input type="checkbox" name={name} value={value} defaultChecked={defaultChecked} 
									 onChange={this.onChange.bind(this)} className="tui-checkbox-input tui-form-control" ref="checkbox" />
									<span className="tui-checkbox-inner"></span>
								</span>
								<If condition={showTip}>
								<Tooltip title={title}>
									<span> {title.substring(0,substring) + (title.length>substring?"...":'')}</span>
								</Tooltip>
							</If>
							<If condition={!showTip}>
								<span> {title}</span>
							</If>
							</label>
						</div>
		}
		return checkbox;
	}
}
