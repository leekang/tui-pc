import React, { Component } from 'react'
import classNames from 'classnames';
import {Row,Col} from 'tui';
export default class FormItem extends Component {
	render() {
		const {
			className,
			children,
			label,
			labelCol,
			wrapperCol,
			labelSpan,
			wrapperSpan,
			required,
			...props } = this.props;
		let labelInfo = labelCol || {};
		let wrapperInfo = wrapperCol || {};

		return (
			<div className={classNames(className,"tui-form-item")} {...props}>
				<Row>
					<Col {...labelInfo} span={labelSpan || labelInfo.span} className="tui-form-item-label">
						{required}<If condition={required}><span className="text-red">*</span></If>{label}
						<If condition={label}>：</If>
					</Col>
					<Col {...wrapperInfo} span={wrapperSpan || wrapperInfo.span}>
						{children}
					</Col>
				</Row>
			</div>
		)
	}
}
