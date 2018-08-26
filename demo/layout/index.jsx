import React, { Component } from 'react'
import {Row,Col} from 'tui';

import './index.scss';//样式引入

export default class Test extends Component {
	render() {
		return (
			<Row className="layout-demo" gutter="10">
				<Col span={12} sm={24} lg={8} className="m-b-sm">
					<div>12</div>
				</Col>
				<Col span={12} sm={24} lg={8} className="m-b-sm">
					<div>12</div>
				</Col>
				<Col span={12} sm={24} lg={8} className="m-b-sm">
					<div>12</div>
				</Col>

				<Col span={12} sm={24} lg={8} className="m-b-sm">
					<div>12</div>
				</Col>

			</Row>
		)
	}
}
