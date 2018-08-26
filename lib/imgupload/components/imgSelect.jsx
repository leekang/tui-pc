import React, { Component } from 'react'

export default class ImgSelect extends Component{
	constructor(props){
		super(props);
	}
	getSelImgs(imgsFile){
		return new Promise((resolve,reject)=>{
			const rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
			const fileLength = imgsFile.length;
			if(fileLength === 0){
				reject(new Error("未选择"))
				return;
			}
			let imgs = [];
			let files = [];
			for(let i =0;i< fileLength ;i++){
				if(!rFilter.test(imgsFile[i].type)){
					reject("文件"+imgsFile[i].name+" 不是图片类型")
					return;
				}
				files.push(imgsFile[i]);
			}
			let imgList = [];
			files.forEach((v)=>{
				const oFReader = new FileReader()
				oFReader.onload = (e)=>{
					imgList.push({
						img:e.target.result,
						file:v,
					})
					if(imgList.length === fileLength){
						resolve(imgList)
					}
				}
				oFReader.onerror = (e)=>{
					reject(e)
				}
				oFReader.readAsDataURL(v)
			})
		});
	}
	imgDragOver(e){
		e.preventDefault();
	}
	//触发onSelect
	emitSelect(imgs){
		if(!this.props.onSelect){
			return;
		}
		if(this.props.multiple){
			this.props.onSelect(imgs)
		}else{
			this.props.onSelect(imgs[0])
		}
	}
	//图片拖入
	imgDrop(e){
		e.preventDefault();
		this.getSelImgs(e.dataTransfer.files).then(this.emitSelect.bind(this))
		.catch((v)=>{
			// console.log(v)
		})
	}
	//图片选择
	onChange(e){
		this.getSelImgs(e.target.files).then(this.emitSelect.bind(this))
		.catch((v)=>{

		})
	}
	//触发图片选择
	onClick(){
		this.refs.inputFile.click();
	}
	inputClick(e){
		e.stopPropagation();
		e.nativeEvent.stopImmediatePropagation();
	}
	render() {
		return (
			<div
				className={"c-po d-ib" + (this.props.className||'')}
				onDragOver={this.imgDragOver.bind(this)}
				onDrop={this.imgDrop.bind(this)}
				onClick={this.onClick.bind(this)}>
				<input type="file" accept="image/jpg,image/jpeg,image/png,image/gif" size="30" name={this.props.name} className="imgUpload-hide" 
				multiple={this.props.multiple} ref="inputFile"
				onChange={this.onChange.bind(this)} 
				onClick={this.inputClick.bind(this)}/>
				{this.props.children}
			</div>
		)
	}
}
