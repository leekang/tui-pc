class ImageServer{
	/**
		*图片上传
		*img 图片对象
		*cbs 事件回调
		*/
	uploadByVersionId(img,cbs,name,other){

		return new Promise((resolve,reject)=>{
			let formData = new FormData();
			formData.append('file',img,name);
			formData.append('formVersionId',other);
			let xhr = new XMLHttpRequest();
			for(let i in cbs){
				if(i === 'percent'){
					xhr.addEventListener('progress',(e)=>{
						if (e.lengthComputable) {
							cbs[i](e.loaded*100 / e.total)
						}
					},false)
				}else{
					xhr.addEventListener(i,cbs[i],false)
				}
			}
			xhr.addEventListener("load",function(){
					resolve(JSON.parse(this.responseText))
			},false)
			xhr.addEventListener("error",function(e){
				reject(e)
			},false)

			xhr.open("POST",'/form/uploadByVersionId')
			xhr.send(formData)
		});
	}

	uploadByInstanceId(img,cbs,name,other){

		return new Promise((resolve,reject)=>{
			let formData = new FormData();
			formData.append('file',img,name);
			formData.append('formInstanceId',other);
			let xhr = new XMLHttpRequest();
			for(let i in cbs){
				if(i === 'percent'){
					xhr.addEventListener('progress',(e)=>{
						if (e.lengthComputable) {
							cbs[i](e.loaded*100 / e.total)
						}
					},false)
				}else{
					xhr.addEventListener(i,cbs[i],false)
				}
			}
			xhr.addEventListener("load",function(){
					resolve(JSON.parse(this.responseText))
			},false)
			xhr.addEventListener("error",function(e){
				reject(e)
			},false)

			xhr.open("POST",'/form/uploadByInstanceId')
			xhr.send(formData)
		});
	}

}
let imageServer = new ImageServer;
export default imageServer;
