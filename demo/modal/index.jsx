import React, { Component } from 'react'
import {Button,Modal} from 'tui';

export default class ModalDemo extends Component {
	state = {};
	showModal(){
		this.setState({
			visible:true
		})
	}
	closeModal(){
		this.setState({
			visible:false
		})
	}
	render() {
		return (
			<div>
				<div>
					<Button onClick={this.showModal.bind(this)}>打开modal</Button>
				</div>
				<If condition={this.state.visible}>
					<Modal visible={this.state.visible} title="标题" onCancel={this.closeModal.bind(this)} height={500}>
						<div>
							这里是内容，默认居中
							<div>行高默认1.25，字体使用sm（13px）</div>
						</div>
					</Modal>
				</If>
			</div>
		)
	}
}
