import {Events} from 'tui';
export default class SelectServer extends Events{
	mouseInPanel = true;//鼠标是否在面板里面
	inSearchModal = false;
	isSearchSet = false;
	init(defaultValue,childrens){
		this.defaultValue = defaultValue || [];
		this.originChildrens = childrens;//保存一份原始的childrens
		this.childrens = childrens;//当前的childrens也可能是搜索后的值。
		if(this.defaultValue.length > 0){//如果有默认值
			this.currentChildren = this.getFrontIndex();//
			this.calPosition();
		}else{
			if(this.mouseInPanel){
				this.currentChildren = this.currentChildren || childrens[0].props.children;
			}else{
				this.currentChildren = childrens[0].props.children;
			}
		}
	}
	getFrontIndex(){//多选的话如果有多个默认值那么首先要确定的是第一个元素在原始列表里的位置。
		let childrenValueArr = new Array();
		this.originChildrens.forEach((item)=>{
			childrenValueArr.push(item.props.children);
		})
		let realDefaultValue = new Array();//如果默认值数组里面有个值是错误的，或者说这个默认值数组里面有一个错误的一项。
		this.defaultValue.forEach((item)=>{
			if(childrenValueArr.indexOf(item) > -1){
				realDefaultValue.push(item);
			}
		})
		if(realDefaultValue.length > 0){
			let frontIndex = childrenValueArr.indexOf(realDefaultValue[0]);
			realDefaultValue.forEach((item)=>{
				if(childrenValueArr.indexOf(item) < frontIndex){
					frontIndex = childrenValueArr.indexOf(item);
				}
			})
			return childrenValueArr[frontIndex];
		}else{
			return childrenValueArr[0]
		}
	}
	calPosition(){
		this.mouseInPanel = true;
		this.childrens.forEach((item,index)=>{
			if(item.props.children == this.currentChildren){
				if(index == this.childrens.length-1){
					this.emit("resetScrollTop")
				}else{
					this.emit("scrollTopDown",index);
				}
			}
		})
	}
	keyDown(){
		this.mouseInPanel = true;
		let tempCurrentChildren;
		this.childrens.forEach((item,index)=>{
			if(item.props.children == this.currentChildren){//如果
				if(index == this.childrens.length - 1){//如果等于最后一个
					tempCurrentChildren = this.childrens[0].props.children;
					this.emit("resetScrollTop");
					this.emit("analyseActive",this.childrens[0].props.children);
				}else{
					tempCurrentChildren = this.childrens[index+1].props.children;
					this.emit("scrollTopDown",index+1);
					this.emit("analyseActive",this.childrens[index+1].props.children);
				}
			}
		})
		this.currentChildren = tempCurrentChildren;
	}
	keyUp(){
		this.mouseInPanel = true;
		let tempCurrentChildren;
		this.childrens.forEach((item,index)=>{
			if(item.props.children == this.currentChildren){
				if(index == 0){
					tempCurrentChildren = this.childrens[this.childrens.length - 1].props.children;
					this.emit("scrollToBottom");
					this.emit("analyseActive",this.childrens[this.childrens.length - 1].props.children);
				}else{
					tempCurrentChildren = this.childrens[index-1].props.children;
					this.emit("scrollTopUp",index-1);
					this.emit("analyseActive",this.childrens[index-1].props.children);
				}
			}
		})
		this.currentChildren = tempCurrentChildren;
	}
	setValue(children){
		let selectItem;
		this.isSearchSet = false;
		let selectChildren = children || this.currentChildren;
		this.childrens = this.originChildrens;
		if(this.defaultValue.indexOf(selectChildren) > -1){
			this.defaultValue.splice(this.defaultValue.indexOf(selectChildren),1)
		}else{
			this.defaultValue.push(selectChildren)
		}
		if(this.inSearchModal){//如果是在搜索模式
			this.currentChildren = this.childrens[0].props.children;
			//this.emit("analyseActive",this.currentChildren)
			this.inSearchModal = false;
			this.isSearchSet = true;
			this.emit("clearSearchValue");
			this.emit("searchChildren",this.originChildrens,true);
			
		}else{
			this.currentChildren = selectChildren;
		}
		//this.emit("analyseActive",this.currentChildren)
		//this.emit("clearSearchValue")
		//this.emit("searchChildren",this.originChildrens)
		this.emit("setValue",this.defaultValue)
	}
	delValue(value){
		this.defaultValue.splice(this.defaultValue.indexOf(value),1);
		this.emit("setValue",this.defaultValue)
	}
	openPanel(defaultValue,childrens){
		this.init(defaultValue || [],childrens);
		
		if(this.defaultValue.length == 0 && !this.mouseInPanel){//如果没有默认值的时候再次打开的话默认选中第一个
			this.emit("analyseActive",this.childrens[0].props.children)
		}
	}
	getCurrentChildren(){
		if(this.inSearchModal || this.isSearchSet){//在搜索后看这个节点是不是被卸载掉，如果卸载掉了的话是会来调用这个函数来设置默认的选择项，若没有卸载掉的话则在option里面的setChildren里直接触发。
			this.emit("analyseActive",this.currentChildren)
		}
		if(this.defaultValue.length > 0){
			let childrenValueArr = new Array();
			this.childrens.forEach((item)=>{
				childrenValueArr.push(item.props.children);
			})
			let realDefaultValue = new Array();
			this.defaultValue.forEach((item)=>{
				if(childrenValueArr.indexOf(item) > -1){
					realDefaultValue.push(item);
				}
			})
			if(realDefaultValue.length > 0){
				return {children:this.defaultValue,isSelected:true};
			}else{
				return {children:this.childrens[0].props.children,isSelected:false}
			}
		}else{
			return {children:this.childrens[0].props.children,isSelected:false};
		}		
	}
	reLocatePos(children){
		this.currentChildren = children;
		this.emit("analyseActive",this.currentChildren)
	}
	clearActive(){
		this.mouseInPanel = false;
		this.emit("analyseActive",'');
	}

	dropClose(){
		this.inSearchModal = false;
		this.emit("dropClose");
		if(this.defaultValue.length > 0){
			this.emit("analyseActive",'');
		}
	}
	searchValue(value){
		this.inSearchModal = true;
		let tempChildrens = [];
		this.originChildrens.forEach((item,index)=>{
			if(item.props.children.indexOf(value) > -1){
				tempChildrens.push(item);
			}
		})
		//this.tempChildrens = tempChildrens;
		this.childrens = tempChildrens;
		if(tempChildrens.length > 0){
			this.currentChildren = tempChildrens[0].props.children;
			this.emit("searchChildren",tempChildrens);
		}else{

		}
	}
}
