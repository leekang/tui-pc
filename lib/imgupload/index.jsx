import React, { Component } from 'react'
import {Progress,Icon} from 'antd';
import ImgItem from './components/imgItem';
import ImgSelect from './components/imgSelect';

export default class ImgBox extends Component{
	constructor(props){
		super(props);
		this.state.maxSize = this.props.max || 15;
		if(this.props.imgs){
			this.props.imgs.forEach((v)=>{
				this.state.imgs.push({
					img:v.img,
					imgPath:v.imgPath,
					hasLoad: true
				})
			})
		}
	}
	getName(name = 'name'){
		return this.props[name];
	}
	getValue(){
		return this.state.imgs;
	}
	state={
		imgs:[]
	}
	onChange(){
		if(this.props.onChange){
			this.props.onChange(this.state.imgs);
		}
	}
	onImgSelect(data){
		this.state.imgs = this.state.imgs.concat(data);

		if(this.state.imgs.length > this.state.maxSize){
			this.state.imgs = this.state.imgs.slice(0,this.state.maxSize);
		}
		this.setState(data)
	}
	onImgLoad(item,imgPath){
		item.imgPath = imgPath;
		this.onChange();
	}
	getImgs(){
		return this.state.imgs;
	}
	onImgDelete(item){
		this.state.imgs = this.state.imgs.filter((v)=>{
			return v !== item;
		})
		this.onChange();
		this.setState(this.state)
	}
	clear(){
		this.state.imgs = [];
		this.setState(this.state)
		this.onChange();
	}
	render(){
		let sty = {
			marginRight:20,
			//marginBottom:20
		}
		const {file,server,...props} = this.props;
		return (
			<div id="imgUpload" className={"clearfix tui-form-control "+(this.props.className||'')}>
				<For each="item" of={this.state.imgs} index="index">
					<div className="pull-left"  style={sty} key={index}>
						<ImgItem
							file={this.props.file}
							{...props}
							server={this.props.server}
							data={item}
							onDelete={this.onImgDelete.bind(this,item)}
							onLoad={this.onImgLoad.bind(this,item)}/>
					</div>
				</For>
				<If condition={this.state.imgs.length < this.state.maxSize}>
					<div className="pub-img-wrap pull-left p-t-sm pub-img-add text-center" style={sty}>
						<ImgSelect ref="imgSel" onSelect={this.onImgSelect.bind(this)} multiple={this.state.maxSize !== 1} className="full">
						    <div><Icon type="plus" className="imgUpload-icon"/></div>
							<div className="text-light m-t-xxs">添加</div>
						</ImgSelect>
					</div>
				</If>
			</div>
		)
	}
}
