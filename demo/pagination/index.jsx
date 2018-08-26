import React, { Component } from 'react';
import {Pagination} from 'tui';

export default class PaginationDemo extends Component {
	state = {};
	render() {
		return (
			<div className="text-center p-t">
				<Pagination theme="small" gutter={2} showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`} showSizeChanger showQuickJumper/>
			</div>
		)
	}
}
