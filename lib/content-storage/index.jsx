import React, { Component } from 'react'
import {Tool,NullView} from 'tui';
import classNames from 'classnames';
export default class ContentStorage extends Component{
	static Item = NullView;
	visibleList = [];
	constructor(props){
		super(props);
		let child = React.Children.toArray(props.children);
		this.updateVisible(child)
	}
	componentWillReceiveProps(nextProps) {
		let child = React.Children.toArray(nextProps.children);
		this.updateVisible(child)
	}
	updateVisible(child){
		child.forEach((v,index)=>{
			let id = v.props.id || index;
			if(v.props.condition && this.visibleList.indexOf(id) < 0){
				this.visibleList.push(id);
			}
		})
	}
	itemVisible(item,index){
		let id = item.props.id || index;
		return item.props.condition || this.visibleList.indexOf(id) >= 0;
	}
	itemKey(item,index){
		return item.props.id || index;
	}
	render(){
		const {children,...props} = this.props;
		let child = React.Children.toArray(children);
		return (
			<div {...props}>
				<For each="item" of={child} index="index">
					<If condition={this.itemVisible(item,index)}>
						<div className={classNames({hide:!item.props.condition})} key={this.itemKey(item,index)}>
							{item.props.children}
						</div>
					</If>
				</For>
			</div>
		)
	}
}
