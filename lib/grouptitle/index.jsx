import React, { Component } from 'react'
import classNames from 'classnames';
import { findDOMNode } from 'react-dom';
import SelectMultipleItem from './components/groupItem';

import {Tool,Dropdown,Row,Col,Input} from 'tui';
//这是一个多选组件里面的value是一个数组。
export default class Newselect extends Component {
	state  = {
		searchKey:Date.now()
	}
	
	
	toggleOpen(event){
		this.setState({panelOpen:true,searchKey:Date.now()},()=>{
			if(this.refs.searchInput){
				findDOMNode(this.refs.searchInput).focus();
			}
		})
	}
	clearSearchValue(){
		this.setState({searchValue:"",searchKey:Date.now(),panelOpen:false})
	}
	searchValue(event){
		if(this.props.searchValue){
			this.props.searchValue(event.target.value);
		}
		findDOMNode(this.refs.searchInput).size = event.target.value.length + 2;
	}
	delValue(value){
		if(!this.props.delValue){
			return false;
		}
		this.props.delValue(value);
	}
	render() {
		const {
			children,
			style,
			...props } = this.props;
		return (
			<div className="newGroupTitle">
				<Row align="center" className="tui-group-selection tui-group-multiple p-o-r" style={style} onClick={this.toggleOpen.bind(this)}>	
					
					<If condition={this.props.value.length > 0}>
						<For each="item" of={this.props.value} index="index">
							<SelectMultipleItem 
							key={index}
							delValue={this.delValue.bind(this)}
							value={item}/>
						</For>
					</If>
					<If condition={this.props.value.length == 0}>
						<Row className="tui-group-placeholder m-l-7">
							{this.state.searchValue || this.props.placeholder}
						</Row>
					</If>
					<Row className={classNames("m-l-7",{"d-p-n":!this.state.panelOpen})}>
						<input 
						key={this.state.searchKey}
						ref="searchInput" 
						size="2"
						onChange={this.searchValue.bind(this)} 
						className="tui-multiple-group-search-field" />
					</Row>
				</Row>
			</div>		
		)
	}
}
