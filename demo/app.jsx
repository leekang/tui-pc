import React, { Component } from 'react'
import {Row,Col} from 'tui';
import { Link } from 'react-router'
import Menus from 'demo/menus';

import './app.less';
import './app.scss';

import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');
moment.updateLocale('zh-cn', {
	week: {
		dow: 7 //set sunday as the first day of week
	}
})


export default class Apps extends Component {
	render() {
		return (
			<Row className="apps-list-wrap">
				<For each="item" of={Menus.list}>
					<Col span={4} key={item.url} className="p-sm">
						<Link className="apps-list-item" to={item.url}>{item.name}</Link>
					</Col>
				</For>
			</Row>
		)
	}
}
