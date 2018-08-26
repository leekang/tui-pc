import {Events} from 'tui';
export default class SelectServer extends Events{
	inSearchModal = false;
	mouseInPanel = true;//鼠标是否在面板里面
	init(defaultValue,childrens){
		this.defaultValue = defaultValue;
		this.originChildrens = childrens;//保存一份原始的childrens
		this.childrens = childrens;//当前的childrens也可能是搜索后的值。
		if(defaultValue){//如果有默认值的话,那么在面板打开的时候当前的值应该是默认值，如果没有默认值得话那么再去看鼠标有没有离开过面板，如果离开过那么他应该是上次的currentChild否则就是第一个元素。
			this.currentChildren = defaultValue;
			this.calPosition();
		}else{
			if(this.mouseInPanel){
				this.currentChildren = this.currentChildren || childrens[0].props.children;
			}else{
				this.currentChildren = childrens[0].props.children;
			}
		}
	}
	openPanel(defaultValue,childrens){
		this.init(defaultValue,childrens);
		if(!this.defaultValue && !this.mouseInPanel){//如果没有默认值的时候再次打开的话默认选中第一个
			this.emit("analyseActive",this.childrens[0].props.children)
		}
	}
	getCurrentChildren(){
		if(this.inSearchModal){//在搜索后看这个节点是不是被卸载掉，如果卸载掉了的话是会来调用这个函数来设置默认的选择项，若没有卸载掉的话则在option里面的setChildren里直接触发。
			this.emit("analyseActive",this.currentChildren)
		}
		if(this.defaultValue){
			return {children:this.defaultValue,isSelected:true};
		}else{
			return {children:this.childrens[0].props.children,isSelected:false};
		}
	}
	dropClose(){
		this.emit("dropClose")
		this.inSearchModal = true;
		if(this.defaultValue){
			this.emit("analyseActive",'');
		}
	}
	chooseItem(data){
		this.emit("chooseItem",data)
	}
	clearActive(){//鼠标移除内容区域
		this.mouseInPanel = false;
		/*if(this.defaultValue){//如果有默认值的话,那么在面板打开的时候当前的值应该是默认值，如果没有默认值得话那么再去看鼠标有没有离开过面板，如果离开过那么他应该是上次的currentChild否则就是第一个元素。
			this.currentChildren = this.defaultValue;
		}else{
			this.currentChildren = this.originChildrens[0].props.children;
		}*/
		this.emit("analyseActive",'')
	}
	calPosition(){//开始的时候根据有没有默认值先计算一下看看需不需要滚动
		this.mouseInPanel = true;
		this.childrens.forEach((item,index)=>{
			if(item.props.children == this.currentChildren){//如果
				if(index == this.childrens.length - 1){//如果等于最后一个
					this.emit("resetScrollTop");
					//this.emit("analyseActive",this.childrens[0].props.children);
				}else{
					this.emit("scrollTopDown",index);
					//this.emit("analyseActive",this.childrens[index].props.children);
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
		let selectChildren = children || this.currentChildren;
		this.defaultValue = selectChildren;
		this.originChildrens.forEach((item)=>{
			if(item.props.children == selectChildren){
				selectItem = item;
			}
		})
		this.emit("setValue",selectChildren,selectItem)
	}
	reLocatePos(children){
		this.currentChildren = children;
		this.emit("analyseActive",this.currentChildren)//这个地方不只是要把当前hover的元素显示出来，去次还要把之前的active的元素的背景关掉。
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
