import React, { Component } from 'react'
import classNames from 'classnames';
import { findDOMNode } from 'react-dom';
import SelectMultipleItem from './selectMultipleItem';

import {Tool,Dropdown,Row,Col,Input} from 'tui';
//这是一个多选组件里面的value是一个数组。
export default class Newselect extends Component {
	state  = {
		searchKey:Date.now()
	}
	componentDidMount(){
		this.selectServer = this.props.selectServer;
		
		this.selectServer.init(this.props.defaultValue,this.props.children)
		this.dropClose = (event)=>{
			window.removeEventListener("keydown",this.ev,false)//取消事件监听
			this.searchShow = false;
			this.setState({panelOpen:'up',searchValue:''})
		}
		this.clearSearchValue = ()=>{
			this.setState({searchValue:"",searchKey:Date.now()},()=>{
				if(this.refs.searchInput){
					findDOMNode(this.refs.searchInput).focus();
				}
			});
		}
		this.selectServer.on("clearSearchValue",this.clearSearchValue)
		this.selectServer.on("dropClose",this.dropClose)
	}
	componentWillUnmount(){
		this.selectServer.off("clearSearchValue",this.clearSearchValue)
		this.selectServer.off("dropClose",this.dropClose)
	}
	toggleOpen(event){
		if(this.state.panelOpen == 'down'){//面板此时是展开的把面板收起来
			this.props.dropClose();
			//window.removeEventListener("keydown",this.ev,false)//取消事件监听
			//this.setState({panelOpen:'up'})
		}else{//打开面板
			this.props.dropOpen()
			this.ev = function(event){
				let size = 0;
				if(event.keyCode == 13){
					size = 1;
				}else if(event.keyCode == 40){
					size = -1;
				}else if(event.keyCode == 38){
					size = 2
				}
				if(size != 0){
					event.stopPropagation();
					event.preventDefault();
					if(size == 1){
						this.selectServer.setValue();
					}else if(size == -1){
						this.selectServer.keyDown();
					}else{
						this.selectServer.keyUp();
					}
				}
			}.bind(this)
			window.addEventListener("keydown",this.ev,false)//监听事件
			this.setState({panelOpen:'down',searchKey:Date.now()},()=>{
				if(this.refs.searchInput){
					findDOMNode(this.refs.searchInput).focus();
				}
			})
		}
	}
	searchValue(event){
		this.setState({searchValue:event.target.value})
		this.selectServer.searchValue(event.target.value);
		findDOMNode(this.refs.searchInput).size = event.target.value.length + 2;
	}
	render() {
		const {
			children,
			style,
			...props } = this.props;
		return (				
			<Row align="center" className="tui-select-selection tui-select-multiple p-o-r" style={style} onClick={this.toggleOpen.bind(this)}>	
				
				<If condition={this.props.value.length > 0}>
					<For each="item" of={this.props.value} index="index">
						<SelectMultipleItem 
						selectServer={this.props.selectServer}
						key={index}
						value={item}/>
					</For>
				</If>
				<If condition={this.props.value.length == 0}>
					<Row className="tui-select-placeholder m-l-7">
						{this.state.searchValue || this.props.placeholder}
					</Row>
				</If>
				<Row className={classNames(" m-l-7",{"d-p-n":this.state.panelOpen != 'down'})}>
					<input 
					key={this.state.searchKey}
					ref="searchInput" 
					size="2"
					onChange={this.searchValue.bind(this)} 
					className="tui-multiple-select-search-field" />
				</Row>
			</Row>			
		)
	}
}
