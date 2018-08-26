import React, { Component } from 'react'
import {Col,Tool} from 'tui';
import classNames from 'classnames';
export default class Row extends Component {
	static defaultProps = {
		gutterWrap:false
	}
	render() {
		const { className,gutter,gutterWrap,align,direction,justify,children,style, ...props } = this.props
		let sty = Object.assign({},style);
		let child = children;
		if(gutter){
			if(gutterWrap){
				sty.paddingLeft = gutter/2;
				sty.paddingRight = gutter/2;
			}else{
				sty.marginLeft=-gutter/2;
				sty.marginRight=-gutter/2;
			}
			child = React.Children.map(children,(v)=>{
				if(!v){
					return;
				}
				if(v.type === Col){
					return React.cloneElement(v,{
						gutter:gutter
					})
				}else{
					return v;
				}
			})
		}
		return (
			<div className={classNames("tui-row",(justify?'tui-row-'+justify:''),(align?'tui-row-align-'+align:''),(direction?'tui-row-direction-'+direction:''),className)} style={sty} {...props}>
				{child}
			</div>
		)
	}
}
