import React, { Component } from 'react'
import {Dropdown,Row} from 'tui';
import classNames from 'classnames';

export default class Popover extends Component {
	static defaultProps = {
		trigger:'click',
		theme:'default',
	}
	render(){
		const {children,trigger,title,content,theme,...props} = this.props;
		let overlay = (
			<div className={classNames("tui-popover","tui-popover-"+theme)}>
				<div className="tui-popover-arrow"></div>
				<div className="tui-popover-inner">
					<If condition={title}>
						<Row className="tui-popover-title" align="center">{title}</Row>
					</If>
					<div className="tui-popover-content">{content}</div>
				</div>
			</div>)
		return (
			<Dropdown trigger={trigger} overlay={overlay}  {...props}>
				{children}
			</Dropdown>
		)
	}
}
