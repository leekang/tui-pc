import React, { Component } from 'react'
import classNames from 'classnames';
import {Rate} from 'antd';
import {Icon} from 'tui';

export default class TuiRate extends Component{
	state = {
		normalStatus:true
	}
	componentDidMount(){
		if(this.props.defaultValue){
			this.setState({value:this.props.defaultValue})
		}else{
			this.setState({value:0});
		}
	}
	getName(name = 'name'){
		return this.props[name];
	}
	getValue(){
		return this.state.value;
	}
	rateClick(value,event){
		if(!this.props.disabled){
			event.stopPropagation();
			if(this.props.onChange){
				this.props.onChange(value+1);
			}
			this.setState({value:value+1});
		}
	}
	starMove(value,event){
		if(this.props.moveCount && !this.props.disabled){
			this.setState({normalStatus:false,value:value+1});
		}
	}

	endMove(ev){//或者直接用mouseLeave
		if(this.props.moveCount && !this.props.disabled){
			let oEvent = ev || event;
			let oTo = oEvent.toElement || oEvent.relatedTarget;
			if(!this.refs.rateUl.contains(oTo)){
				this.setState({normalStatus:true});
			}
		}
	}
	render(){
		const {count,showTxt,txt,...props} = this.props;
		let countArray = new Array(parseInt(count) || 5);
		for(let i=0;i<countArray.length;i++){
			countArray[i] = i;
		}
		return (
			<div className={classNames("tui-form-control")}>
				<ul className="tui-rate" ref="rateUl" onMouseOut={this.endMove.bind(this)}>
					<For each="item" of={countArray} index="index">
						<li key={"tui-rate-star"+index}
							className={classNames("tui-rate-star")}
							onMouseOver={this.starMove.bind(this,index)}
							onClick={this.rateClick.bind(this,index)} >
							<Icon name="star1" className={classNames({"tui-rate-star-full":index<this.state.value?true:false},"tui-rate-star-nor")} />
						</li>
					</For>
				</ul>
				<If condition={showTxt}>
					<span className={classNames("tui-rate-text tui-rate-align")}>{this.state.value} {txt || '星'}</span>
				</If>
			</div>
		)
	}
}
