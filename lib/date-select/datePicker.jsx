import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import {Dropdown,Input,Icon,Row} from 'tui';
import DateSelect from './components/select';
import classNames from 'classnames';

export default class DatePicker extends Component {
	static defaultProps = {
		showToday:true,
		allowClear:true,
		exactTime:'date'
	}
	exactTime ={
		second:6,
		minute:5,
		hour:4,
		date:3,
		month:2,
		year:1,
	};
	constructor(props){
		super(props);
		let exactTime = this.exactTime[this.props.exactTime] || 3;
		this.format = ['YYYY','-MM','-DD',' HH',':mm',"ss"].slice(0,exactTime).join("")
	}
	componentDidMount(){
		this.ipt = findDOMNode(this.refs.ipt)
		if(this.props.defaultValue){
			this.ipt.value = this.props.defaultValue.format(this.format)
		}
	}
	onSelect(date){
		this.date = date;
		if(date){
			this.refs.ipt.setValue(date.format(this.format))
		}else{
			this.refs.ipt.setValue('')
		}
		this.onChange(date)
		this.refs.drop.hide();
	}
	clear(e){
		e.stopPropagation();
		this.refs.ipt.setValue('')
		this.date = null;
		this.onChange(this.date)
	}
	onChange(date){
		this.props.onChange && this.props.onChange(date)
	}
	toggle(){
		const {disabled} = this.props;
		if(disabled){
			return;
		}

		this.refs.drop.toggle();
	}
	render(){
		const {className,allowClear,disabled,placeholder,...props} = this.props;
		let dateSel = (
			<div className="tui-date-picker-wrap">
				<DateSelect defaultValue={this.date} onSelect={this.onSelect.bind(this)} {...props}/>
			</div>
		);
		return (
			<div className={classNames("tui-date-picker",className)} onClick={this.toggle.bind(this)}>
				<Dropdown cleanWhenHide topAdd={-32} overlay={dateSel}
					trigger="blurCheck" ref="drop">
					<Row className={classNames("pos-r",{"tui-date-picker-allowClear":this.date && allowClear})}>
						<Input placeholder={placeholder} readOnly ref="ipt" disabled={disabled}/>
						<div className="tui-date-picker-icon flex-center">
							<Icon name="calendarfull" className="d-b tui-date-picker-icon-calendar"/>
							<If condition={this.date && allowClear}>
								<Icon name="close" className="d-b tui-date-picker-icon-clear" onClick={this.clear.bind(this)}/>
							</If>
						</div>
					</Row>
				</Dropdown>
			</div>
		)
	}
}
