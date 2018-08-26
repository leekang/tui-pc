import React, { Component } from 'react'
import {Row,DateSelect} from 'tui';

export default class DropdownDemo extends Component {
	render() {
		return (
			<div className="padder w-200">
					<DateSelect
						disabledEndReact={()=>{return this.refs.endDate}}
						ref="startDate"
						placeholder={"开始日期"}
						valueType="unix"
					/>
					<DateSelect
						ref="endDate"
						disabledStartReact={()=>{return this.refs.startDate}}
						className="datepicker-w-full"
						placeholder={"结束日期"}
						valueType="unix"
					/>

			</div>
		)
	}
}
