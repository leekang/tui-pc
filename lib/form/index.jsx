import React, { Component } from 'react'
import {Tool} from 'tui';
import classNames from 'classnames';
import FormItem from './item';
import FormItemV from './itemV';
export default class Form extends Component {
	static defaultProps = {
		filterNestChild:true //过滤 tui-form-control嵌套的子元素
	};
	static Item = FormItem;
	static ItemV = FormItemV;
	state = {
	}
	onSubmit(e){
		e.preventDefault();
		let data = this.getInfo();
		if(this.props.onSubmit){
			this.props.onSubmit(e,data)
		}
		return false;
	}
	getVerifyInfo(n = 'name'){
		let verifyInfo = [];
		let formControls = this.getChildren();
		formControls.forEach((v)=>{
			let verify = v.props.verify;
			let name = v.getName(n);
			if(!verify || !name){
				return;
			}
			let val = v.getValue();

			if(verify === true && Tool.isEmpty(val)){
				verifyInfo.push({
					reactDom:v,
					isEmpty:true
				})
				return;
			}
			if(verify instanceof RegExp && !verify.test(val)){
				verifyInfo.push({
					reactDom:v,
					isRegVerify:true
				})
			}
			if(verify instanceof Function){
				let _v = verify(val)
				if(!_v.success){
					verifyInfo.push(Object.assign({
						reactDom:v,
						isFun:true,
					},_v))
				}
			}
		})
		return verifyInfo;
	}
	getChildren(){
		let formControls;
		if(this.props.filterNestChild){
			let nestChild = Tool.toArray(this.refs.form.querySelectorAll('.tui-form-control .tui-form-control'));
			formControls = Tool.queryReactDomAll(this.refs.form,'.tui-form-control',(doms)=>{
				return Tool.toArray(doms).filter((v)=>{
					return nestChild.indexOf(v) <0;
				})
			});
		}else{
			formControls = Tool.queryReactDomAll(this.refs.form,'.tui-form-control');
		}
		return formControls;
	}
	getInfo(n = 'name',filterEmpty){
		let formControls = this.getChildren();
		let info = {};
		formControls.forEach((v)=>{
			let name = v.getName(n);
			if(!name){
				return;
			}
			let val = v.getValue();
			if(filterEmpty && Tool.isEmpty(val)){
				return;
			}
			if(!/[\[\]\.]/.test(name)){
				info[name] = val;
				return;
			}
			let nameInfo = name.split(".");
			let index = nameInfo.length -1;
			let obj = info;
			nameInfo.forEach((v,i)=>{
				if(!/[^\[\]]+\[\w*\]/.test(v)){
					if(i == index){
						obj[v] = val;
						return;
					}
					if(!obj[v]){
						obj[v] = {};
					}
					obj = obj[v]
					return;
				}

				if(/[^\[\]]+\[\w*\]/.test(v)){
					let vi = /([^\[\]]+)\[(\w*)\]/.exec(v);
					if(!obj[vi[1]]){
						obj[vi[1]] = [];
					}
					if(i == index){
						if(!vi[2]){
							obj[vi[1]].push(val);
						}else{
							obj[vi[1]][vi[2]] = val;
						}
						return;
					}
					if(!vi[2]){
						let arr = [];
						obj[vi[1]].push(arr);
						obj = arr;
					}else{
						if(!obj[vi[1]][vi[2]]){
							obj[vi[1]][vi[2]] = {};
						}
						obj = obj[vi[1]][vi[2]];
					}
				}
			})
		})
		return info;
	}
	onChange(e){
		if(e){
			e.preventDefault();
		}
		if(this.props.onChange){
			this.props.onChange();
		}
	}
	render() {
		const {className,node,children,filterNestChild, ...props } = this.props
		if(node){
			let Node = node;
			return (
				<Node className={classNames("tui-form",className)} {...props} onSubmit={this.onSubmit.bind(this)} ref="form">
					{children}
				</Node>
			)
		}
		return (
			<form className={classNames("tui-form",className)} {...props} onSubmit={this.onSubmit.bind(this)} ref="form">
				{children}
			</form>
		)
	}
}
