import React, { Component } from 'react'

export default class FileSelect extends Component{
	constructor(props){
		super(props);
	}
	fileDragOver(e){
		e.preventDefault();
	}
	//触发onSelect
	emitSelect(files){
		if(!this.props.onSelect){
			return;
		}
		if(this.props.multiple){
			const fileLength = files.length;
			let f = [];
			for(let i =0;i< fileLength ;i++){
				f.push(files[i]);
			}
			this.props.onSelect(f)
		}else{
			this.props.onSelect(files[0])
		}
	}
	//拖入
	fileDrop(e){
		e.preventDefault();
		this.emitSelect(e.dataTransfer.files)
	}
	//选择
	onChange(e){
		//this.props.cbFuncSel(e.target.files);
		this.emitSelect(e.target.files)
	}
	//触发选择
	onClick(){
		this.refs.inputFile.click();
	}
	render() {
		return (
			<div
				className={"c-po d-ib" + (this.props.className||'')}
				onDragOver={this.fileDragOver.bind(this)}
				onDrop={this.fileDrop.bind(this)}
				onClick={this.onClick.bind(this)}>
				<input type="file" size="30" name={this.props.name} className="fileUpload-hide" ref="inputFile" onChange={this.onChange.bind(this)} />
				{this.props.children}
			</div>
		)
	}
}
