import React, { Component } from 'react'
import Modal from './index';
export default class Confirm extends Component {
	state = {
		visible:true
	}
	onCancel(){
		this.setState({
			visible:false
		})
		if(this.props.info.onCancel){
			this.props.info.onCancel();
		}
	}

	onOk(){
		this.setState({
			visible:false
		})
		if(this.props.info.onOk){
			this.props.info.onOk();
		}
	}
	render(){
		const {
			className,
			content,
			onOk,
			onCancel,
			...props } = this.props.info;
		return (
			<Modal width={340} className={className,"tui-modal-confirm"} visible={this.state.visible} onOk={this.onOk.bind(this)} onCancel={this.onCancel.bind(this)} {...props}>
				{content}
			</Modal>
		)
	}
}
