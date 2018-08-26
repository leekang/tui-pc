import React, { Component } from 'react'
import classNames from 'classnames';
export default class formPlaceholder extends Component {
	getName(name = 'name'){
		return this.props[name];
	}
	getValue(){
		return this.props.value;
	}
	render() {
		return (
			<i className="tui-form-control" style={{display:'none'}}></i>
		)
	}
}
