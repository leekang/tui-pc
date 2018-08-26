import {Events} from 'tui';
export default class TuiSelectBaseCtrl extends Events{
	_onInput(val){
		this.emit("input",val)
	}
	_visibleChange(val){
		this.emit("visibleChange",val)
	}
	setValue(){
	}
	getValue(){
	}
}

