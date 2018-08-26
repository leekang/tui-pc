import React,{Component} from 'react';
import {Newselect} from 'tui';
const Option = Newselect.Option;
export default class NewSelectDemo extends Component{
	state = {
		data:['里的','测试','策士','侧视','测试1','测试2','测试3','测试4','测试5','测试5s','ces1','sgr'],
		defaultData:['value1'],
		dataTemp:[{
			name:'name1',
			value:'value1'
		},{
			name:'name2',
			value:'value2'
		},{
			name:'name3',
			value:'value3',
		},{
			name:'name4',
			value:'value4'
		},{
			name:'name5',
			value:'value5'
		},{
			name:'name6',
			value:'value6'
		},{
			name:'name7',
			value:'value7'
		},{
			name:'name8',
			value:'value8'
		},{
			name:'name9',
			value:'name9'
		},{
			name:'name10',
			value:'value10'
		},{
			name:'name11',
			value:'value11'
		},{
			name:'name12',
			value:'value12'
		}]
	}
	selectChage(value,dom){
		//console.log(value);
		//console.log(dom)
	}
	render(){
		return (
			<div className="test-select">
				<div>
				<Newselect 
				showSearch
				style={{width:200}} 
				onSelect={this.selectChage.bind(this)}
				placeholder="请选择选项">
					<For of={this.state.dataTemp} each="item" index="index">
						<Option key={item.value} value={item.name}>{item.value}</Option>
					</For>
				</Newselect>
				</div>
				<div style={{marginLeft:300}}>
				<Newselect 
				defaultValue={this.state.defaultData}
				multiple
				style={{width:400}} 
				onSelect={this.selectChage.bind(this)}
				placeholder="请选择选项">
					<For of={this.state.dataTemp} each="item" index="index">
						<Option key={item.name} value={item.value}>{item.value}</Option>
					</For>
				</Newselect>
				</div>
			</div>
		)
	}
}