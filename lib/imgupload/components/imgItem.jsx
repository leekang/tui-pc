import React, { Component } from 'react'
import {Progress,Icon} from 'antd';
import ImageServer from '../../../server/image';

//TODO  上传失败重传
export default class ImgItem extends Component{
	state = {
		percent:0,
		hasLoad:false,
		hasError:false
	}
	componentWillUnmount(){
		this.unmount = true;
	}
	setState(data){
		if(this.unmount){
			return;
		}
		super.setState(data)
	}
	componentDidMount(){
		if(this.props.data.hasLoad){
			this.state.hasLoad = true;
			this.state.percent = 100;
			this.state.imgPath = this.props.data.img;
			this.setState(this.state)
		}else{
			this.uploadImg();
		}
	}
	uploadImg(){
		let _this = this;
		let uploadServer = this.props.server || ImageServer.upload;
		if(this.props.formVersionId){
			uploadServer(this.props.data.file,{
				percent:(precent)=>{
					_this.state.percent = precent;
					_this.setState(_this.state)
				}
			},this.props.data.file.name,this.props.formVersionId).then((res)=>{
				_this.state.percent = 100;
				_this.state.imgPath = res.data;
				_this.setState(_this.state)
				_this.onLoad();
			})
		}else if(this.props.formInstanceId){
			uploadServer(this.props.data.file,{
				percent:(precent)=>{
					_this.state.percent = precent;
					_this.setState(_this.state)
				}
			},this.props.data.file.name,this.props.formInstanceId).then((res)=>{
				_this.state.percent = 100;
				_this.state.imgPath = res.data;
				_this.setState(_this.state)
				_this.onLoad();
			})
		}else{
			
			uploadServer(this.props.data.file,{
				percent:(precent)=>{
					_this.state.percent = precent;
					_this.setState(_this.state)
				}
			},this.props.data.file.name).then((res)=>{
				_this.state.percent = 100;
				_this.state.imgPath = res.data;
				_this.setState(_this.state)
				_this.onLoad();
			})
		}
	}
	onLoad(){
		setTimeout(()=>{
			this.state.hasLoad = true;
			this.setState(this.state)
		},500)
		if(this.props.onLoad){
			this.props.onLoad(this.state.imgPath)
		}
	}
	onDelete(){
		if(this.props.onDelete){
			this.props.onDelete();
		}
	}
	render(){
		return (
			<div className="pub-img-wrap l-1-5" style={this.props.style || {}}>
				<img src={this.props.data.img} className="full" />
				<If condition={!this.state.hasLoad}>
					<div className="imb-box-progress-wrap padder-sm">
						<If condition={!this.state.hasError}>
							<Progress percent={this.state.percent} strokeWidth={6} showInfo={false} />
							<div>上传中</div>
						</If>
						<If condition={this.state.hasError}>
						</If>
					</div>
				</If>
				<If condition={this.state.hasLoad}>
					<a className="img-item-del" onClick={this.onDelete.bind(this)}>
						<Icon type="delete" />
					</a>
				</If>
			</div>
		)
	}
}
