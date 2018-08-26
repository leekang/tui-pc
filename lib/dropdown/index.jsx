import React, { Component } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom';
import {Tool} from 'tui';
import DropdownItem from './Item';

export default class TuiDropdown extends Component {
	static defaultProps = {
		trigger:'hover',
		getPopupContainer:()=>{
			return document.body;
		},
		placement:'bottomLeft'
	}
	componentDidMount(){
		let dom = findDOMNode(this);
		if(!dom){
			return;
		}
		this.eventShow = this.show.bind(this);
		this.eventHide = this.hide.bind(this);
		this.eventToggle = this.toggle.bind(this);
		this.clickCheck = this.clickCheck.bind(this)

		this.childDom = dom;
		this.register(dom)
	}
	componentDidUpdate(){
		let dom = findDOMNode(this);
		if(dom == this.childDom){
			return;
		}
		if(dom){
			this.register(dom)
		}
	}
	clickCheck(e){
		if(!this.visible){
			return;
		}
		let clickOther = true;
		if(this.childDom.contains(e.target) || this.dropdownNode.contains(e.target)){
			clickOther = false;
		}

		if(clickOther){
			this.props.onBlur && this.props.onBlur();
			this.hide();
		}
	}
	register(dom){
		const {trigger} = this.props;
		if(trigger == 'hover'){
			dom.addEventListener("mouseenter",this.eventShow,false);
			dom.addEventListener("mouseleave",this.eventHide,false);
		}
		if(trigger == 'click'){
			dom.addEventListener("click",this.eventToggle,false);
			document.addEventListener("click",this.clickCheck,true)
		}
		if(trigger == 'blurCheck'){
			document.addEventListener("click",this.clickCheck,true)
		}
	}
	unregister(dom){
		dom.removeEventListener("mouseenter",this.eventShow);
		dom.removeEventListener("mouseleave",this.eventHide);
		dom.removeEventListener("click",this.eventToggle,false);
		document.removeEventListener("click",this.clickCheck,true)
	}
	relocation(){
		if(!this.visible){
			return;
		}
		this.dropdownItem.toRelocation && this.dropdownItem.toRelocation();
	}
	toggle(){
		if(!this.visible){
			this.show();
		}else{
			this.hide();
		}
	}
	show(){
		const {children,sameWidth,style,getContainer,...conf} = this.props;
		let _conf = Object.assign({},conf);

		let _sty = Object.assign({},style)
		_conf.style = _sty;

		if(sameWidth && !_sty.width){
			_sty.width = this.childDom.offsetWidth;
		}
		console.log('ssge')
		if(!this.dropdownItem){
			console.log(this)
			let container = getContainer ? getContainer():document.body;
			this.dropdownNode = DropdownItem.init((item)=>{
				this.dropdownItem = item;
				this.visible = true;
				this.dropdownItem.show(this.childDom,_conf,()=>{
					this.onVisibleChange(true)
				});
			},container)
			return;
		}
		this.visible = true;
		this.dropdownItem.show(this.childDom,_conf,()=>{
			this.onVisibleChange(true)
		});
	}
	hide(){
		const {cleanWhenHide} = this.props;
		if(!this.dropdownItem){
			return;
		}
		this.visible = false;
		//cleanwhenhide 隐藏时清除下拉节点
		if(cleanWhenHide){
			ReactDOM.unmountComponentAtNode(this.dropdownNode);
			this.dropdownNode.remove();
			this.dropdownNode = undefined;
			this.dropdownItem = undefined;
			return;
		}
		this.dropdownItem.hide(()=>{
			this.onVisibleChange(false)
		});
	}
	onVisibleChange(val){
		this.props.onVisibleChange && this.props.onVisibleChange(val);
	}
	render(){
		const {children} = this.props;
		return children;
	}
}
