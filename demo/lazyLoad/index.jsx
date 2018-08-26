import React, { Component } from 'react'
import { Row, LazyLoad, Tool } from 'tui';
import './index.scss'

export default class QrcodeDemo extends Component {
	state={
		imgs:['http://s2.mogucdn.com/mlcdn/c45406/170515_1h89gk89hc1jjk8ca9ee10gbe0a7h_395x237.jpg',
			'http://s10.mogucdn.com/mlcdn/c45406/170515_12470k02f9igj7gc5h09h191lj3ik_640x384.jpg',
			'http://dev.mogucdn.com/mlcdn/d82593/170524_78bgdih7j94320fdkl95dcdh60cgb_1440x900.jpg',
			'http://dev.mogucdn.com/mlcdn/d82593/170524_1973k5hi0gchh8836i3g38l9higai_158x108.png']
	}
	componentWillMount(){
		let lazyImgs = [];
		this.state.imgs.forEach((v, i)=>{
			let item = {pre: Tool.imgSize(v,'300x180.v1cOK.81'), show: Tool.imgSize(v,'50x30.v1cOK.81'), className: 'lazy-img-'+i}
			lazyImgs.push(item)
		})
		this.state.lazyImgs = lazyImgs
	}
	render() {
		let { lazyImgs } = this.state
		return (
			<div style={{ width:'500px'}} className="p-t">
				<For of={lazyImgs||[]} each="item" index="lazy_img_index">
					<LazyLoad imgs={[item]} key={lazy_img_index}/>
				</For>
			</div>
		)
	}
}
