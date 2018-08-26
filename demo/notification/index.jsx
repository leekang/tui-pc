import React, { Component } from 'react'
import {Button,Notification} from 'tui';

export default class ModalDemo extends Component {
	showNotification(){
		Notification.config({
			message:'开发中，请勿在项目中使用中使用中使用请勿在项目中使用请勿在项目中使用请勿在项目中使用中使用中使用请勿在项',
			direction:'right',
			multiple:true,
			title:'提示标题',
			icon:'info'
		})
	}
	showNotificationAgain(){
		Notification.config({
			message:'再一次使用方法，方式。',
			direction:'right',
			title:'标题',
			icon:'error'
		})
	}
	showNotificationAgain1(){
		Notification.config({
			message:'再一次使用fffffff方法，方式。',
			direction:'right',
			title:'标题',
			icon:'error'
		})
	}
	render() {
		return (
			<div>
				<Button onClick={this.showNotification.bind(this)}>提示(只显示一个弹出框)</Button>
				<Button onClick={this.showNotificationAgain.bind(this)}>再次(只显示一个弹出框)</Button>
				<Button onClick={this.showNotificationAgain1.bind(this)}>再次(只显示一个弹出框)</Button>

			</div>
		)
	}
}
