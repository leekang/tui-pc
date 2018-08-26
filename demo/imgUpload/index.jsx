import React,{Component} from 'react';
import {Imgupload} from 'tui';
import ImageServer from 'server/image';
export default class ImguploadDemo extends Component{
	onImgChange(){
		// console.log(this.refs.imgs.getImgs());
		console.log(this.refs.imgs.getValue())
	}
	
	render(){
		return (
			<div>
				<Imgupload max={1} ref="imgs" formInstanceId={2} server={ImageServer.uploadByInstanceId} onChange={this.onImgChange.bind(this)}/>
			</div>
		)
	}
}
