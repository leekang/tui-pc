import React, { Component } from 'react'
import {Button} from 'tui';

export default class ButtonDemo extends Component {
	state={
		loading: false
	}
	clickLoading(){
		this.state.loading = true;
		this.setState(this.state);
	}
	clickNone(){
		console.log('None');
	}
	render() {
		return (
			<div className="padder m-t-md">
				<div className="m-b">
					<Button className="m-l" onClick={this.clickNone.bind(this)}>default</Button>
					<Button className="m-l" type="primary" >primary</Button>
					<Button className="m-l" type="ghost">ghost</Button>
					<Button className="m-l" type="warning">warning</Button>
					<Button className="m-l" type="error">error</Button>
					<Button className="m-l" type="success">success</Button>
				</div>
				<div className="m-b">
					<Button className="m-l" disabled={true} >disabled</Button>
					<Button className="m-l" disabled={true} type="primary">primary</Button>
					<Button className="m-l" disabled={true} type="ghost">ghost</Button>
					<Button className="m-l" disabled={true} type="warning">warning</Button>
					<Button className="m-l" disabled={true} type="error">error</Button>
					<Button className="m-l" disabled={true} type="success">success</Button>
				</div>
				<div className="m-b">
					<Button className="m-l" type="primary" loading={true} >loading</Button>
					<Button className="m-l" type="primary" loading={this.state.loading} onClick={this.clickLoading.bind(this)}>click me</Button>
				</div>
				<div className="m-b">
					<Button className="m-l" type="primary" size="small">small</Button>
					<Button className="m-l" type="primary">normal</Button>
					<Button className="m-l" type="primary" size="large">large</Button>
				</div>
			</div>
		)
	}
}
