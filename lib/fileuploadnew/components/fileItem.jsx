import React, { Component } from 'react'
import {Progress,Icon} from 'antd';
import {Row,Col} from 'tui';
import ImageServer from '../../../server/image';
import Notification from '../../notification';
export default class FileItem extends Component{
	state = {
		percent:0,
		hasLoad:false,
		hasError:false
	}
	componentDidMount(){
		if(this.props.data.hasLoad){
			this.state.hasLoad = true;
			this.state.percent = 100;
			this.state.path = this.props.data.img;
			this.setState(this.state)
		}else{
			this.uploadImg();
		}
	}
	uploadImg(){//这个函数处理上传递的逻辑
		if(!this.props.canLoad){
			let _this = this;
			let uploadServer = this.props.server || ImageServer.upload;
			uploadServer(this.props.data,{
				percent:(precent)=>{
					_this.state.percent = precent;
					_this.setState(_this.state)
				}
			},this.props.data.name).then((res)=>{
				if(res.success){
					_this.state.percent = 100;
					_this.state.path = res.data;
					_this.setState(_this.state)
					_this.onLoad();
				}else{
					Notification.config({
						type:'error',
						message:res.msg,
						duration: 2000
					});
					_this.errorLoad();
				}
			}).catch((e)=>{
				console.log(e)
			})
		}else{
			let _this = this;
			let uploadServer = this.props.server || ImageServer.uploadFileById;
			uploadServer(this.props.data,{
				percent:(precent)=>{
					_this.state.percent = precent;
					_this.setState(_this.state)
				}
			},this.props.data.name,this.props.bizId).then((res)=>{
				if(res.success){
					_this.state.percent = 100;
					_this.state.path = res.data;
					_this.setState(_this.state)
					_this.onLoad();
				}else{
					Notification.config({
						type:'error',
						message:res.msg,
						duration: 2000
					});
					_this.errorLoad();
				}
			}).catch((e)=>{
				console.log(e)
			})
		}
	}
	onLoad(){
		setTimeout(()=>{
			this.state.hasLoad = true;
			this.setState(this.state)
		},500)
		if(this.props.onLoad){
			this.props.onLoad(this.state.path)
		}
	}
	errorLoad(){
		setTimeout(()=>{
			this.state.hasLoad = true;
			this.setState(this.state)
		},500)
	}
	onDelete(ev){
		ev.stopPropagation();
        ev.nativeEvent.stopImmediatePropagation();
		if(this.props.onDelete){
			this.props.onDelete();
		}
	}
	render(){
		return (
			<div className="file-m-t-5" style={this.props.style || {}}>
				<If condition={!this.state.hasLoad}>
					<Row>
						<Col span={4} className="text-ellipsis">{this.props.data.name}</Col>
						<Col span={20}>
							<Progress percent={this.state.percent} strokeWidth={8} />
						</Col>
					</Row>
				</If>
				<If condition={this.state.hasLoad && !this.props.hideDefault && this.props.data.data}>
					<Icon type="paper-clip" />
					<If condition={!this.props.canLoad}>
						<span key="canLoad" className="padder-xs">{this.props.data.data.fileName}</span>
					</If>
					<If condition={this.props.canLoad}>
						<a key="canDel" className="m-l-xs" target="_blank" href={this.props.href+this.props.data.data[this.props.loadName]}>
							<span className="padder-xs">{this.props.data.data.fileName}</span>
						</a>
					</If>
					<a onClick={this.onDelete.bind(this)}>
						<Icon type="close" />
					</a>
				</If>
			</div>
		)
	}
}
