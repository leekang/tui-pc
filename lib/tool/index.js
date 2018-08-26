let delayFuns = {};
let singleReqList = {};
import moment from 'moment';

//工具
class Util{
	init(){}
	clearDelayFun(id){
		clearTimeout(delayFuns[id]);
	}
	delayFun(id,fun,time){
		clearTimeout(delayFuns[id]);
			delayFuns[id] = setTimeout(()=>{
				fun();
		},time || 500);
	}
	//延迟下次
	delayNextFun(id,fun,time){
		if(delayFuns[id]){
			return;
		}
		fun();
		delayFuns[id] = setTimeout(()=>{
			delayFuns[id] = undefined;
		},time || 500);
	}

	singleReq(id,req){
		if(singleReqList[id]){
			return singleReqList[id];
		}
		let p = req();
		singleReqList[id] = p;

		p.then(()=>{
			delete(singleReqList[id])
		}).catch(()=>{
			delete(singleReqList[id])
		})
		return p;
	}

	//解决像NodeList这样，不是数组的循环问题
	forEach(v,fun){
		Array.prototype.forEach.call(v,fun);
	}
	toArray(v){
		let arr = [];
		this.forEach(v,(item)=>{
			arr.push(item);
		})
		return arr;
	}
	newArray(start, end) {
		const result = [];
		for (let i = start; i < end; i++) {
			result.push(i);
		}
	  return result;
	}
	pad(num,n){
		let l = (''+num).length;
		return Array(n>l?(n-l+1):0).join(0)+num;
	}

	//数组过滤
	arrayUnique(arr,fn){
		if(arr.length < 2){
			return arr;
		}
		if(typeof fn != 'function') {
			fn = (a)=>{
				return a;
			}
		}
		let tmp = [];
		return arr.filter((v)=>{
			let a = fn(v)
			if(tmp.indexOf(a) >= 0){
				return false;
			}
			tmp.push(a);
			return true;
		})
	}

	q(data,time = 100){
		return new Promise((resolve,reject)=>{
			setTimeout(()=>{
				resolve(data)
			},time)
		})
	}

	//查询父节点
	queryParent(el, selector, all = false){
		const result = [];
		const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;

		el = el.parentElement;
		while (el) {
			let res = matchesSelector.call(el, selector);
			if(!all && res){
				return el;
			}
			if(res){
				result.push(el);
			}
			el = el.parentElement;
		}
		if(!all){
			return null;
		}
		return result;
	}

	//查询所有父节点
	queryParents(el, selector){
		return this.queryParent(el, selector,true)
	}

	queryParentReactDom(dom,selector){
		if(!dom){
			return null;
		}
		let parent = this.queryParent(dom,selector);
		if(!parent){
			return null;
		}
		return this.getReactDom(parent);
	}

	isStaticPositioned(element){
		return getComputedStyle(element).position == 'static';
	}

	getElementTop(element) {
		if(!element){
			return 0;
		}
		let actualTop = element.offsetTop;
		let current = element.offsetParent;
		while (current !== null) {
			actualTop += current.offsetTop;
			current = current.offsetParent;
		}
		return actualTop;
	}

	getElementLeft(element) {
		if(!element){
			return 0;
		}
		let actualLeft = element.offsetLeft;
		let current = element.offsetParent;
		while (current !== null) {
			actualLeft += current.offsetLeft;
			current = current.offsetParent;
		}
		return actualLeft;
	}

	//交集判断  t表示容差
	intersect(a,b,t=0){
		if(a.length != 2 || b.length != 2){
			return;
		}
		let s = a[0] > b[0] ? b[0]:a[0];
		let e = a[1] > b[1] ? a[1]:b[1];

		return e-s < a[1]-a[0] + b[1]- b[0] - t;
	}



	prefixList = [
		'transform',
		'transition'
	];
	css(dom,data){
		//换个方式实现，性能应该会有比较大的提升
		let _data = this.parseStyleObj(data);
		Object.keys(_data).forEach((v)=>{
			dom.style.setProperty(v,_data[v])
		})
	}

	removeCss(dom,props){
		dom.style.removeProperty(props)
		if(this.prefixList.indexOf(props)){
			dom.style.removeProperty("-webkit-"+props);
		}
	}

	//将样式对象转化为可使用的样式对象
	parseStyleObj(data){
		let cssNumber = [
			"columnCount",
			"fillOpacity",
			"fontWeight",
			"lineHeight",
			"opacity",
			"order",
			"orphans",
			"widows",
			"zIndex",
			"zoom"
		];

		let _data = Object.assign({},data);
		Object.keys(_data).forEach((v)=>{
			if(this.prefixList.indexOf(v) >= 0){
				_data["-webkit-"+v] = _data[v];
			}
			if(typeof(_data[v]) == 'number' && cssNumber.indexOf(v) < 0){
				_data[v] = _data[v]+'px';
			}
		})
		return _data;
	}
	queryReactDomAll(dom = document,selector,filter){
		let reactDoms = [];
		let doms = dom.querySelectorAll(selector);
		if(filter){
			doms = filter(doms)
		}
		this.forEach(doms,(dom)=>{
			let reactDom = this.getReactDom(dom);
			if(reactDom){
				reactDoms.push(reactDom);
			}
		})
		return reactDoms;
	}
	queryReactDom(dom = document,selector){
		return this.getReactDom(dom.querySelector(selector))
	}
	//根据dom 获取react dom
	getReactDom(dom){
		if(!dom){
			return null;
		}
		for (let key in dom){
			if (key.indexOf("__reactInternalInstance$") == 0) {
				let compInternals = dom[key]._currentElement;
				let compWrapper = compInternals._owner;
				let comp = compWrapper._instance;
				return comp;
			}
		}
		return null;
	};
	//字符串 对象 布尔值 数组 是否为空
	isEmpty(val){
		if(typeof(val) == 'string'){
			return !val;
		}
		//0 认为是非空
		if(typeof(val) == 'number'){
			return val !== 0 && !val;
		}
		if(val instanceof Array){
			return val.length == 0;
		}
		if(val instanceof Object){
			return Object.keys(val).length == 0;
		}
		return !val;
	}

	//moment占个位，以后统一解决东八区问题
	moment(date){
		return moment(date);
	}
	momentTime(date,format){
		return moment(date,format);
	}

	addClass(dom,cls){
		let className = dom.className;
		let cArr = className.split(" ")
		let addArr = cls.split(" ");
		addArr.forEach((v)=>{
			if(cArr.indexOf(v) < 0){
				cArr.push(v);
			}
		})
		dom.className = cArr.join(" ")
	}

	removeClass(dom,cls){
		let className = dom.className;
		let cArr = className.split(" ")
		let removeArr = cls.split(" ");
		cArr = cArr.filter((v)=>{
			return removeArr.indexOf(v) < 0;
		})
		dom.className = cArr.join(" ")
	}
	hasClass(dom,cls){
		let className = dom.className;
		if(className.indexOf(cls) > -1){
			return true;
		}else{
			return false;
		}
	}
	imgSize(url,size){
		if(!url){
			return '';
		}
		let ext = '.png';
		try{
			ext = /.+(\.\w+)$/.exec(url)[1]
		}catch(e){
			//return '';
		}
		return url+"_"+size+ext;
	}
	//将一维数组分割为二维数组
	arrShort(arr,length){
		return arr.map((v,i)=>{
			let l = i/length;
			if(l == parseInt(l)){
				return arr.slice(i,i+length)
			}
			return false;
		}).filter((v)=>{
			return v;
		})
	}

}
export default new Util;
