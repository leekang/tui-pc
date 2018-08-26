import React,{Component} from 'react';
import {Fileupload} from 'tui';
import ImageServer from 'server/image';
export default class FileuploadDemo extends Component{
	onFileSelect(){
		this.refs.files.getFiles();
	}
	render(){
		return (
			<Fileupload max={5} ref="files" formInstanceId={2} server={ImageServer.uploadByInstanceId} onChange={this.onFileSelect.bind(this)}/>
		)
	}
}