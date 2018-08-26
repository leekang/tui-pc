import React, { Component } from 'react'
import classNames from 'classnames';
export default class Input extends Component {
	getName(name = 'name'){
		return this.props[name];
	}
	getValue(){
		return this.refs.ipt.value;
	}
	setValue(value){
		this.refs.ipt.value = value;
	}
	onChange(){
		if(this.props.onChange){
			this.props.onChange(this.refs.ipt.value)
		}
	}
	render() {
		const { className,size,type,status,rows,disabled,...props } = this.props;

		let ipt;
		let statusCls = ''

		if(type == 'textarea'){
			statusCls = status && 'tui-textarea-'+status;
			ipt = <textarea className={classNames("tui-textarea tui-form-control",{'tui-textarea-disabled':disabled},statusCls,className)}
			disabled={disabled?'disabled':''} rows={rows || 3} ref="ipt" {...props} onChange={this.onChange.bind(this)}/>;
		}else if(type == 'hidden'){
			ipt = <input type="hidden" className={classNames("tui-form-control",className)} ref="ipt" {...props} onChange={this.onChange.bind(this)}/>;
		}else{
			statusCls = status && 'tui-input-'+status;
			let sizeCls = '';
			if(size){
				sizeCls = 'tui-input-size-'+size;
			}
			ipt = <input type={type || 'text'} className={classNames("tui-input tui-form-control",{'tui-input-disabled':disabled},sizeCls,statusCls,className)}
			disabled={disabled?'disabled':''} ref="ipt" {...props} onChange={this.onChange.bind(this)}/>;
		}
		return ipt;
	}
}
