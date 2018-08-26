import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import {Tool,NullView} from 'tui';
import classNames from 'classnames';
import Ctrl from './ctrl';
import Nav from './nav';
import Content from './content';
let NavItem = Nav.Item;

export default class Tabs extends Component {
	static TabPane = NullView;
	static defaultProps = {
		theme:'default',
		contentVisible:true,
		navVisible:true
	}

	constructor(props){
		super(props)
		this.ctrl  = new Ctrl;
		this.ctrl.activeKey = props.defaultActiveKey;
	}

	componentDidMount(){
		this.ctrl.on("changeActiveKey",(key)=>{
			this.props.onChange && this.props.onChange(key)
		})
	}

	setActiveKey(key){
		this.ctrl.setActiveKey(key)
	}
	parseInfo(){
		const {children} = this.props;
		return React.Children.map(children,(v,i)=>{
			if(!v){
				return;
			}
			return {
				key:v.key || i,
				tab:v.props.tab,
				props:v.props,
				content:v.props.children
			}
		})
	}

	render(){
		const {className,navVisible,contentVisible,theme} = this.props;
		let info = this.parseInfo();
		return (
			<div className={classNames("tui-tabs","tui-tabs-"+theme,className)}>
				<If condition={navVisible}>
					<Nav info={info} ctrl={this.ctrl} theme={theme}/>
				</If>
				<If condition={contentVisible}>
					<Content info={info} ctrl={this.ctrl}/>
				</If>
			</div>
		)
	}
}
