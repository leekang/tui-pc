import React, { Component } from 'react'
import {TreeSelect} from 'tui';

export default class TreeSelectDemo extends Component {
	render() {
		return (
			<div className="p w-200">
				<div className="p">
					<TreeSelect showSearch placeholder="搜索测试"/>
				</div>
				<div className="p">
					<TreeSelect placeholder="下拉测试"/>
				</div>
				<div className="p">
					<TreeSelect multiple placeholder="多选测试"/>
				</div>
			</div>
		)
	}
}
