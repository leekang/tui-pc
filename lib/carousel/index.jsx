import React, { Component } from 'react'
import classNames from 'classnames';
import { findDOMNode } from 'react-dom'
import {Hammer,Tool} from 'tui';
import Tween from 'tween.js';

export default class Carousel extends Component {
	static defaultProps = {
		vertical:false,
		defaultIndex:0,
		indicatorVisible:true,
		deltaThresholdX:100,
		velocityThresholdX:0.5
	}
	state={
		currentIndex : 0, //当前指针
	}

	constructor(props){
		super(props);
		this.state.currentIndex = this.props.defaultIndex || 0;
	}

	componentDidMount(){
		this.wrapDom = findDOMNode(this.refs.wrap);
		this.width = this.wrapDom.clientWidth;

		this.max = 0;
		let child = React.Children.toArray(this.props.children)
		this.min = -(child.length-1)*this.width;
		this.to(this.state.currentIndex);
	}

	componentWillReceiveProps(props){
		let child = React.Children.toArray(props.children)
		this.min = -(child.length-1)*this.width;
	}

	to(index,velocity = 0){
		let pos;
		if(this.props.vertical){
		}else{
			let left = -index*this.width;
			this.start = left;

			Tool.css(this.wrapDom,{
				transform:'translate3d('+left+'px,0,0)'
			});
		}
		this.setState({
			currentIndex:index
		})
		if(this.props.onChange){
			this.props.onChange(index)
		}
	}

	panOption = {
		name:'pan',
		value:{
			threshold:0
		}
	};

	start= 0;
	current= 0;
	max = 0;
	min = 0;

	panstart(e){
		e.preventDefault();
		this.setState({
			panMove:true
		})
		this.moveRender(e)
	}
	panmove(e){
		e.preventDefault();
		this.moveRender(e)
	}
	panend(e){
		e.preventDefault();
		this.setState({
			panMove:false
		})
		this.endRender(e)
	}
	//移动渲染
	moveRender(e){
		if(this.props.vertical){
			this.verticalRender(e)
		}else{
			this.horizontalRender(e)
		}
	}
	endRender(e){
		let info = {};
		if(this.props.vertical){
			info = this.verticalEndRender(e)
		}else{
			info = this.horizontalEndRender(e)
		}
		this.to(info.index,info.velocity)
	}
	//垂直渲染
	verticalRender(e){
	}
	//水平渲染
	horizontalRender(e){
		let p = e.deltaX;
		let left = p + this.start;
		if(left < this.min){
			left = this.min;
		}
		if(left > this.max){
			left = this.max;
		}

		this.current = left;

		Tool.css(this.wrapDom,{
			transform:'translate3d('+left+'px,0,0)'
		});
	}
	verticalEndRender(e){
	}
	horizontalEndRender(e){
		let p = e.deltaX;
		let left = p + this.start;
		if(left < this.min){
			left = this.min;
		}
		if(left > this.max){
			left = this.max;
		}

		Tool.css(this.wrapDom,{
			transform:'translate3d('+left+'px,0,0)'
		});

		this.current = 0;
		this.start = left;

		let index;
		if(Math.abs(e.velocityX) < this.props.velocityThresholdX && Math.abs(e.deltaX) < this.props.deltaThresholdX){
			index = -this.state.currentIndex;
		}else{
			if(e.velocityX >=0){
				index = Math.ceil(left/this.width);
			}else{
				index = Math.floor(left/this.width);
			}
		}

		this.setState({
			currentIndex:Math.abs(index)
		})
		return {
			velocity:Math.abs(e.velocityX),
			index:Math.abs(index)
		}
	}

	render(){
		const {
			className,
			defaultIndex,
			vertical, //垂直显示
			indicatorVisible,//指针视图是否显示
			indicatorView,//指针视图
			autoplay,//自动播放
			easing,//动画效果
			onChange,//切换回调
			children,
			...props } = this.props

		let child = React.Children.toArray(children)

		return (
			<div className={classNames("tui-carousel",className)}>
				<Hammer
					ref="wrap"
					options={this.panOption}
					setUp={{touchAction:'none'}}
					panstart={this.panstart.bind(this)}
					panmove={this.panmove.bind(this)}
					panend={this.panend.bind(this)}
					className={classNames("tui-carousel-wrap",{'tui-carousel-animate':!this.state.panMove})}>
					<For each="item" of={child} index="index">
						<div className="tui-carousel-item" key={index}>
							{item}
						</div>
					</For>
				</Hammer>
				<If condition={indicatorVisible && !indicatorView}>
					<div className="tui-carousel-indicator">
						<For each="item" of={Tool.newArray(0,child.length)} index="index">
							<span key={index} onClick={this.to.bind(this,index)} className={classNames({active:this.state.currentIndex == index})}></span>
						</For>
					</div>
				</If>
				<If condition={indicatorVisible && indicatorView}>
					{indicatorView}
				</If>
			</div>
		)
	}
}
