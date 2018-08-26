import React,{Component} from 'react';
import {Select,Tool,Icon} from 'tui';
const Option = Select.Option;
import classNames from 'classnames';

export default class SelectPkg extends Component{
	static defaultProps = {
		disFilter:true,
		showSearch:true,
		joinSign:',',
		keyType:'key-value',
		nameKey:'name',
		valueKey:'value',
	}
	selectKey = Date.now();
	state = {
		updateKey:Date.now(),
	}
	getName(name = 'name'){
		return this.props[name];
	}
	getValue(){
		const {valueType,multiple,joinSign} = this.props;
		let val;
		if(multiple){
			val = this.value || [];
			if(valueType == 'detail'){
				return val.map((v)=>{
					return this.valueObj['val'+v];
				})
			}
			if(valueType == 'string'){
				return val.join(joinSign)
			}
		}else{
			val = this.value;
			if(valueType == 'detail'){
				return this.valueObj['val'+val]
			}
		}
		return val;
	}
	setState(...props){
		if(this.unmount){
			return;
		}
		super.setState(...props)
	}
	componentWillUnmount(){
		this.unmount = true;
	}
	componentDidMount(){
		const {server,data,defaultValue,multiple} = this.props;
		if(server){
			server(this.getValue()).then((data)=>{
				this.setData(data)
			})
		}else if(data){
			this.setData(data)
		}
		this.form = Tool.queryParentReactDom(this.refs.wrap,".tui-form")
	}
	//设置值
	setData(data){
		const {defaultValue,multiple,valueKey} = this.props;
		let _data = {
			data:data
		}
		if(typeof(defaultValue) != 'undefined'){
			this.setDefaultvalue(data,defaultValue)
		}else{
			this.setState(_data)
		}
	}

	//设置默认值
	setDefaultvalue(data,val){
		this.value = val;
		const {multiple,valueKey} = this.props;
		let defaultValue = val+"";
		if(multiple){
			defaultValue = data.filter((v)=>{
				return val.indexOf(v[valueKey]) >= 0;
			}).map((v)=>{
				this.setDetail(v[valueKey],v)
				return v[valueKey]+"";
			})
		}else{
			data.forEach((v)=>{
				if(v[valueKey] == val){
					this.setDetail(v[valueKey],v)
				}
			})
		}
		this.setState({
			updateKey:Date.now(),
			data:data,
			defaultValue:defaultValue
		})

	}
	onChange(value){
		this.value = value;
		if(this.props.onChange){
			this.props.onChange(this.getValue(),this.valueObj['val'+value])
		}
		if(this.form){
			this.form.onChange()
		}
		if(this.props.cleanable){
			this.setState({})
		}
	}
	valueObj = {};
	setDetail(val,info){
		const {parseDetail} = this.props;
		if(parseDetail){
			this.valueObj['val'+val] = parseDetail(info);
		}else{
			this.valueObj['val'+val] = info;
		}
	}
	onSelect(val,option){
		this.setDetail(option.props.value,option.props.info)
	}
	onSearch(val){
		const {onSearch} = this.props;
		if(onSearch){
			onSearch(val,(data)=>{
				this.setState({
					data:data
				})
			})
		}
	}
	searchFilter(){
		return true;
	}
	clean(){
		const {multiple} = this.props;
		this.selectKey = Date.now();
		let value
		if(multiple){
			value = [];
		}else{
			value = '';
		}
		this.onChange(value);
		this.setState({})
	}
	render(){
		const {
			defaultValue,
			className,
			children,
			cleanable,
			showSearch,
			server,
			data,
			multiple,
			valueType,
			keyType,
			nameKey,
			valueKey,
			onSearch,
			onSelect,
			searchFilter,
			parseDetail,
			joinSign,
			disFilter,
			onChange,...props} = this.props;
		let _data = this.state.data || data ||[];
		let clean = cleanable && !Tool.isEmpty(this.value) && !multiple;
		let opt = {};
		if(disFilter){
			opt.filterOption = this.searchFilter.bind(this)
		}
		return (
			<div className={classNames("tui-form-control tui-selectPkg",className,{"tui-selectPkg-cleanable":clean})} {...props} ref="wrap" key={this.selectKey}>
				<Select {...props}
					{...opt}
					key={this.state.updateKey}
					className="w-full"
					multiple={multiple}
					showSearch={showSearch}
					optionFilterProp="children"
					onChange={this.onChange.bind(this)}
					onSelect={this.onSelect.bind(this)}
					defaultValue={this.state.defaultValue}
					onSearch={this.onSearch.bind(this)}>
					<Choose>
						<When condition={keyType=='value'}>
							<For each="item" of={_data} index="index">
								<Option key={item+''} value={item+''} info={item}>{item}</Option>
							</For>
						</When>
						<Otherwise>
							<For each="item" of={_data} index="index">
									<Option key={item[valueKey]+''} value={item[valueKey]+''} info={item}>{item[nameKey]}</Option>
							</For>
						</Otherwise>
					</Choose>
				</Select>
				<If condition={clean}>
					<div className="tui-selectPkg-clean flex-center">
						<div className="padder-xs c-po" onClick={this.clean.bind(this)}>
							<Icon name="close" className="d-b"/>
						</div>
					</div>
				</If>
			</div>
		)
	}
}
