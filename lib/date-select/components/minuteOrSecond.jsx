import React, { Component } from 'react'
import classNames from 'classnames';
import {Row,Tool} from 'tui';
import InputTime from './inputTime';
export default class MinuteOrSecondSelect extends Component {
	constructor(props){
		super(props)
		this.sel = props.ctrl[props.type];
	}
	componentDidMount(){
		const {ctrl} = this.props;
		this.inputTimeChange = (date)=>{
			let val;
			if(this.props.type == 'minute'){
				val = date.format("mm")
			}else{
				val = date.format("ss")
			}
			if(val != this.sel){
				this.sel = val;
				this.refs.ipt.setValue(val)
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
		this.times = Tool.newArray(0,60).map((v)=>{
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
		const {ctrl} = this.props;
		ctrl[this.props.type] = this.refs.ipt.getValue();
		ctrl.date[this.props.type](ctrl[this.props.type])
		ctrl.changeTime(this.date)
	}

	render(){
		const {onSelect,className,type,...props} = this.props;
		let times = this.props.times || this.getTimeList();
		return (
			<div className={className}>
				<InputTime defaultValue={Tool.pad(this.sel,2)} min="0" max="23" ref="ipt"
					onChange={this.iptChange.bind(this)}
					onFocus={this.show.bind(this)}
					onBlur={this.blur.bind(this)}/>

				<If condition={this.visible}>
					<div className="tui-date-picker-time">
						<div className="flex-center tui-date-picker-time-title b-b">
							<If condition={type=="minute"}>选择分钟</If>
							<If condition={type=="second"}>选择秒数</If>
							<div className="tui-date-picker-time-close" onClick={this.hide.bind(this)}>
								<img src="https://s10.mogucdn.com/mlcdn/c45406/170713_795ja52ibbk8d69j2e9050j7754kg_54x55.png" />
							</div>
						</div>
						<Row>
							<For each="item" of={times}>
								<div className="w-1-10 tui-date-picker-time-item flex-center" key={item}>
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
