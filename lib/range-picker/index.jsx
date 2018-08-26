import React, { Component } from 'react'
import { Row, Col } from 'tui';
import { DatePicker } from 'antd';
import classNames from 'classnames';

export default class RangePicker extends Component {
	state = {
		endOpen: false,
		rangePickerTime:{}
	};
	componentWillMount(){
		if(this.props.defaultValues){
			if(isNaN(this.props.defaultValues[0].valueOf())){
				this.state.rangePickerTime.start = null;
			}else{
				this.state.rangePickerTime.start = this.props.defaultValues[0];
			}
			if(isNaN(this.props.defaultValues[1].valueOf())){
				this.state.rangePickerTime.end = null;
			}else{
				this.state.rangePickerTime.end = this.props.defaultValues[1];
			}
		}else{
			this.state.rangePickerTime = {
				start: null,
				end: null
			}
		}
	}
	disabledStartDate = (startValue) => {
	    const endValue = this.state.rangePickerTime.end;
	    if (!startValue || !endValue) {
	      	return false;
	    }
	    return startValue.valueOf() > endValue.valueOf();
	}
	disabledEndDate = (endValue) => {
	    const startValue = this.state.rangePickerTime.start;
	    if (!endValue || !startValue) {
	      	return false;
	    }
	    return endValue.valueOf() < startValue.valueOf();
	}
	onChange = (field, value) => {
	    this.setState({
	      [field]: value,
	    });
	}
	onStartChange = (value) => {
		let rangePickerTime = this.state.rangePickerTime;
	    rangePickerTime.start = value;
		this.props.onChange({
	    	start: rangePickerTime.start?rangePickerTime.start.valueOf():'',
	    	end: rangePickerTime.end?rangePickerTime.end.valueOf():'',
	    });
	    this.setState({
	    	rangePickerTime: rangePickerTime
	    })
	}
	onEndChange = (value) => {
		let rangePickerTime = this.state.rangePickerTime;
	    rangePickerTime.end = value;
	    this.props.onChange({
	    	start: rangePickerTime.start?rangePickerTime.start.valueOf():'',
	    	end: rangePickerTime.end?rangePickerTime.end.valueOf():'',
	    });
	    this.setState({
	    	rangePickerTime: rangePickerTime
	    })
	}
	handleStartOpenChange = (open) => {
	    if (!open) {
	      	this.setState({ endOpen: true });
	    }
	}

	handleEndOpenChange = (open) => {
	    this.setState({ endOpen: open });
	}
	render(){
		const { className,
				style,
				showTime=false,
				format="YYYY-MM-DD",
				placeholderStart,
				placeholderEnd, ...props} = this.props;
		let { rangePickerTime } = this.state;
		return (
			<Row className={classNames("tui-range-picker",className)} style={style}>
				<Col span={12} className="tui-range-picker-start">
					<DatePicker 
						disabledDate={this.disabledStartDate}
				        showTime={showTime}
				        format={format}
				        value={rangePickerTime.start}
				        placeholder={placeholderStart}
				        onChange={this.onStartChange.bind(this)}
				        onOpenChange={this.handleStartOpenChange.bind(this)}/>
				</Col>
				<Col span={12} className="tui-range-picker-end">
					<DatePicker 
						disabledDate={this.disabledEndDate}
				        showTime={showTime}
				        format={format}
				        value={rangePickerTime.end}
				        placeholder={placeholderEnd}
				        onChange={this.onEndChange.bind(this)}
				        onOpenChange={this.handleStartOpenChange.bind(this)}/>
				</Col>
			</Row>
		)
	}
}
