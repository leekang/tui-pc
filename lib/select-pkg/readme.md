## select组件功能封装

#### 属性
	defaultValue,
	className,
	showSearch,
	server,
	data,
	multiple,
	valueType,	//detail时返回选中的对象值
	nameKey,		//展示字段
	valueKey,		//值字段
	parseDetail,//格式化选中的对象，会作为detail的返回值
	onSearch,
	onSelect,
	onChange
	等

#### 使用姿势一：搜索时回调（一般需要延迟和缓存）
	search(val,cbk){
		Util.delayFun('delaySearchName',(()=>{
			Server.serverName({
				value:val
			}).then((res)=>{
				cbk(res.data)
			})
		}))
	}
	render(){
		return (
			<Select
				onSearch={this.search}
				{...this.props}/>
		)
	}

#### 使用姿势二：提供服务
	server(){
		return Server.serverName().then((res)=>{
			return res.data;
		})
	}
	render(){
		return (
			<Select server={this.server} {...this.props}/>
		)
	}

#### 使用姿势三：提供数据
	<Select data={[{name:1,value:'1'}]} {...this.props}/>
