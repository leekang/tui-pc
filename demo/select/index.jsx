import React, { Component } from 'react';
import {Select} from 'tui';
const Option = Select.Option;
export default class SelectDemo extends Component {
	state = {
		optionArray : ['value1','value2','value3','value4','value5','value6','value7','value8','value9','value10','value11','value12']
	};
	
	render() {
		return (
			<Select 
			style={{width:200}}
			showSearch
			defaultValue="value10"
			>
				<For each="item" of={this.state.optionArray} index="index">
					<Option key={index} value={item}>{item}</Option>
				</For>
			</Select>
		)
	}
}
