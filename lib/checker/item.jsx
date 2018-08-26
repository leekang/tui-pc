import React, { Component } from 'react'
import classNames from 'classnames';
import {Tool,Icon} from 'tui';
import Item from './item';
export default class CheckerItem extends Component {
	static Item = Item;
	static defaultProps = {
		theme:'default'
	}
	state = {};
	componentDidMount(){
		const {value} = this.props;
		if(!this.checkerParent){
			this.checkerParent = Tool.queryParentReactDom(this.refs.wrap,".tui-checker");
		}
		if(!this.checkerParent){
			return;
		}
		this.setState({
			active:this.checkerParent.isActive(value)
		})
	}
	toggleSelect(){
		const { disabled} = this.props;
		if(!this.checkerParent || disabled){
			return false;
		}
		const {value} = this.props;
		this.checkerParent.toggleSelect(value);
		this.setState({
			active:this.checkerParent.isActive(value)
		})
	}
	checkSelect(){
		if(!this.checkerParent){
			return false;
		}
		const {value} = this.props;
		this.setState({
			active:this.checkerParent.isActive(value)
		})
	}
	render() {
		const { className,children,theme,disabled,value,...props } = this.props;
		return (
			<div
				ref="wrap"
				className={classNames("tui-checker-item","tui-checker-item-"+theme,className,{active:this.state.active,'tui-checker-item-disabled':disabled})}
				onClick={this.toggleSelect.bind(this)}>
				{children}
			</div>
		);
	}
}
