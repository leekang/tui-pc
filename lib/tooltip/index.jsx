import React, { Component } from 'react'
import {Dropdown} from 'tui';
import classNames from 'classnames';

export default class ToolTip extends Component {
	static defaultProps = {
		trigger:'hover',
		theme:'default',
	}
	render(){
		const {children,trigger,title,theme,...props} = this.props;
		return (
			<Dropdown trigger={trigger} overlay={(<div className={classNames("tui-tooltip","tui-tooltip-"+theme)}><div className="tui-tooltip-inner">{title}</div></div>)}  {...props}>
				{children}
			</Dropdown>
		)
	}
}
