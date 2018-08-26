import React, { Component } from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import {Tool} from 'tui';

export default class DropdownItem extends Component {
	static init(cbk,container){
		let node = document.createElement('div');
		node.className = 'tui-dropdown'
		container.appendChild(node);
		ReactDOM.render(<DropdownItem />,node,function(){
			this.container = container;
			this.node = node;
			cbk(this)
		});
		return node;
	}
	//定位
	locating(dom,conf){
		//包含节点的信息
		console.log(dom)
		let domInfo = {
			left:Tool.getElementLeft(dom),
			top:Tool.getElementTop(dom),
			height:dom.offsetHeight,
			width:dom.offsetWidth
		};
		let overlayDom = findDOMNode(this);

		//定位父节点信息
		let offsetParent = this.node.offsetParent;
		let parentInfo = {
			left:0,
			top:0,
		}
		if(offsetParent){
			parentInfo.left = Tool.getElementLeft(offsetParent);
			parentInfo.top = Tool.getElementTop(offsetParent);
			parentInfo.height= offsetParent.offsetHeight;
		}

		let sty = {};
		let placement = conf.placement
		switch(placement) {
			case 'topLeft':
				sty = {
					left:domInfo.left - parentInfo.left,
					top:domInfo.top - parentInfo.top - overlayDom.offsetHeight,
				}
				break;
			case 'top':
				sty = {
					left:domInfo.left - parentInfo.left + domInfo.width / 2 - overlayDom.offsetWidth /2,
					top:domInfo.top - parentInfo.top - overlayDom.offsetHeight,
				}
				break;
			case 'topRight':
				sty = {
					left:domInfo.left - parentInfo.left + domInfo.width - overlayDom.offsetWidth,
					top:domInfo.top - parentInfo.top - overlayDom.offsetHeight,
				}
				break;
			case 'rightTop':
				sty = {
					left:domInfo.left - parentInfo.left + domInfo.width,
					top:domInfo.top - parentInfo.top,
				}
				break;
			case 'right':
				sty = {
					left:domInfo.left - parentInfo.left + domInfo.width,
					top:domInfo.top - parentInfo.top + domInfo.height /2 - overlayDom.offsetHeight /2,
				}
				break;
			case 'rightBottom':
				sty = {
					left:domInfo.left - parentInfo.left + domInfo.width,
					top:domInfo.top - parentInfo.top + domInfo.height - overlayDom.offsetHeight,
				}
				break;
			case 'bottomRight':
				sty = {
					left:domInfo.left - parentInfo.left + domInfo.width - overlayDom.offsetWidth,
					top:domInfo.top + domInfo.height - parentInfo.top
				}

				break;
			case 'bottom':
				sty = {
					left:domInfo.left - parentInfo.left + domInfo.width / 2 - overlayDom.offsetWidth /2,
					top:domInfo.top + domInfo.height - parentInfo.top
				}
				break;
			case 'bottomLeft':
				sty = {
					left:domInfo.left - parentInfo.left,
					top:domInfo.top + domInfo.height - parentInfo.top
				}
				break;
			case 'leftBottom':
				sty = {
					left:domInfo.left - parentInfo.left - overlayDom.offsetWidth,
					top:domInfo.top - parentInfo.top + domInfo.height - overlayDom.offsetHeight,
				}
				break;
			case 'left':
				sty = {
					left:domInfo.left - parentInfo.left - overlayDom.offsetWidth,
					top:domInfo.top - parentInfo.top + domInfo.height /2 - overlayDom.offsetHeight /2,
				}
				break;
			case 'leftTop':
				sty = {
					left:domInfo.left - parentInfo.left - overlayDom.offsetWidth,
					top:domInfo.top - parentInfo.top,
				}
				break;
			default:
		}
		if(sty.hasOwnProperty('left') && conf.leftAdd){
			sty.left += conf.leftAdd
		}
		if(sty.hasOwnProperty('top') && conf.topAdd){
			sty.top += conf.topAdd
		}
		if(sty.hasOwnProperty('right') && conf.rightAdd){
			sty.right += conf.rightAdd
		}
		if(sty.hasOwnProperty('bottom') && conf.bottomAdd){
			sty.bottom += conf.bottomAdd
		}
		Tool.css(this.node,Object.assign({},conf.style,sty))
	}
	relocation(dom,conf){
		if(this.unmount){
			return;
		}
		this.node.className = classNames('tui-dropdown','tui-dropdown-visible','tui-dropdown-placement-'+conf.placement,conf.className)
		Tool.removeCss(this.node,"top")
		Tool.removeCss(this.node,"left")
		Tool.removeCss(this.node,"bottom")
		Tool.removeCss(this.node,"right")
		this.locating(dom,conf)
	}
	componentWillUnmount(){
		this.unmount = true;
		window.removeEventListener("resize",this.toRelocation)
	}
	show(dom,conf,cbk){
		this.overlay = conf.overlay;
		this.toRelocation = ()=>{
			this.relocation(dom,conf)
		}
		this.setState({},()=>{
			this.toRelocation();
			window.addEventListener("resize",this.toRelocation)
			cbk && cbk();
		})
	}
	//隐藏节点
	hide(cbk){
		window.removeEventListener("resize",this.toRelocation)
		Tool.removeClass(this.node,'tui-dropdown-visible');
		cbk && cbk();
	}
	//卸载节点
	remove(){
		window.removeEventListener("resize",this.toRelocation)
		ReactDOM.unmountComponentAtNode(this.node);
		this.node.remove();
	}
	render() {
		return this.overlay || null;
	}
}
