import React, { Component } from 'react';
import {Row,Col,RangePicker, Tool} from 'tui';

export default class RangePickerDemo extends Component {
	state={
		rangeKey: new Date().getTime(),
		start: '',
		endt: ''
	}
	getRangeTime(rangeTime){
		console.log(rangeTime)
	}
	render(){
		let { rangeKey, start, end } = this.state;
		return (
			<div style={{width:500}} className="block-center" >
				<Row>
					<RangePicker 
						key={rangeKey}
						defaultValues={[Tool.moment(), Tool.moment()]}
						showTime={true} 
						format="YYYY-MM-DD HH:mm" 
						placeholderStart="开始时间" 
						placeholderEnd="结束时间" 
						onChange={this.getRangeTime.bind(this)}/>
				</Row>
			</div>
		)
	}
}

