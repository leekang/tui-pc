import React,{Component} from 'react';
import {Rate} from 'tui';
export default class RateDemo extends Component{
	state={
		value : 3,
		count : 5
	}
	handleChange(value){
		this.setState({value:value});
	}
	render(){
		return (
			<div>
				<Rate count={this.state.count} txt="分" showTxt={true} moveCount={true} defaultValue={this.state.value} onChange={this.handleChange.bind(this)}/>
			</div>
		)
	}
}