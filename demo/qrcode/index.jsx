import React, { Component } from 'react'
import { Row, Qrcode } from 'tui';

export default class QrcodeDemo extends Component {
	render() {
		return (
			<Row className="flex-center">
				<Qrcode 
					origin={'https://ant.design/components/date-picker-cn/'} 
					width={400} 
					height={400}/>
			</Row>
		)
	}
}
