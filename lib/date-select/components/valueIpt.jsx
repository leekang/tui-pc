import React, { Component } from 'react'
import moment from 'moment';

export default class TuiDateValueIpt extends Component {
	componentDidMount(){
		const {date,ctrl,exactTime} = this.props;
		let format = ['YYYY','-MM','-DD',' HH',':mm',":ss"].slice(0,exactTime).join("")
		this.refs.ipt.value = date.format(format)
		ctrl.on("changeTime",()=>{
			if(this.unmount){
				return;
			}
			this.refs.ipt.value = ctrl.date.format(format)
		})
	}
	componentWillUnmount(){
		this.unmount = true;
	}
	onChange(e){
		let date = moment(e.target.value,"YYYY-MM-DD HH:mm:ss")
		if(date.isValid()){
			this.props.ctrl.inputTime(date)
		}
	}
	render(){
		return (
			<div className="tui-date-picker-value b-b">
				<input type="text" ref="ipt" onChange={this.onChange.bind(this)}/>
			</div>
		)
	}
}
