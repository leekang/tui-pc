import {Events} from 'tui';
export default class TuiDateCtrl extends Events{
	prevImg = 'https://s10.mogucdn.com/mlcdn/c45406/170727_0l6cl6jf4c07ekc970077hjbjh7jh_66x64.png';
	nextImg = "https://s10.mogucdn.com/mlcdn/c45406/170727_7ek4199ecckifg7c58df5ga636808_66x64.png";
	pImg = "https://s10.mogucdn.com/mlcdn/c45406/170727_06ik6lff20jfejfg8ji2hhk688bdh_34x64.png";
	nImg = "https://s10.mogucdn.com/mlcdn/c45406/170727_8gi9ie0662756j6ie7kddf6hafaj3_34x64.png";
	exactTime ={
		second:6,
		minute:5,
		hour:4,
		date:3,
		month:2,
		year:1,
	};
	hour = '0';
	minute = '0';
	second = '0';
	//日期视图修改
	changeView(type){
		this.emit("changeView",type)
	}
	//选中日期
	selectDate(date,type){
		this.date = date;
		this.parseDate(date)
		this.emit("select",type)
	}
	//时间变更通知
	changeTime(date){
		if(date){
			this.date = date;
		}
		this.parseDate(this.date)
		this.emit("changeTime")
	}
	parseDate(date){
		if(!date){
			return;
		}
		date.hour(this.hour)
		date.minute(this.minute)
		date.second(this.second)
	}
	//手动输入
	inputTime(date){
		this.date = date;
		this.emit("inputTime",date)
	}
}
