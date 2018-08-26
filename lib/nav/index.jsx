import React, { Component } from 'react'
import classNames from 'classnames';
import {Tool} from 'tui';
import NavItem from './item';

export default class Nav extends Component {
	static Item = NavItem;


	//选中tab
	select(key){
		let hasChange = key == this.activeKey;
		this.activeKey = key;
		this.onChange()
	}
	//是否被选中
	isSelect(key){
		return this.activeKey == key;
	}
	onChange(){
		if(this.props.onChange){
			this.props.onChange(this.activeKey)
		}
	}

	render() {
		const {
			children,
			...props } = this.props;
		return (
			<div className="tui-nav" ref="wrap">
				{children}
			</div>
		)
	}
}
