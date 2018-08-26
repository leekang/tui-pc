import React, { Component } from 'react'
import classNames from 'classnames';
import Item from './item';
import {Tool} from 'tui';
export default class Checker extends Component {
	static Item = Item;
	static defaultProps = {
		formIgnore:false,
		type:'array',
		multiple:true,
		cancelAble:true,  //针对单选  是否点击可取消
	}
	value = [];
	constructor(props){
		super(props);
		this.setValue(props.defaultValue,false);
	}
	getName(name = 'name'){
		return this.props[name];
	}
	getValue(){
		const { multiple,type} = this.props;
		if(multiple){
			if(type == 'array'){
				return this.value;
			}
			if(type == 'string'){
				return this.value.join(",")
			}
		}else{
			return this.value[0];
		}
	}
	setValue(val,childFresh = true){
		if(typeof(val)=="undefined"){
			this.value = []
		}else{
			this.value = val;
		}
		if(!(this.value instanceof Array) && this.props.type != 'string'){
			this.value = [val]
		}
		if(typeof(val) == 'string' && this.props.type == 'string'){
			this.value = val.split(',');
		}
		if(childFresh){
			Tool.queryReactDomAll(this.refs.wrap,".tui-checker-item").forEach((v)=>{
				v.checkSelect();
			})
		}
	}
	onChange(){
		if(this.props.onChange){
			this.props.onChange(this.getValue())
		}
	}
	isActive(value){
		return this.value.indexOf(value) >= 0;
	}
	toggleSelect(value){
		const { multiple,cancelAble } = this.props;
		let index = this.value.indexOf(value);
		let length = this.value.length;
		if(index >= 0){
			if(multiple){
				this.value.splice(index,1);
			}else{
				if(cancelAble){
					//单选 已存在
					this.value = [];
				}
			}
		}else{
			if(multiple){
				this.value.push(value);
			}else{
				this.value = [value];
				if(length >0){
					Tool.queryReactDomAll(this.refs.wrap,".tui-checker-item").forEach((v)=>{
						v.checkSelect();
					})
				}
			}
		}
		this.onChange();
		return index < 0;
	}
	render() {
		const { className,children,formIgnore,node,item,...props } = this.props;
		if(node){
			let Node = node;
			return (
				<Node className={classNames("tui-checker",{"tui-form-control":!formIgnore},className)} ref="wrap">
					{children}
				</Node>
			)
		}else{
			return (
				<div className={classNames("tui-checker",{"tui-form-control":!formIgnore},className)} ref="wrap">
					{children}
				</div>
			);
		}
	}
}
