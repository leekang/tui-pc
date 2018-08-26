import React, { Component } from 'react'
import classNames from 'classnames';
import { findDOMNode } from 'react-dom';

import {Tool,Dropdown,Row,Col,Input,Icon} from 'tui';
//这是一个多选组件里面的value是一个数组。
export default class Newselect extends Component {
	state  = {
	}
	delValue(event){
		event.stopPropagation();
		this.props.delValue(this.props.value)
	}
	
	render() {
		return (				
			<div className="group-multiple-item m-t-b-sm s-m-i-m-r-padder">	
				<span>
					{this.props.value}
				</span>
				<Icon className="tui-icon-guanbi" onClick={this.delValue.bind(this)}/>
			</div>			
		)
	}
}
