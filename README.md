### 启动服务使用teni-cli

## 目录结构

	├── build		打包服务配置脚本目录
	├── demo 例子
	├── lib 组件库
	└── server 启动服务

## 开发规范
	1.每次新建一个组件或者修改一个组件都需要在各自的readme.md中写明日志
	例如：
	v0.0.1 放克 2016-10-21 日历组件init 
	v0.0.2 心璨 2017-01--1 bugfix(原因:...)
	v0.0.3 .......
	（这个大家一定要做好）

	2.组件开发规范
		a.css规范=>
		－所有组件的公共样式，比如字体大小、字体颜色等都在tui/style中统一维护。
		－所有的公共样式值统一在theme.scss中维护，勿冗余
		－若组件需要一些个性化的样式，可以在组件目录下新建一个index.css，所有的命名规则都统一为tui-listView-header的结构，由（tui-组件名-私有命名）组成。
		－当需要修改公共css样式情况下，采用覆盖原则， 切忌不要影响别人的代码。
		－其他的暂时不作说明，后续补充
		例如：
		.tui-listView{
			@include flexbox;
			@include flex-direction(column);
			height:100%;
			&>div{
				@include flex-direction(column);
			}
		}
		.tui-listView-body{
			@include flex-grow(1);
			position:relative;
			overflow:auto;
		}
		b.jsx规范=>
		－开发过程中尽量使用es6，请勿写出很长很粗的代码块，能用一行代码实现的绝不用n行代码实现
		－代码注重质量，切勿写出完全没有注释、可读性极低、维护成本高和漏洞多的组件
		－其他的暂时不作说明，后续补充
