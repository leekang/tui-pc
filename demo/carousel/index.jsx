import React, { Component } from 'react'
import {Carousel} from 'tui';

export default class Test extends Component {
	render() {
		let sty1= {
		}
		let sty2= {
		}
		let sty3= {
		}
		let sty4= {
		}
		return (
			<div className="w-full carousel-demo">
				<Carousel>
					<div style={sty1} className="full">
						<img src="http://s16.mogucdn.com/p2/161030/upload_3h452l5ke38jdlif2ha49ebiek8bl_778x480.jpg" className="w-full"/>
					</div>
					<div style={sty2} className="full">
						<img src="http://s8.mogucdn.com/p2/161028/in_67kb5fje0ib46k5147hl0e1c4ekck_778x480.jpg" className="w-full"/>
					</div>
					<div style={sty3} className="full">
						<img src="http://s16.mogucdn.com/p2/161031/upload_4b4h66fk99fgi14ki76kl2ed78f7a_778x480.jpg" className="w-full"/>
					</div>
					<div style={sty4} className="full">
						<img src="http://s10.mogucdn.com/p2/161028/rj_3986i3d3609597b4j434fed1k29fa_778x480.jpg" className="w-full"/>
					</div>
				</Carousel>
			</div>
		)
	}
}
