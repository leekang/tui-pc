import React, { Component } from 'react'
import {Row,Dropdown} from 'tui';

export default class DropdownDemo extends Component {
	render() {
		let a = (
			<div className="bg-white dropdown-menu">测试</div>
		)
		return (
			<div className="padder m-t-md">
				<div className="p pos-r">
					<div className="p pos-r">
						<Row>
							<Dropdown overlay={a} sameWidth>
								<div className="pos-r">
									Hover me
								</div>
							</Dropdown>
						</Row>
					</div>
				</div>
				<div className="p pos-r">
					<div className="p pos-r" ref="a">
					</div>
				</div>
			</div>
		)
	}
}
