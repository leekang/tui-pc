import React, { Component } from 'react'
import classNames from 'classnames';
import { findDOMNode } from 'react-dom';

import {Tool,Dropdown,Row,Col,Input} from 'tui';

export default class Newselect extends Component {
	state  = {
		searchKey:Date.now()
	}
	componentDidMount(){
		this.selectServer = this.props.selectServer;
		this.dropClose = (event)=>{
			window.removeEventListener("keydown",this.ev,false)//取消事件监听
			this.searchShow = false;
			this.setState({panelOpen:'up',searchValue:''})
		}
		this.selectServer.on("dropClose",this.dropClose)
	}
	componentWillUnmount(){
		this.selectServer.off("dropClose",this.dropClose)
	}
	toggleOpen(event){
		if(this.props.showSearch){
			if(this.searchShow){
				return false;
			}
		}
		if(this.state.panelOpen == 'down'){//面板此时是展开的把面板收起来
			this.props.dropClose();
			//window.removeEventListener("keydown",this.ev,false)//取消事件监听
			//this.setState({panelOpen:'up'})
		}else{//打开面板
			this.props.dropOpen()
			if(this.props.showSearch){
				this.searchShow = true;
			}
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
	}
	render() {
		const {
			children,
			style,
			...props } = this.props;
		return (				
			<div className="tui-select-selection tui-select-single" style={style}>	
				<Row align="center" className="tui-select-rendered p-o-r" onClick={this.toggleOpen.bind(this)}>
					<If condition={this.props.value}>
						<Row className={classNames({"tui-select-placeholder":this.state.panelOpen == 'down'})}>
							{this.state.searchValue || this.props.value}
						</Row>
					</If>
					<If condition={!this.props.value}>
						<Row className="tui-select-placeholder">
							{this.state.searchValue || this.props.placeholder}
						</Row>
					</If>
					<If condition={this.props.showSearch}>
						<Row className={classNames("tui-select-search-inline",{"d-p-n":this.state.panelOpen != 'down'})}>
							<input 
							key={this.state.searchKey}
							ref="searchInput" 
							onChange={this.searchValue.bind(this)} 
							className="tui-select-search-field" />
						</Row>
					</If>
					<span className={classNames("tui-icon-xiangshang tui-select-up",{"arrow-animation-to-down":this.state.panelOpen == 'down'," arrow-animation-to-up":this.state.panelOpen == 'up'})}></span>
				</Row>
			</div>			
		)
	}
}
