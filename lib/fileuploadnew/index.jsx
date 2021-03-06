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
					data:v,
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
		let fileList = [];
		this.state.files.forEach((item)=>{
			fileList.push(item.data)
		})
		return fileList;
	}
	onChange(){
		if(this.props.onChange){
			let img = this.getFiles();
			this.props.onChange(img)
		}
	}
	
	onFileSelect(data){
		this.state.files = this.state.files.concat(data);
		if(this.state.files.length > this.state.maxSize){
			this.state.files = this.state.files.slice(0,this.state.maxSize);
		}
		this.setState({})
	}
	onfileLoad(item,data){
		data.name = item.name;
		item.data = data;
		this.onChange();
	}
	getFiles(){
		return this.state.files;
	}
	onfileDelete(item){
		if(this.props.onDelete){
			this.props.onDelete(item)
		}
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
			<div className={"tui-form-control "+(this.props.className ||'')}>
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
