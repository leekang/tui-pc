import React, { Component } from 'react'
import {Button,Loading} from 'tui';

export default class LoadingDemo extends Component {
	showLoading(){
		Loading.show({
			//loadingView:<div>123</div>
		});
		clearTimeout(this.timeout)
		this.timeout = setTimeout(()=>{
			Loading.hide();
		},3000);
	}
	render() {
		return (
			<div>
				<Button onClick={this.showLoading.bind(this)}>loading...</Button>
			</div>
		)
	}
}
