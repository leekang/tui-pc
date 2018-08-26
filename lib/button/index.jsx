import React, { Component } from 'react';
import {Icon} from 'tui';
import classNames from 'classnames';

export default class Button extends Component {
	render() {
		const { className,htmlType,type,loading,disabled,size, ...props } = this.props;
		return (
			<button className={classNames("tui-btn",{[`tui-btn-${type}`]:type},{[`tui-btn-${size}`]:size},className)} disabled={disabled || loading} {...props} type={htmlType}>
				<If condition={loading}>
					<Icon name="sync" className="m-r-xs text-white tui-icon-loading"/>
				</If>
				{this.props.children}
			</button>
		)
	}
}
