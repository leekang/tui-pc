import React,{Component} from 'react';
import {Grouptitle} from 'tui';
export default class NewSelectDemo extends Component{
	state = {
		
	}
	delValue(value){
		console.log(value)
	}
	searchValue(value){
		console.log(value)
	}

	render(){
		return (
			<div className="test-select">
				<Grouptitle 
				style={{width:400}}
				delValue={this.delValue.bind(this)}
				searchValue={this.searchValue.bind(this)}
				value={['测试','sgeg1']}
				placeholder="请选择"/>
			</div>
		)
	}
}