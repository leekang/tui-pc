###ImgUpload
图片上传
###如何使用
onImgSelect(){
    this.refs.files.getImgs();
}
import {Imgupload} from 'tui';
<Imgupload max={1} ref="imgs" server={ImageServer.upload} onChange={this.onImgSelect.bind(this)}/>

###API

参数          描述                      可选值
max           最多可以上传多少个文件      整数值
server        文件上传的接口             Function()
onChange      文件上传成功后的回调函数     Function()