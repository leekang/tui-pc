import React, { Component } from 'react'
import {Progress,Icon,Button} from 'antd';
import FileSelect from './components/fileSelect';
import FileItem from './components/fileItem';

export default class fileBox extends Component{
	constructor(props){
		super(props);
		this.state.maxSize = this.props.max || 15;
		if(this.props.files){
			this.props.files.map((v)=>{
				this.state.files.push({
					path:v,
					hasLoad:true
				})
			})
		}
	}
	state={
		files:[]
	}
	getName(name = 'name'){
		return this.props[name];
	}
	getValue(){
		return this.state.files;
	}
	onChange(){
		if(this.props.onChange){
			let img = this.getFiles();
			this.props.onChange(img)
		}
	}
	getNewFile(){
		if(this.props.getNewFile){
			let file = this.getFiles();
			let result = file.length > 0 ? file[file.length -1] : null;
			this.props.getNewFile(result)
		}
	}
	onFileSelect(data){
		this.state.files = this.state.files.concat(data);
		if(this.state.files.length > this.state.maxSize){
			this.state.files = this.state.files.slice(0,this.state.maxSize);
		}
		this.setState({})
	}
	onfileLoad(item,path){
		item.path= path;
		this.getNewFile();
		this.onChange();
	}
	getFiles(){
		return this.state.files;
	}
	onfileDelete(item){
		this.state.files = this.state.files.filter((v)=>{
			return v !== item;
		})
		this.onChange();
		this.setState(this.state)
	}
	clear(){
		this.state.files = [];
		this.setState(this.state)
		this.onChange();
	}

	render(){
		let sty = {
			marginTop:5,
			marginRight:20,
			//marginBottom:20
		}
		const {server,...props} = this.props;
		return (
			<div className={"clearfix tui-form-control "+(this.props.className ||'')}>
				<For each="item" of={this.state.files} index="index">
					<FileItem
						key={index}
						{...props}
						server={this.props.server}
						data={item}
						onDelete={this.onfileDelete.bind(this,item)}
						onLoad={this.onfileLoad.bind(this,item)}/>
				</For>
				<If condition={this.state.files.length < this.state.maxSize}>
					<div style={sty}>
						<FileSelect ref="fileSel" onSelect={this.onFileSelect.bind(this)} multiple={this.state.maxSize !== 1}>
							<Button><Icon type="upload" />添加</Button>
						</FileSelect>
					</div>
				</If>
			</div>
		)
	}
}
