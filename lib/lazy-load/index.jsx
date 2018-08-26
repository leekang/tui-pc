import React, { Component } from 'react';
import classNames from 'classnames';
import './lib/index.css';
import Progressive from './lib/index.js';

export default class LazyLoad extends Component{
	state={
		id: 'lazy-img-' + new Date().getTime()
	};
	componentDidMount() {
		new Progressive({
		    el: '#'+this.state.id,
		    lazyClass: 'lazy',
		    removePreview: true
		  }).fire()
	}
	render(){
		const id = this.state.id;
		const {
			className,
			imgs,
			...props } = this.props
		return (
			<main id={id} className={classNames(className)}>
				<For of={imgs} each="item" index="lazy_img_index">
					<div className={classNames('progressive',item.className)} key={lazy_img_index}>
					    <img className="preview lazy" data-src={item.pre} src={item.show} />
					</div>
				</For>
			</main>
		)
		
	}
}
