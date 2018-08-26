import React, { Component } from 'react'
import classNames from 'classnames';
import {Row,Col} from 'tui';
export default class FormItemV extends Component {
	render() {
		const {
			className,
			children,
			label,
			required,
			...props } = this.props;
		return (
			<div className={classNames("tui-form-item-vertical",className)} {...props}>
				<div className="tui-form-item-vertical-tit"><If condition={required}><span className="text-red">*</span></If>{label}</div>
				<div>{children}</div>
			</div>
		)
	}
}
