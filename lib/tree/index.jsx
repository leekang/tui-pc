import React, { Component } from 'react'
import classNames from 'classnames';
import {Input,Icon,Row} from 'tui';
import TreeNode from './node';

export default class Tree extends Component{
	static Node = TreeNode;
	render(){
		return (
			<div>树</div>
		)
	}
}

