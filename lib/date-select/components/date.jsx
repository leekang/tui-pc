import React, { Component } from 'react'
import moment from 'moment';
import {Tool,Form,Row,Col,Button} from 'tui';
import classNames from 'classnames';
import Hour from './hour';
import MinuteOrSecond from './minuteOrSecond';

export default class DateSelect extends Component {
	constructor(props){
		super(props)
		this.date = props.date;
		this.todayDate = moment().startOf("day");
		this.todayValue = this.todayDate.valueOf();

		this.days = this.getDates(this.date)

		let w = moment();
		let dow = w.startOf("week").isoWeekday();
		let weeks = moment.weekdaysMin();
		this.weeks = weeks.map((v,i)=>{
			return weeks[(i+dow)%7]
		})
		this.ctrl = this.props.ctrl;
	}
	componentDidMount(){
		this.inputTimeChange = (date)=>{
			if(date.format("YYYY-MM-DD") != this.date.format("YYYY-MM-DD")){
				this.toDate(date)
			}
		}
		this.ctrl.on("inputTime",this.inputTimeChange)
	}
	componentWillUnmount(){
		this.ctrl.off("inputTime",this.inputTimeChange)
	}
	getDates(date){
		const {disabledDate} = this.props;
		//克隆两个时间对象，一个用于月的开始时间，一个用于月的结束时间
		let _fd = date.clone();
		let _ed = date.clone();

		let f = _fd.startOf('month');
		let e = _ed.endOf('month');

		let startDay = f.startOf('week');
		let endDay = e.endOf('week');

		let monthNum = date.format("M")

		let days = [];

		let end = false;
		let endTime = endDay.valueOf();
		while(!end){
			let startTime = startDay.valueOf()
			let mNum = startDay.format("M");
			let dis = false;
			if(disabledDate){
				dis = disabledDate(startDay)
			}
			days.push({
				month:mNum,
				disabled:dis,
				date:startDay.clone(),
				number:startDay.format("D"),
				isToday:startTime == this.todayValue,
				inMonth:mNum == monthNum
			})
			startDay.add(1,'days');
			end = startDay.valueOf() > endTime;
		}
		return days;
	}
	toDate(date){
		this.date = date;
		this.days = this.getDates(this.date)
		this.weeks = moment.weekdaysMin();
		this.setState({})
	}

	onSelect(day){
		if(day.disabled){
			return;
		}
		this.selDate(day.date)
 /*   if(this.props.exactTime >= this.ctrl.exactTime.hour){*/
			//if(day.format("M")){
				//this.toDate(day.date)
				//return;
			//}
			//this.date = day.date;
			//this.setState({})
			//this.ctrl.changeTime(this.date)
		//}else{
			//this.ctrl.selectDate(day.date,"date")
		/*}*/
	}
	selDate(date){
		if(this.props.exactTime >= this.ctrl.exactTime.hour){
			if(!date.format("M")){
				this.toDate(date)
				return;
			}
			this.date = date;
			this.setState({})
			this.ctrl.changeTime(date)
		}else{
			this.ctrl.selectDate(date,"date")
		}
	}
	toYear(){
		this.ctrl.changeView("year")
	}
	toMonth(){
		this.ctrl.changeView("month")
	}
	toToday(){
		const {disabledDate} = this.props;
		if(disabledDate(this.todayDate)){
			return;
		}
		this.selDate(moment())
	}
	changeYear(size){
		this.date.add(size,'years');
		this.toDate(this.date)
		this.ctrl.changeTime(this.date)
	}
	changeMonth(size){
		this.date.add(size,'months');
		this.toDate(this.date)
		this.ctrl.changeTime(this.ctrl.date)
	}
	submit(){
		this.ctrl.selectDate(this.date,'time')
	}
	render(){
		const {exactTime,ctrl,showToday,disabledDate} = this.props;
		let dateNumber = ctrl.date.format("D")
		return (
			<div>
				<Row justify="space-between" className="b-b h-30" align="center">
					<Row>
						<div className="padder-xs c-po tui-date-picker-prev" onClick={this.changeYear.bind(this,-1)}><img src={ctrl.prevImg}/></div>
						<div className="padder-xs c-po  tui-date-picker-p" onClick={this.changeMonth.bind(this,-1)}><img src={ctrl.pImg} /></div>
					</Row>
					<Row>
						<div className="padder-xs c-po" onClick={this.toYear.bind(this)}>
							{this.date.format("YYYY")}
						</div>
						<div className="padder-xs c-po" onClick={this.toMonth.bind(this)}>
							{this.date.format("MMMM")}
						</div>
					</Row>
					<Row>
						<div className="padder-xs c-po tui-date-picker-n" onClick={this.changeMonth.bind(this,1)}><img src={ctrl.nImg} /></div>
						<div className="padder-xs c-po tui-date-picker-next" onClick={this.changeYear.bind(this,1)}><img src={ctrl.nextImg} /></div>
					</Row>
				</Row>
				<div className="tui-date-picker-con-wrap">
					<Row>
						<For each="item" of={this.weeks}>
							<Col className="w-1-7 tui-date-picker-week-name flex-center" key={item}>
								{item}
							</Col>
						</For>
					</Row>
					<Row>
						<For each="day" of={this.days}>
							<Col className={classNames("w-1-7 tui-date-picker-day-wrap",{
								"tui-date-picker-day-today":day.isToday,
								"tui-date-picker-day-other":!day.inMonth,
								"tui-date-picker-day-disabled":day.disabled
							})} key={day.month+'-'+day.number} onClick={this.onSelect.bind(this,day)}>
								<div className="flex-center tui-date-picker-day-item">
									<div className={classNames("tui-date-picker-day-item-inner flex-center",{active:dateNumber == day.number && day.inMonth})}>
										{day.number}
									</div>
								</div>
							</Col>
						</For>
					</Row>
				</div>
				<If condition={showToday && exactTime < ctrl.exactTime.hour}>
					<div className="tui-date-picker-toToday flex-center">
						<div className={classNames("c-po",{'tui-date-picker-toToday-disabled':disabledDate(this.todayDate)})} onClick={this.toToday.bind(this)}>今天</div>
					</div>
				</If>
				<If condition={exactTime >= ctrl.exactTime.hour}>
					<Row className="tui-date-picker-foot padder-xs" align="center">
						<Row align="center" className="flex-1">
							时间:
								<Hour ctrl={ctrl}/>
								<If condition={exactTime >= ctrl.exactTime.minute}>
									:<MinuteOrSecond type="minute" ctrl={ctrl}/>
								</If>
								<If condition={exactTime >= ctrl.exactTime.second}>
									:<MinuteOrSecond type="second" ctrl={ctrl}/>
								</If>
						</Row>
						<Button type="primary" className="tui-date-picker-foot-btn m-l-sm" onClick={this.submit.bind(this)}>确认</Button>
					</Row>
				</If>
			</div>
		)
	}
}
