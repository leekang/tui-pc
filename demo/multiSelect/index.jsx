import React,{Component} from 'react';
import {Multiselect} from 'tui';
const Option = Multiselect.Option;
export default class MultiselectDemo extends Component{
	state = {
		optionArr:['龙相测试1','龙相测试2','龙相测试3']
	}
	render(){
		return (
			<Multiselect
			defaultValue={this.state.optionArr}
			style={{width:300}}
			showSearch>
				<For each="item" index="index" of={this.state.optionArr}>
					<Option key={index} value={item}>{item}</Option>
				</For>
			</Multiselect>
		)
	}
}