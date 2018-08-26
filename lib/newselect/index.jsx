import React, { Component } from 'react'
import classNames from 'classnames';
import {Tool,Dropdown,Row,Col,Events} from 'tui';
import Selectsingle from './selectsingle';
import SelectMultiple from './selectMultiple';
import SingleServer from './singleServer';
import MultipleServer from './multipleServer';
import DropDownComponent from './dropDownComponent';
import Option from './option';
export default class Newselect extends Component {
	static Option = Option;
	state = {
		defaultValue:this.props.defaultValue
	}

	constructor(props){
		console.log('ss')
		super(props)
		if(this.props.multiple){
			this.selectServer = new MultipleServer;
		}else{
			this.selectServer = new SingleServer;
		}
	}
	componentDidMount(){
		this.setValue = (value,obj)=>{
			if(!this.props.multiple){
				this.dropClose();
			}
			if(this.props.onSelect){
				this.props.onSelect(value,obj);
			}
			this.setState({defaultValue:value},()=>{
				this.refs.drop.relocation();
			})
		}
		this.selectServer.on("setValue",this.setValue)
	}
	componentWillUnmount(){
		this.selectServer.off("setValue",this.setValue)
	}


	visibleChange(value){
		if(value){
			this.selectServer.openPanel(this.state.defaultValue,this.props.children);
		}else{
			this.selectServer.dropClose()
		}
	}
	dropClose(){
		this.refs.drop.hide();
	}
	dropOpen(){
		this.refs.drop.toggle();
	}
	render() {
		let a = (
			<DropDownComponent {...props} children={this.props.children} selectServer={this.selectServer}/>
		)
		const {
			children,
			...props } = this.props;
		return (
			<div className="tui-select">
				<div className="tui-select-wrap">
				<If condition={!this.props.multiple}>
					<Dropdown
					ref="drop"
					overlay={a}
					onVisibleChange={this.visibleChange.bind(this)}
					sameWidth
					trigger="blurCheck"
					>
						<Selectsingle {...props}
						selectServer={this.selectServer}
						ref="selectsingle"
						dropClose={this.dropClose.bind(this)}
						dropOpen={this.dropOpen.bind(this)}
						value={this.state.defaultValue}/>
					</Dropdown>
				</If>
				<If condition={this.props.multiple}>
					<Dropdown
					ref="drop"
					overlay={a}
					onVisibleChange={this.visibleChange.bind(this)}
					sameWidth
					trigger="blurCheck"
					>
						<SelectMultiple {...props}
						dropOpen={this.dropOpen.bind(this)}
						children={this.props.children}
						dropClose={this.dropClose.bind(this)}
						selectServer={this.selectServer}
						ref="selectMultiple"
						value={this.state.defaultValue || []}/>
					</Dropdown>
				</If>
				</div>
			</div>
		)
	}
}
