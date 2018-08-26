import React, { Component } from 'react'
import classNames from 'classnames';
import {Row,Col,Tool} from 'tui';

export default class Option extends Component {
	state  = {
		
	}
	componentDidMount(){
		setTimeout(()=>{
			let parentDom =  Tool.queryParentReactDom(this.refs.self,".tui-select-panel-body-dropdown");
			this.selectServer = parentDom.props.selectServer;
			this.getCurrentChildren();
			this.registEvents();
		},50);
	}
	getCurrentChildren(){
		if(this.selectServer.getCurrentChildren().children instanceof Array){//如果是多选组件那么过来的是数组否则就只是一个字符串
			if(this.selectServer.getCurrentChildren().children.indexOf(this.props.children) > -1){
				if(this.selectServer.getCurrentChildren().isSelected){
					Tool.addClass(this.refs.self,"tui-select-panel-body-dropdown-menu-item-selected")
				}else{//没有默认值那么应该是active
					Tool.addClass(this.refs.self,"tui-select-panel-body-dropdown-menu-item-active")
				}
			}
		}else{
			if(this.props.children === this.selectServer.getCurrentChildren().children){
				if(this.selectServer.getCurrentChildren().isSelected){
					Tool.addClass(this.refs.self,"tui-select-panel-body-dropdown-menu-item-selected")
				}else{//没有默认值那么应该是active
					Tool.addClass(this.refs.self,"tui-select-panel-body-dropdown-menu-item-active")
				}
			}
		}
	}
	registEvents(){
		this.analyseActive = (data)=>{
			if(data instanceof Array){
				if(data.indexOf(this.props.children) > -1){
					Tool.addClass(this.refs.self,"tui-select-panel-body-dropdown-menu-item-active")
				}else{
					Tool.removeClass(this.refs.self,"tui-select-panel-body-dropdown-menu-item-active");
				}
			}else{
				if(this.props.children === data){
					Tool.addClass(this.refs.self,"tui-select-panel-body-dropdown-menu-item-active")
				}else{
					Tool.removeClass(this.refs.self,"tui-select-panel-body-dropdown-menu-item-active");
				}
			}
		}
		this.setValue = (data)=>{
			if(data instanceof Array){

				if(data.indexOf(this.props.children) > -1){
					Tool.addClass(this.refs.self,"tui-select-panel-body-dropdown-menu-item-selected")
				}else{
					Tool.removeClass(this.refs.self,"tui-select-panel-body-dropdown-menu-item-selected")
				}
			}else{
				if(this.props.children === data){
					Tool.addClass(this.refs.self,"tui-select-panel-body-dropdown-menu-item-selected")
				}else{
					Tool.removeClass(this.refs.self,"tui-select-panel-body-dropdown-menu-item-selected")
				}
			}
		}
		this.selectServer.on("setValue",this.setValue)
		this.selectServer.on("analyseActive",this.analyseActive)
	}
	componentWillUnmount(){
		this.selectServer.off("setValue",this.setValue)
		this.selectServer.off("analyseActive",this.analyseActive)	
	}
	setValue(){
		this.selectServer.setValue(this.props.children)
	}
	liMouseOver(){
		this.selectServer.reLocatePos(this.props.children);
	}
	render() {
		return (				
			<div 
			ref="self"
			className="tui-select-panel-body-dropdown-menu-item" 
			onMouseOver={this.liMouseOver.bind(this)}
			onClick={this.setValue.bind(this)}>
				{this.props.children}
			</div>	
		)
	}
}
