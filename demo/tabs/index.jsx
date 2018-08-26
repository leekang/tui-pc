import React, { Component } from 'react'
import {Tabs} from 'tui';
const TabPane = Tabs.TabPane;

export default class SwitchDemo extends Component {
	list = [];
	componentDidMount(){
		setTimeout(()=>{
			this.list = [1,2,3]
			this.setState({})
		},2000)
	}
	onChange(key){
		console.log(key)
	}
	render() {
		return (
			<div className="">
				<Tabs defaultActiveKey="2" onChange={this.onChange.bind(this)}>
					<For each="item" of={this.list}>
						<TabPane className="m-r" key={item} tab={'tab'+item}>测试{item}</TabPane>
					</For>
				</Tabs>
			</div>
		)
	}
}
