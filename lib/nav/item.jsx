import React, { Component } from 'react'
import classNames from 'classnames';
import {Tool} from 'tui';

export default class NavItem extends Component {
	componentDidMount(){
		this.navWrap = Tool.queryParentReactDom(this.refs.wrap,".tui-nav")
	}
	onClick(){
		const {type} = this.props;
		if(type == 'link'){
			return;
		}
		if(!this.navWrap){
			return;
		}
		console.log(this)
		//this.navWrap.select(this.key)
	}
	checkSelect(){
		if(!this.navWrap){
			return;
		}
		this.setState({
			active:this.navWrap.isSelect(this.props.tab)
		})
	}
	render() {
		const {
			children,
			type,
			...props } = this.props;

		return (
			<div className="tui-nav-item" onClick={this.onClick.bind(this)} ref="wrap">
				{children}
			</div>
		)
	}
}
