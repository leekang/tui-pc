import React, { Component } from 'react'
import { render } from 'react-dom'
import { hashHistory, Router, IndexRoute, Route, Link } from 'react-router'
import {Polyfill} from 'tui';
Polyfill.init();

import Menus from 'demo/menus';
import Apps from 'demo/app';

class LayoutWrap extends Component {
	render() {
		const {children} = this.props;
		return (
			<div>
				{children}
			</div>
		)
	}
}

render((
	<Router history={hashHistory}>
		<Route path="/" component={LayoutWrap}>
			<IndexRoute component={Apps} />
			<For each="item" of={Menus.list}>
				<Route path={item.url} component={item.component} key={item.url}/>
			</For>
		</Route>
	</Router>
), document.getElementById('appWrapper'))
