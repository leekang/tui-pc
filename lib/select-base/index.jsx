import React, { Component } from 'react'
import classNames from 'classnames';
import {Dropdown,Input,Icon,Row} from 'tui';
import Ctrl from './ctrl';
import MultipleIpt from './multipleIpt';
import SelectIpt from './selectIpt';

export default class TuiSelectBase extends Component {
	Ctrl = Ctrl;
	constructor(props){
		super(props);
		this.ctrl = new this.Ctrl;
	}
	getName(name = 'name'){
		return this.props[name];
	}
	getValue(){
		return this.value;
	}
	_toggleOverlay(){
		const {disabled} = this.props;
		if(disabled){
			return;
		}
		this.refs.drop.toggle();
	}
	_visibleChange(value){
		this.ctrl._visibleChange(value)
	}
	overlayRender(){
	}
	render(){
		const {onChange,multiple,overlay,showSearch,...props} = this.props;
		return (
			<div className={classNames("tui-selectBase tui-form-control")}>
				<Dropdown
					ref="drop"
					onVisibleChange={this._visibleChange.bind(this)}
					overlay={this.overlayRender()}
					{...props}
					trigger="blurCheck">
					<div className="tui-selectBase-content" onClick={this._toggleOverlay.bind(this)}>
						<If condition={multiple}>
							<MultipleIpt ctrl={this.ctrl} info={this.props}/>
						</If>
						<If condition={!multiple}>
							<SelectIpt ctrl={this.ctrl} info={this.props}/>
						</If>
					</div>
				</Dropdown>
			</div>
		)
	}
}
