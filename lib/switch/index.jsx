import React, { Component } from 'react'
import classNames from 'classnames';

export default class Switch extends Component {
	getName(name = 'name'){
		return this.props[name];
	}
	//获取值
	getValue(){
		return this.refs.ipt.checked;
	}

	onChange(e){
		if(this.props.onChange){
			this.props.onChange(e)
		}
	}
	render() {
		const { className,name,defaultChecked,checked,disabled,size, ...props } = this.props;
		return (
			<label className={classNames("tui-switch tui-form-control",(size?"tui-switch-"+size:''),className)} {...props}>
				<input type="checkbox" disabled={disabled} defaultChecked={defaultChecked} checked={checked} ref="ipt" name={name} onChange={this.onChange.bind(this)}/>
			</label>
		)
	}
}
