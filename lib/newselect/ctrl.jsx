import {Events} from 'tui';
export default class TuiSelectCtrl extends Events{
	lastIndex = 0;
	currentIndex = 0;
	init(defaultValue,children){
		this.defaultValue = defaultValue;
		this.children = children;
	}
	openPanel(defaultValue,children){
		this.init(defaultValue,children)
		let optionIndex = 0;//记录列表里面的下标
		if(defaultValue){
			children.forEach((item,index)=>{
				if(item.props.children == defaultValue){
					optionIndex = index
				}
			})
		}
		
		if(defaultValue){
			this.emit("selected",optionIndex);
		}else{
			this.emit("active",0)
		}
	}
}
