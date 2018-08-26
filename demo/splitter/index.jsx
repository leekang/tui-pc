import React,{Component} from 'react';
import {Splitter} from 'tui';
export default class SplitterDemo extends Component{
	render(){
		return (
			<div>
				<Splitter width={560} height={1} background={'ffb6c1'} style="dash"/>
				<Splitter width={560} height={1} background={222} style="normal"/>
				<Splitter style="special"/>
			</div>
		)
	}
}