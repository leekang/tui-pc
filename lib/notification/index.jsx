import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import QueueAnim from 'rc-queue-anim';
import {Icon,Row,Col} from 'tui';

export default class Notification extends Component {
	static config(options){
		if(!Notification.node){
			Notification.node = document.createElement('div');
			document.body.appendChild(Notification.node);
			ReactDOM.render(<Notification />,Notification.node,()=>{
				Notification.instance.add(options);
			});
		}else{
			Notification.instance.add(options);
		}
	}
	componentDidMount(){
		Notification.instance = this;
	}

	notifyList = [];
	add(conf){
		const {duration} = conf;
		let item = Object.assign({id:Date.now()+''+(Math.random()*1000|1)},conf);
		this.notifyList.push(item);
		item.timeout = setTimeout(()=>{
			this.remove(item)
		},duration || 2000)
		this.setState({})
	}
	close(item){
		clearTimeout(item.timeout);
		this.remove(item)
	}
	remove(item){
		this.notifyList.splice(this.notifyList.indexOf(item),1);
		this.setState({})
	}
	render() {
		return (
			<div className="tui-notification">
				<QueueAnim  type="right" duration={400} leaveReverse>
					<For each="item" of={this.notifyList}>
						<Row key={item.id} className="tui-notification-item" align="center">
							<If condition={item.type}>
								<div className={classNames("tui-notification-icon flex-center",'tui-notification-icon-'+item.type)}>
									<Icon name={item.type}/>
								</div>
							</If>
							<div className="flex-1 tui-notification-content">
								<If condition={item.title}>
									<div className="tui-notification-title">{item.title}</div>
								</If>
								{item.message}
							</div>
							<div className="flex-center tui-notification-close" onClick={this.close.bind(this,item)}><Icon name='cross' /></div>
						</Row>
					</For>
				</QueueAnim>
			</div>
		)
	}
}
