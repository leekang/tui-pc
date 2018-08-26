import React, { Component } from 'react'
import classNames from 'classnames';

export default class InputNumber extends Component {
	state={
		step: this.props.step || 1,
		min: this.props.min || 0,
		defaultValue: (this.props.defaultValue|| this.props.defaultValue==0)?this.props.defaultValue:'',
	}
	componentDidMount(){
		if(this.props.min && (this.props.defaultValue<this.props.min)){
			this.state.defaultValue = this.props.min;
			this.setState({})
		}
		if(this.props.max && (this.props.defaultValue>this.props.max)){
			this.state.defaultValue = this.props.max;
			this.setState({})
		}
	}
	getName(name = 'name'){
		return this.props[name];
	}
	getValue(){
		if(this.refs.input.value == ''){
			return this.refs.input.value;
		}else{
			return Number(this.refs.input.value);
		}
	}
	setValue(value){
		this.refs.input.value = value;
	}

	getInfo(){
		return {
			name:this.props.name,
			value:this.getValue(),
		}
	}
	onChange(){
		if(this.props.onChange){
			if(!isNaN(Number(this.refs.input.value))){
				if(this.refs.input.value == ""){
					this.props.onChange(this.refs.input.value)
				}else{
					this.props.onChange(Number(this.refs.input.value))
				}
			}else{
				this.refs.input.value = this.state.min;
				this.props.onChange(this.state.min);
			}
		}else{
			if(isNaN(Number(this.refs.input.value))){
				this.refs.input.value = this.state.min;
			}
		}
	}
	onBlur(){
		if(isNaN(Number(this.refs.input.value)) && this.refs.input.value != ''){
			this.refs.input.value = this.state.min;
		}else{
			if(Number(this.refs.input.value)<this.props.min){
				this.refs.input.value = this.props.min;
				this.onChange();
			}
			if(Number(this.refs.input.value)>this.props.max){
				this.refs.input.value = this.props.max;
				this.onChange();
			}
		}
	}
	addNumber(){
		if(!isNaN(Number(this.refs.input.value))){
			if(!this.props.max){
				if(this.props.max == 0){
					if(Number(this.refs.input.value)<0){
						this.refs.input.value = Number(this.refs.input.value) + this.state.step;
						this.onChange();
					}
				}else{
					this.refs.input.value = Number(this.refs.input.value) + this.state.step;
					this.onChange();
				}
			}else{
				if(Number(this.refs.input.value) + this.state.step <= this.props.max){
					this.refs.input.value = Number(this.refs.input.value) + this.state.step;
					this.onChange();
				}
			}
		}
	}
	subtractNumber(){
		if(!isNaN(Number(this.refs.input.value))){
			if(!this.props.min){
				if(this.props.min == 0){
					if(Number(this.refs.input.value)>0){
						this.refs.input.value = Number(this.refs.input.value) - this.state.step;
						this.onChange();
					}
				}else{
					this.refs.input.value = Number(this.refs.input.value) - this.state.step;
					this.onChange();
				}
			}else{
				if(Number(this.refs.input.value) - this.props.min >= this.state.step){
					this.refs.input.value = Number(this.refs.input.value) - this.state.step;
					this.onChange();
				}
			}
		}
	}
	render() {
		const { className,min,max,step,defaultValue,placeholder,style,disabled, ...props } = this.props;
		return (
			<div className={classNames("tui-input-number",className)}>
				<div className="tui-input-number-input-wrap">
					<input className="tui-input-number-input tui-form-control" min={min} max={max} defaultValue={this.state.defaultValue}
					placeholder={placeholder} readOnly={disabled} onChange={this.onChange.bind(this)} onBlur={this.onBlur.bind(this)} ref="input"/>
				</div>
				<div className="tui-input-number-handler-wrap">
					<div className="tui-input-number-handler-up" onClick={this.addNumber.bind(this)}></div>
					<div className="tui-input-number-handler-down" onClick={this.subtractNumber.bind(this)}></div>
					<If condition={disabled}>
						<div className="tui-input-number-handler-disabled"></div>
					</If>
				</div>
			</div>
		)
	}
}
