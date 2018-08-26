import React, { Component } from 'react'
import classNames from 'classnames';
import {Icon} from 'tui';

export default class Tui extends Component{
	state = {
	}
	getStyle(width,background,style,height){
		if(style == "normal"){
			if(width){
				if(width.toString().indexOf('%') > -1){
					return {
						width:width,
						height:height || 1,
						backgroundColor:background,
						border:0
					}
				}else{
					return {
						width:parseInt(width),
						height:height || 1,
						backgroundColor:background,
						border:0
					}
				}
			}else{
				return {
					width:'auto',
					height:height || 1,
					backgroundColor:background,
					border:0
				}
			}
		}else if(style == 'dash'){
			if(width){
				if(width.toString().indexOf('%') > -1){
					return {
						width:width,
						border: 0,
						borderBottomWidth:height || 1,
						borderStyle:'dashed',
						borderBottomColor:background
					}
				}else{
					return {
						width:parseInt(width),
						border: 0,
						borderBottomWidth:height || 1,
						borderStyle:'dashed',
						borderBottomColor:background
					}
				}
			}else{
				return {
					width:'auto',
					border:0,
					borderBottomWidth:height || 1,
					borderStyle:'dashed',
					borderBottomColor:background
				}
			}
		}
	}
	getClass(style){
		if(style == 'special'){
			return 'special-rule'
		}
	}
	getName(){
		return this.props.name;
	}
	getValue(){
		return this.props.style;
	}
	render(){
		const {width,background,style,height} = this.props;
		return (
			<div className={classNames("")}>
				<hr className={this.getClass(style)} style={this.getStyle(width,background,style,height)}/>
			</div>
		)
	}
}