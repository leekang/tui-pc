###FileUpload
文件上传
###如何使用
onFileSelect(){
    this.refs.files.getFiles();
}
import {Fileupload} from 'tui';
<Fileupload max={1} ref="files" server={ImageServer.upload} onChange={this.onFileSelect.bind(this)}/>

###API

参数          描述                      可选值
max           最多可以上传多少个文件      整数值
server        文件上传的接口             Function()
onChange      文件上传成功后的回调函数     Function()