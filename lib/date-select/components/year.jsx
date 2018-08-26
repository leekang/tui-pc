import React, { Component } from 'react'
import moment from 'moment';
import classNames from 'classnames';
import {Tool,Row,Col} from 'tui';

export default class YearSelect extends Component {
	constructor(props){
		super(props)
		this.ctrl = this.props.ctrl;
		this.setInfo(props.date)
	}
	componentDidMount(){
		const {ctrl} = this.props;
		this.inputTimeChange = (date)=>{
			if(date.format("YYYY") != this.date.format("YYYY")){
				this.setInfo(date)
				this.setState({})
			}
		}
		ctrl.on("inputTime",this.inputTimeChange)
	}
	componentWillUnmount(){
		const {ctrl} = this.props;
		ctrl.off("inputTime",this.inputTimeChange)
	}

	setInfo(date){
		this.date = date;
		this.year = parseInt(this.date.format("YYYY"));
		this.years = [];
		let startYear = parseInt(this.year/20)*20;
		for(let i=0;i<20;i++){
			this.years.push(startYear+i);
		}
	}
	onSelect(year){
		this.date.year(year)
		this.ctrl.selectDate(this.date,'year')
		this.ctrl.changeTime()
	}
	changeYear(size){
		this.date.add(size,'years');
		this.ctrl.changeTime(this.date)
		this.setInfo(this.date);
		this.setState({})
	}
	render(){
		const {ctrl} = this.props;
		return (
			<div>
				<Row justify="space-between" className="b-b h-30" align="center">
					<Row>
						<div className="padder-xs c-po tui-date-picker-prev" onClick={this.changeYear.bind(this,-20)}><img src={ctrl.prevImg}/></div>
					</Row>
					<Row>
						<div className="padder-xs">
							{this.years[0]}-{this.years[19]}
						</div>
					</Row>
					<Row>
						<div className="padder-xs c-po tui-date-picker-next" onClick={this.changeYear.bind(this,20)}><img src={ctrl.nextImg} /></div>
					</Row>
				</Row>
				<div className="tui-date-picker-con-wrap">
					<Row>
						<For each="year" of={this.years}>
							<Col className="w-1-5" key={year} onClick={this.onSelect.bind(this,year)}>
								<div className="flex-center tui-date-picker-year-item-wrap">
									<div className={classNames("tui-date-picker-year-item flex-center",{active:year == this.year})}>
										{year}
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
