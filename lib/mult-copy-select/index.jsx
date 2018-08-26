import React, { Component } from 'react'
import classNames from 'classnames';
import Util from 'core/util'
import {Select} from 'antd'
const Option = Select.Option;

export default class MultSelect extends Component {
	static getList(info,val){
		let result = [];
		for(let i in val){
			result.push(val[i])
		}
		if(info instanceof Array){
			if(info.length >1){
				info[1][info[0]] = result;
			}else{
				this.state[info[0]] = result;
			}
		}else{
			this.state[info] = result;
		}
		this.setState(this.state);
	}
	state = {
		defaultList: this.props.defaultList||[],//默认列表
		searchKey: Date.now(),
		joinSelect: {},//存储对象，最后的结果集
		searchList: this.props.defaultList||[],
		format: this.props.format,
		showKey: this.props.format.showKey,//展示用的key
		valueKey: this.props.format.valueKey,//取值用的key
	}
	componentWillMount(){
		let curKeyList = [];
		let { showKey, valueKey } = this.state;
		this.state.defaultList.forEach((v)=>{
			curKeyList.push(v[showKey])
			this.state.joinSelect[v[valueKey]] = v;
		})
		this.state.defaultSel = curKeyList;//格式为［'放克','北方'］，组件输入框的展示格式需求
	}
	//下一个项目放开这一段，并优化一下代码
	// componentWillReceiveProps(nextProps){
	// 	if(nextProps.defaultList){
	// 		this.state.defaultList = nextProps.defaultList
	// 		let curKeyList = [];
	// 		let { showKey, valueKey } = this.state;
	// 		this.state.defaultList.forEach((v)=>{
	// 			curKeyList.push(v[showKey])
	// 			this.state.joinSelect[v[valueKey]] = v;
	// 		})
	// 		this.state.defaultSel = curKeyList;//格式为［'放克','北方'］，组件输入框的展示格式需求
	// 		this.state.searchKey = Date.now();
	// 		this.setState({})
	// 	}
	// }
	searchFilter(){
		return true;
	}
	filter(arrary){
		let result = [];
		arrary.forEach(v=>{
			if(result.indexOf(v) === -1){
				result.push(v)
			}
		})
		return result;
	}
	search(val){
		let pattern = new RegExp("[~!@$%^&*()+=|{}:;,\\[\\].<>/?~！@￥%……&*（）——+|{}【】；：”“\\\\。，、？]");
		if(this.props.copyServer&&pattern.exec(val)){
			this.setState({searchList:[]});
			let rs = "";
		    for (let i = 0; i < val.length; i++) {
		        rs = rs + val.substr(i, 1).replace(pattern, ' ');
		    }
		    rs = rs.replace(/\s+/g," ");
		    rs = rs.replace(/(^\s*)|(\s$)/g,"");
		   	let realStr = rs.split(' ').join(',');
		   	let realStrArr = realStr.split(',');
		   	realStrArr = this.filter(realStrArr);
		   	let errorArr = [], request = {};
			request[this.state.format.requestKey] = realStr;
	   		this.props.copyServer(request).then((res)=>{
	   			//这一块的逻辑根据后端的返回接口而定
	   			let resKey = {};
	   			res.data.forEach(v=>{
	   				resKey[v[this.state.showKey]] = v;
	   			})
	   			let resKeyArrary = Object.keys(resKey);
		   		let copySearchList = [];
		   		realStrArr.map((v)=>{
		   			if(resKeyArrary.indexOf(v)>-1){
		   				copySearchList.push(resKey[v])
		   			}else {
		   				errorArr.push(v);
		   			}
		   		})
		   		if(errorArr.length > 0){
		   			Util.error(errorArr.join(',')+'不是正确的花名')
		   		}
				this.onCopy(copySearchList);
		   	})
		}else{
			let request = {};
			request[this.state.format.requestKey] = val;
			Util.delayFun("medalSearch",()=>{
				this.props.normalServer(request).then((res)=>{
					this.setState({
						searchList: res.data
					})
				})
			},300)
		}
	}
	//复制
	onCopy(copySearchList){
		let { showKey, valueKey, joinSelect, defaultList } = this.state;
		let curKeyList = [];
		if(Object.keys(joinSelect).length>0){
			//之前有值，作拼接
			copySearchList.forEach(v=>{
				if(Object.keys(joinSelect).indexOf(v[valueKey]) == -1){
					defaultList.push(v);
					joinSelect[v[valueKey]] = v;
				}
			})
			Object.keys(joinSelect).forEach(v=>{
				curKeyList.push(joinSelect[v][showKey])
			})
		}else{
			//直接赋值
			defaultList = copySearchList;
			copySearchList.forEach(v=>{
				curKeyList.push(v[showKey])
				joinSelect[v[valueKey]] = v;
			})
		}
		this.setState({
			joinSelect: joinSelect,
			searchKey: new Date().getTime(),
			defaultList: defaultList,
			defaultSel: curKeyList//格式为［'放克','北方'］，组件输入框的展示格式需求
		})
		this.props.onChange(joinSelect);
	}
	//选择
	onSearchSelect(val,opt){
		let { showKey, valueKey } = this.state;
		let promise = new Promise((resolve, reject) => {
			let info = opt.props.info;
			this.state.joinSelect[info[valueKey]] = info;
			this.props.onChange(this.state.joinSelect);
			this.setState({
				joinSelect: this.state.joinSelect
			})
			resolve('success');
		})
	}
	//删除
	onSearchDeselect(val,opt){
		let { showKey, valueKey } = this.state;
		let tempJoinSelect = this.state.joinSelect;//这个地方值得注意一下delete同时也会把this.state.joinSelect中的东西给删掉了
		//获取被删除项
		let curDelete;
		for(let i in tempJoinSelect){
			if(tempJoinSelect[i][showKey] === val){
				curDelete = tempJoinSelect[i]
			}
		}
		delete(tempJoinSelect[curDelete[valueKey]])
		this.state.joinSelect = tempJoinSelect;
		this.props.onChange(this.state.joinSelect);
		this.setState({
			joinSelect:tempJoinSelect
		})
	}
	render(){
		let { showKey, valueKey, defaultSel, searchKey } = this.state;
		return (
			<Select multiple 
				placeholder={this.props.placeholder}
				className="w-full"
				key = {searchKey}
				defaultValue={defaultSel}
				filterOption={this.searchFilter.bind(this)}
				onSearch={this.search.bind(this)}
				onSelect={this.onSearchSelect.bind(this)}
				onDeselect={this.onSearchDeselect.bind(this)}>
				<For each="item" of={this.state.searchList || []}>
					<Option key={item[showKey]} info={item}>{item[showKey]}</Option>
				</For>
			</Select>
		)
	}
}
