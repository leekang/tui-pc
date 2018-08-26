import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import {Tool} from 'tui';
import {Tooltip} from 'antd';
import classNames from 'classnames';
import RadioGroup from './group';
export default class Radio extends Component {
	static Group = RadioGroup;
	getName(name = 'name'){
		return this.props[name];
	}
	setName(value){
		this.refs.radio.name = value;
	}
	getValue(){
		return this.refs.radio.checked?this.refs.radio.value:null;
	}
	getInfo(){
		return {
			name:this.props.name,
			value:this.refs.radio.checked
		}
	}
	onChange(e){
		this.parent = Tool.getReactDom(Tool.queryParent(findDOMNode(this),'.tui-radio-group'));
		if(this.parent){
			this.parent.onChange(e,this);
			return;
		}
	}
	setChecked(value){
		if(this.refs.radio.value == value){
			this.refs.radio.checked = true;
		}
	}
	render() {
		const { className,children,defaultChecked,value,name,style,type,title,showTip,substring, ...props } = this.props;
		let radio = null;
		if(type == "text" || !type){
			radio = (
				<label style={style} className={classNames("tui-radio-wrapper",className)} {...props}>
					<span className={classNames("tui-radio",{"tui-radio-checked":defaultChecked})}>
						<input type="radio" name={name} value={value} defaultChecked={defaultChecked} onChange={this.onChange.bind(this)}
						className="tui-radio-input tui-form-control" ref="radio" />
						<span className="tui-radio-inner"></span>
					</span>
					<span> {children}</span>
				</label>
			)
		}else if(type == "image"){
			radio = (
				<div className={classNames("",className)} {...props}>
					<div>{children}</div>
					<label className="tui-radio-wrapper">
						<span className={classNames("tui-radio",{"tui-radio-checked":defaultChecked})}>
							<input type="radio" name={name} value={value} defaultChecked={defaultChecked} onChange={this.onChange.bind(this)}
							className="tui-radio-input tui-form-control" ref="radio" />
							<span className="tui-radio-inner"></span>
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
			)
		}
		return radio;
	}
}
