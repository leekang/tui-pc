import React, { Component } from 'react'
import classNames from 'classnames';
import {SelectBase,Tree,Input,Icon,Row} from 'tui';

export default class TreeSelect extends SelectBase{
	componentDidMount(){
		this.ctrl.on("visibleChange",(val)=>{
			console.log(val)
		})
		this.ctrl.on("input",(val)=>{
			console.log(val)
		})
	}
	componentWillUnmount(){
	}
	overlayRender(){
		return (
			<div>
				<Tree />
			</div>
		)
	}
}

