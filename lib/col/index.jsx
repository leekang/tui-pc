import React, { Component } from 'react'
import classNames from 'classnames';
export default class Col extends Component {
	render() {
		const { className,span,xs,sm,md,lg,children,gutter,style, ...props } = this.props

		let sty = style;
		if(!sty){
			sty = {};
		}
		if(gutter){
			if(!sty.paddingLeft){
				sty.paddingLeft = gutter/2;
			}
			if(!sty.paddingRight){
				sty.paddingRight = gutter/2;
			}
		}
		let cls = [];
		if(span){
			cls.push("tui-col-"+span);
		}
		if(xs){
			cls.push("tui-col-xs-"+xs);
		}
		if(sm){
			cls.push("tui-col-sm-"+sm);
		}
		if(md){
			cls.push("tui-col-md-"+md);
		}

		if(lg){
			cls.push("tui-col-lg-"+lg);
		}

		return (
			<div className={classNames(cls,className)} style={sty} {...props}>
				{children}
			</div>
		)
	}
}
