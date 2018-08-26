<MultSelect 
	key={'workIds'+this.state.multKey}
	defaultList={formData.employeeVos}
	placeholder="请选择可见员工"
	format={{showKey:'nickname',valueKey:'workId', requestKey:'keyword'}} 
	normalServer={ProfileServer.fuzzySearchWithInJob} 
	copyServer={ProfileServer.batchSearchWithNicknames}
	onChange={MultSelect.getList.bind(this,['employeeVos',this.state.formData])}/>