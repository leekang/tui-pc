import React, { Component } from 'react'
import moment from 'moment';
import classNames from 'classnames';
import {Tool,Row,Col} from 'tui';

export default class MonthSelect extends Component {
	constructor(props){
		super(props)
		this.ctrl = this.props.ctrl;
		this.date = props.date;
		this.month = parseInt(this.date.format("M"))-1
		this.months = moment.monthsShort().map((v,i)=>{
			return {
				value:i,
				name:v
			}
		})
	}
	componentDidMount(){
		const {ctrl} = this.props;
		this.inputTimeChange = (date)=>{
			let change = false;
			if(date.format("YYYY") != this.date.format("YYYY")){
				this.date.year(date.format("YYYY"))
				change = true;
			}
			if(date.format("MM") != this.date.format("MM")){
				this.month = parseInt(date.format("M"))-1
				this.date.month(this.month)
				change = true;
			}
			if(change){
				this.setState({})
			}
		}
		ctrl.on("inputTime",this.inputTimeChange)
	}
	componentWillUnmount(){
		const {ctrl} = this.props;
		ctrl.off("inputTime",this.inputTimeChange)
	}
	onSelect(month){
		this.date.month(month.value)
		this.ctrl.selectDate(this.date,'month')
		this.ctrl.changeTime()
	}
	toYear(){
		this.ctrl.changeView("year")
	}
	changeYear(size){
		this.date.add(size,'years');
		this.setState({})
	}

	render(){
		const {ctrl} = this.props;
		return (
			<div>
				<Row justify="space-between" className="b-b h-30" align="center">
					<Row>
						<div className="padder-xs c-po tui-date-picker-prev" onClick={this.changeYear.bind(this,-1)}><img src={ctrl.prevImg}/></div>
					</Row>
					<Row>
						<div className="padder-xs c-po" onClick={this.toYear.bind(this)}>
							{this.date.format("YYYY")}
						</div>
					</Row>
					<Row>
						<div className="padder-xs c-po tui-date-picker-next" onClick={this.changeYear.bind(this,1)}><img src={ctrl.nextImg} /></div>
					</Row>
				</Row>
				<div className="tui-date-picker-con-wrap">
					<Row>
						<For each="month" of={this.months}>
							<Col className="w-1-3" key={month.name} onClick={this.onSelect.bind(this,month)}>
								<div className="flex-center tui-date-picker-month-item-wrap">
									<div className={classNames("tui-date-picker-month-item flex-center",{active:month.value == this.month})}>
										{month.name}
									</div>
								</div>
							</Col>
						</For>
					</Row>
				</div>
			</div>
		)
	}
}
