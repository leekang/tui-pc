### Modal

弹窗

#### 何时使用

图片资源过大时，做懒加载

#### API

| 参数							| 说明							| 类型					| 默认值|
| -------------			|:-----------------:| -------------:| -----:|
| className					| 类名							|	String				| 无		|
| imgs				| 懒加载的图片源					| Array				| []	|


#### create by 放克

let imgs = [{pre:'http://7xiblh.com1.z0.glb.clouddn.com/progressive/1.jpg',show:'http://7xiblh.com1.z0.glb.clouddn.com/progressive/r1.jpg',className:'first'},{pre:'http://7xiblh.com1.z0.glb.clouddn.com/progressive/2.jpg',show:'http://7xiblh.com1.z0.glb.clouddn.com/progressive/r2.jpg',className:'second'}]

<LazyLoad imgs={imgs} className="home-lazy-imgs"/>

