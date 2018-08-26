import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import Hammer from 'hammerjs';
import classNames from 'classnames';
export default class HammerComponent extends Component {
	//返回hammer对象，方便常量调用
	static constants  = Hammer;
	events = [
		'pan',
		'pinch',
		'press',
		'rotate',
		'swipe',
		'tap',
	];
	componentDidMount(){
		let act = {};
		this.hammer = new Hammer(this.refs.hammer,this.props.setUp || undefined)
		//配置
		if(this.props.options){
			if(this.props.options instanceof Array){
				this.props.options.forEach((v)=>{
					this.hammer.get(v.name).set(v.value);
				})
			}else{
				this.hammer.get(this.props.options.name).set(this.props.options.value);
			}
		}

		//事件绑定
		Object.keys(this.props).forEach((v)=>{
			//判断是否是可选事件
			this.events.forEach((e)=>{
				if(v.indexOf(e) >= 0){
					this.hammer.on(v,this.props[v]);
				}
			})
		})
	}
	render(){
		const {className,style} = this.props;
		return (
			<div ref="hammer" className={classNames(className)} style={style}>
				{this.props.children}
			</div>
		)
	}
}
