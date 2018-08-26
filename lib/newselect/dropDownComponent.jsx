import React, { Component } from 'react'
import classNames from 'classnames';

export default class DropDownComponent extends Component {
	state  = {
		children:this.props.children,
		groupKey:Date.now()
	}
	componentDidMount(){
		this.divGroup = this.refs.divGroup;
		this.scrollTopDown=(currentIndex)=>{
			if(this.divGroup.children[currentIndex].offsetTop + 32 - this.divGroup.scrollTop > this.divGroup.clientHeight){
				this.divGroup.scrollTop = this.divGroup.children[currentIndex].offsetTop + 32 - this.divGroup.clientHeight;
			}else{

				if(this.divGroup.children[currentIndex].offsetTop - 32 - this.divGroup.scrollTop < 0){
					this.divGroup.scrollTop = this.divGroup.children[currentIndex].offsetTop;
				}
			}
		}
		this.scrollTopUp=(currentIndex)=>{
			if(this.divGroup.children[currentIndex].offsetTop - 32 - this.divGroup.scrollTop < 0){
				this.divGroup.scrollTop = this.divGroup.children[currentIndex].offsetTop;
			}else{
				if(this.divGroup.children[currentIndex].offsetTop + 32 - this.divGroup.scrollTop > this.divGroup.clientHeight){
					this.divGroup.scrollTop = this.divGroup.children[currentIndex].offsetTop + 32 - this.divGroup.clientHeight;
				}
			}
		}
		this.resetScrollTop = ()=>{
			this.divGroup.scrollTop = 0;
		}
		this.scrollToBottom = ()=>{
			this.divGroup.scrollTop = this.divGroup.children.length * 32 - this.divGroup.clientHeight;
		}
		this.searchChildren = (children,justSetChildren)=>{
			this.setState({children:children},()=>{
				if(!justSetChildren){
					this.selectServer.emit("analyseActive",children[0].props.children)
				}
			})
		}
		this.dropClose = ()=>{
			this.setState({children:this.props.children})
		}
		this.selectServer = this.props.selectServer;
		this.selectServer.on("scrollTopDown",this.scrollTopDown);//往下滚动
		this.selectServer.on("scrollTopUp",this.scrollTopUp);//向上滚动
		this.selectServer.on("searchChildren",this.searchChildren);//查找元素
		this.selectServer.on("scrollToBottom",this.scrollToBottom);//滚动到底部
		this.selectServer.on("resetScrollTop",this.resetScrollTop);//重置顶部
		this.selectServer.on("dropClose",this.dropClose);//面板关闭
	}
	componentWillUnmount(){
		this.selectServer.off("scrollTopDown",this.scrollTopDown);
		this.selectServer.off("dropClose",this.dropClose);
		this.selectServer.off("scrollTopUp",this.scrollTopUp);
		this.selectServer.off("searchChildren",this.searchChildren);
		this.selectServer.off("scrollToBottom",this.scrollToBottom);
		this.selectServer.off("resetScrollTop",this.resetScrollTop);
	}
	onMouseLeave(){//鼠标离开面板的时候
		this.selectServer.clearActive();
	}
	render() {
		return (				
			<div className="tui-select-panel-body-dropdown o-f-a" onMouseLeave={this.onMouseLeave.bind(this)}>
				<div className="tui-select-panel-body-dropdown-menu" ref="divGroup">
					{this.state.children}
				</div>
			</div>
		)
	}
}
