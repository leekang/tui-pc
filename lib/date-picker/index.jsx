import React, { Component } from 'react'
import classNames from 'classnames';
import {DatePicker} from 'antd';
import {Tool} from 'tui';

export default class TuiDatePicker extends Component {
	state={}
	constructor(props){
		super(props);
		const {defaultValue} = this.props;
		if(defaultValue){
			this.date = Tool.moment(defaultValue);
		}
	}
	componentDidMount(){
		this.form = Tool.queryParentReactDom(this.refs.wrap,".tui-form")
	}
	getName(name = 'name'){
		return this.props[name];
	}
	getValue(){
		if(!this.date){
			return null;
		}
		const {valueType,showTime,format} = this.props;
		if(valueType == 'unix'){
			return this.date.unix();
		}
		if(valueType == 'value'){
			return this.date.valueOf();
		}
		if(format){
			return this.date.format(format)
		}
		if(valueType=='string'){
			if(showTime){
				return this.date.format('YYYY-MM-DD HH:mm:ss')
			}else{
				return this.date.format('YYYY-MM-DD')
			}
		}
		return this.date
	}
	getDate(){
		return this.date;
	}
	onChange(date,dateString){
		this.date = date;
		this.setState({})
		if(this.props.onChange){
			this.props.onChange(date,dateString)
		}
		if(this.form){
			this.form.onChange()
		}
	}
	disabledDate(val){
		if(!val){
			return;
		}
		const { disabledDate,disabledStartReact,disabledEndReact} = this.props;
		if(disabledDate){
			return disabledDate(val)
		}
		if(disabledStartReact && disabledStartReact()){
			let date = disabledStartReact().getDate();
			if(!date){
				return;
			}
			return date.valueOf() > val.valueOf();
		}
		if(disabledEndReact && disabledEndReact()){
			let date = disabledEndReact().getDate();
			if(!date){
				return;
			}
			return date.valueOf() < val.valueOf();
		}
	}
	render(){
		const { className,valueType,disabledDate,disabledStartReact,disabledEndReact,format,defaultValue,...props } = this.props;
		return(
			<div className={classNames("tui-date-wrapper tui-form-control",className)} ref="wrap">
				<DatePicker disabledDate={this.disabledDate.bind(this)} {...props} defaultValue={this.date} onChange={this.onChange.bind(this)}/>
			</div>
		)
	}
}
