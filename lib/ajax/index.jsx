import CacheServer from 'server/cache';
import Util from 'core/util';
import Url from './url';

class Ajax{
	onError(e){
	}
	resultVerify(res){
		if(!res.success){
			if(res.code && res.code === 302){
				//刷新页面 跳转登录页面
				location.href = location.href;
				throw(new Error("未登录"))
			}
			Util.error(res.msg)
			throw(new Error(res.msg))
		}
	}
	get(url,data,autoError = true){
		let _data = data;
		let _param = data && Object.keys(data).length > 0 ? '?'+Url.param(_data):'';
		let p = fetch(url+_param,{
			method:'GET',
			credentials: 'include',
			headers: { "Content-Type" : "application/x-www-form-urlencoded" }
		}).then((data)=>{
			return data.json();
		}).catch(this.onError)

		return p.then((res)=>{
			if(autoError){
				this.resultVerify(res);
			}
			return res;
		})
	}
	postUrl(url,data,autoError = true){
		let p = fetch(url,{
			method:'POST',
			credentials: 'include',
			headers: { "Content-Type" : "application/x-www-form-urlencoded","X-Requested-With":"XMLHttpRequest" },
			body:Url.param(data)
		}).then((data)=>{
			return data.json();
		}).catch(this.onError)

		return p.then((res)=>{
			if(autoError){
				this.resultVerify(res);
			}
			return res;
		})
	}
	post(url,data,autoError = true){
		let p = fetch(url,{
			method:'POST',
			credentials: 'include',
			headers: { "Content-Type" : "application/json" },
			body:JSON.stringify(data)
		}).then((data)=>{
			return data.json();
		}).catch(this.onError)

		return p.then((res)=>{
			if(autoError){
				this.resultVerify(res);
			}
			return res;
		})
	}
	fetch(url,data){
		return fetch(url,data);
	}
	//带缓存的请求
	getCache(url,data,expire){
		let name = url+"___"+Url.param(data||{})
		if(CacheServer.get(name)){
			return new Promise((resolve,reject)=>{
				resolve(CacheServer.getValue(name))
			})
		}
		return this.get(url,data).then((res)=>{
			CacheServer.update(name,res,expire)
			return res;
		})
	}
	postCache(url,data,expire){
		let name = url+"___"+Url.param(data||{})
		if(CacheServer.get(name)){
			return new Promise((resolve,reject)=>{
				resolve(CacheServer.getValue(name))
			})
		}
		return this.post(url,data).then((res)=>{
			CacheServer.update(name,res,expire)
			return res;
		})
	}
	postUrlCache(url,data,expire){
		let name = url+"___"+Url.param(data||{})
		if(CacheServer.get(name)){
			return new Promise((resolve,reject)=>{
				resolve(CacheServer.getValue(name))
			})
		}
		return this.postUrl(url,data).then((res)=>{
			CacheServer.update(name,res,expire)
			return res;
		})
	}

}
let ajax = new Ajax;
export default ajax;
