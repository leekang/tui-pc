import React, { Component } from 'react';
import classNames from 'classnames';
import ReactDOM from 'react-dom';
import QueueAnim from 'rc-queue-anim';
import {Icon,MountRoot} from 'tui';

export default class Loading extends Component {
	static defaultProps = {
		maskVisible:true,
		loadingBgImg:"https://s10.mogucdn.com/p1/161101/idid_ifrwezrtmrstin3gmizdambqhayde_200x200.png",
		loadingSpinImg:"https://s10.mogucdn.com/p1/161101/idid_ie4wkmdeme2tkn3gmizdambqgqyde_200x200.png",
	};

	static show(config){
		if(!this.node){
			this.node = document.createElement('div');
			document.getElementsByTagName('body')[0].appendChild(this.node);
		}
		ReactDOM.render(<Loading {...config}/>,this.node);
	}
	static hide() {
		ReactDOM.unmountComponentAtNode(this.node);
	}

	render() {
		const {loadingView,className,maskVisible,loadingBgImg,loadingSpinImg, ...props } = this.props;
		return (
			<QueueAnim type="scale" duration={300} leaveReverse>
				<If condition={maskVisible}>
					<div className="tui-loading-mask"></div>
				</If>
				<If condition={loadingView}>
					<div className="tui-loading-view-wrap" key="wrap">
						{loadingView}
					</div>
				</If>
				<If condition={!loadingView}>
					<div className="tui-loading-view-wrap" key="wrap">
						<div className="tui-loading-view-default">
							<img src={loadingBgImg} className="tui-loading-bg"/>
							<img src={loadingSpinImg} className="tui-loading-spin"/>
						</div>
					</div>
				</If>
			</QueueAnim>
		)
	}
}
