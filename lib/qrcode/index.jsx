import React, { Component } from 'react';
import classNames from 'classnames';

export default class Qrcode extends Component{
	state={
		id: 'tui-qrcode-' + new Date().getTime(),
		width: this.props.width||96,
		height: this.props.height||96,
		origin: this.props.origin||''
	};
	componentWillReceiveProps(nextProps){
		if(nextProps.origin){
			this.state.qrcodeObj.makeCode(this.state.origin)
		}
	}
	componentDidMount() {
		console.log(this.state.width)
		this.state.qrcodeObj = new QRCode(document.getElementById(this.state.id), {
	        width: this.state.width,//设置宽高
	        height: this.state.height
	    });
	    if(!this.props.origin) return false;
	    this.state.qrcodeObj.makeCode(this.state.origin)
	}
	render(){
		const id = this.state.id;
		const {
			className,
			...props } = this.props
		return (
			<div className={'tui-qrcode', classNames(className)} id={id}></div>
		)
		
	}
}
