import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import {Icon,MountRoot,Button} from 'tui';
import QueueAnim from 'rc-queue-anim';
import Confirm from './confirm';
export default class Modal extends Component {
	static defaultProps = {
		maskClosable:true,
		closable:true,
		okText:'确定'
	};
	static confirm(info = {}){
		if(!Modal.modalConfirmNode){
			Modal.modalConfirmNode = document.createElement('div');
			document.getElementsByTagName('body')[0].appendChild(Modal.modalConfirmNode);
		}
		ReactDOM.render(<Confirm info={info} key={Date.now()}/>,Modal.modalConfirmNode);
	}
	onOk(){
		if(this.props.onOk){
			this.props.onOk();
		}
	}
	onCancel(){
		if(this.props.onCancel){
			this.props.onCancel();
		}
	}
	render() {
		const {
			className,
			visible,
			title,
			top,
			onOk,
			onCancel,
			background,
			width,
			okText,
			cancelText,
			footer,
			closable,
			maskClosable,
			wrapClassName,
			children, ...props } = this.props;

		let wrapSty = {};
		if(width){
			wrapSty.width = width;
		}
		if(top){
			wrapSty.top = top;
		}
		if(background){
			wrapSty.background = background;
		}
		return (
			<MountRoot visible={visible} closeDelay={300}>
				<div className={classNames("tui-modal",className)}>
					<QueueAnim animConfig={{opacity:[1, 0]}}  duration={200} leaveReverse>
						<If condition={visible}>
							<div className="tui-modal-bg" key="bg"></div>
						</If>
					</QueueAnim>
					<QueueAnim type="scale" className="tui-modal-con o-a" duration={300} leaveReverse>
						<If condition={maskClosable}>
							<div className="tui-modal-con-bg" onClick={this.onCancel.bind(this)} key="conBg"></div>
						</If>
						<If condition={visible}>
							<div className={classNames("tui-modal-wrap",wrapClassName)} {...props} key="wrap" style={wrapSty}>
								<If condition={closable}>
									<a className="tui-modal-close" onClick={this.onCancel.bind(this)}><Icon name="cross"/></a>
								</If>
								<div className="tui-modal-con-wrap">
									<If condition={title}>
										<div className="tui-modal-header">
											{title}
										</div>
									</If>
									<If condition={children}>
										<div className="tui-modal-body">
											{children}
										</div>
									</If>
								</div>
								<If condition={footer}>
									<div className="tui-modal-footer b-t">
										{footer}
									</div>
								</If>
								<If condition={!footer && footer !== false}>
									<div className="tui-modal-footer text-right">
										<Button onClick={this.onCancel.bind(this)} className="m-r-sm">{cancelText || '取消'}</Button>
										<Button type="primary" onClick={this.onOk.bind(this)}>{okText || '确定'}</Button>
									</div>
								</If>
							</div>
						</If>
					</QueueAnim>
				</div>
			</MountRoot>
		)
	}
}
