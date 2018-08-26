import React, { Component } from 'react'
import moment from 'moment';
import {Tool} from 'tui';
import classNames from 'classnames';
import TuiDateCtrl from './ctrl';
import DateSelect from './date';
import MonthSelect from './month';
import YearSelect from './year';
import ValueIpt from './valueIpt';

export default class TuiDateSelect extends Component {
	static defaultProps = {
		exactTime:'date'
	}
	constructor(props){
		super(props)
		this.ctrl = new TuiDateCtrl;
		this.date = props.defaultValue || moment();
		this.ctrl.date = this.date;
		this.exactTime = this.ctrl.exactTime[props.exactTime];

		if(this.exactTime >= this.ctrl.exactTime.hour){
			this.ctrl.hour = this.date.format("HH");
		}
		if(this.exactTime >= this.ctrl.exactTime.minute){
			this.ctrl.minute = this.date.format("mm");
		}
		if(this.exactTime >= this.ctrl.exactTime.second){
			this.ctrl.second = this.date.format("ss");
		}

		if(props.defaultHour){
			this.ctrl.hour = props.defaultHour;
		}
		if(props.defaultMinute){
			this.ctrl.minute = props.defaultMinute;
		}
		if(props.defaultSecond){
			this.ctrl.second = defaultSecond;
		}

		this.selType = this.props.exactTime;
		if(!this.exactTime){
			this.selType = 'date';
			this.exactTime = this.ctrl.exactTime.date
		}
		if(this.exactTime >= this.ctrl.exactTime.hour){
			this.selType = 'date';
		}
	}
	changeView = (type)=>{
		this.selType = type;
		this.date = this.ctrl.date;
		this.setState({})
	}

	onSelect = (type)=>{
		let _type;
		if(this.ctrl.exactTime[type] >= this.exactTime){
			this.select(this.ctrl.date)
			return;
		}
		if(type == 'year'){
			_type = 'month'
		}
		if(type == 'month'){
			_type = 'date'
		}
		if(type == 'time'){
			this.select(this.ctrl.date)
			return;
		}
		this.changeView(_type)
	}
	select(date){
		this.props.onSelect(date);
	}

	componentDidMount(){
		this.ctrl.on("changeView",this.changeView)
		this.ctrl.on("select",this.onSelect)
	}
	componentWillUnmount(){
		this.ctrl.off("changeView",this.changeView)
		this.ctrl.off("select",this.onSelect)
	}
	render(){
		const {disabledDate,showToday} = this.props;
		return (
			<div>
				<ValueIpt date={this.date} ctrl={this.ctrl} exactTime={this.exactTime}/>
				<If condition={this.selType == 'date'}>
					<DateSelect date={this.date} ctrl={this.ctrl} exactTime={this.exactTime} disabledDate={disabledDate} showToday={showToday}/>
				</If>
				<If condition={this.selType == 'month'}>
					<MonthSelect date={this.date} ctrl={this.ctrl}/>
				</If>
				<If condition={this.selType == 'year'}>
					<YearSelect date={this.date} ctrl={this.ctrl}/>
				</If>
			</div>
		)
	}
}
