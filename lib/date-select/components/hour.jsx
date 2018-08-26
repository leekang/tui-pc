import React, { Component } from 'react'
import classNames from 'classnames';
import {Row,Tool} from 'tui';
import InputTime from './inputTime';

export default class HourSelect extends Component {
	constructor(props){
		super(props)
		this.sel = props.ctrl.hour;
	}
	componentDidMount(){
		const {ctrl} = this.props;
		this.inputTimeChange = (date)=>{
			if(date.format("HH") != this.sel){
				this.sel = ctrl.date.format("HH");
				this.refs.ipt.setValue(this.sel)
			}
		}
		ctrl.on("inputTime",this.inputTimeChange)
	}
	componentWillUnmount(){
		const {ctrl} = this.props;
		ctrl.off("inputTime",this.inputTimeChange)
	}

	blur(){
		this.hide();
		let sel = this.refs.ipt.getValue();
		if(!sel){
			sel = 0;
		}
		this.sel = sel;
		this.refs.ipt.setValue(Tool.pad(sel,2))
	}
	show(){
		this.visible = true;
		this.setState({})
	}
	hide(){
		setTimeout(()=>{
			this.visible = false;
			this.setState({})
		},200)
	}
	getTimeList(){
		if(this.times){
			return this.times;
		}
		this.times = Tool.newArray(0,24).map((v)=>{
			return Tool.pad(v,2)
		})
		return this.times;
	}
	select(item){
		this.refs.ipt.setValue(item)
		this.onChange()
	}
	iptChange(){
		let sel = Tool.pad(this.refs.ipt.getValue(),2);
		if(this.times.indexOf(sel) < 0 && sel !== ''){
			this.refs.ipt.setValue(this.sel)
			return;
		}
		this.sel = sel;
		this.onChange()
		this.setState({})
	}
	onChange(){
		const {ctrl} = this.props
		ctrl.hour = this.refs.ipt.getValue();
		ctrl.date.hour(ctrl.hour)
		ctrl.changeTime();
	}

	render(){
		const {onSelect,className,...props} = this.props;
		let times = this.props.times || this.getTimeList();
		return (
			<div className={className}>
				<InputTime defaultValue={Tool.pad(this.sel,2)} min="0" max="59" ref="ipt"
					onChange={this.iptChange.bind(this)}
					onFocus={this.show.bind(this)}
					onBlur={this.blur.bind(this)}/>
				<If condition={this.visible}>
					<div className="tui-date-picker-hour tui-date-picker-time">
						<div className="flex-center tui-date-picker-time-title b-b">选择小时</div>
						<Row>
							<For each="item" of={times}>
								<div className="w-1-6 tui-date-picker-time-item flex-center" key={item}>
									<div className={classNames("tui-date-picker-time-inner flex-center",{active:this.sel == item})}  onClick={this.select.bind(this,item)}>{item}</div>
								</div>
							</For>
						</Row>
					</div>
				</If>
			</div>
		)
	}
}
