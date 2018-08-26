import Button from 'demo/button';
import Carousel from 'demo/carousel';
import Hammer from 'demo/hammer';
import Layout from 'demo/layout';
import Loading from 'demo/loading';
import Modal from 'demo/modal';
import Notification from 'demo/notification';
import Switch from 'demo/switch';
import Tabs from 'demo/tabs';
import Form from 'demo/form';
import Pagination from 'demo/pagination';
import Select from 'demo/select';
import Rate from 'demo/rate';
import Splitter from 'demo/splitter';
import MultiSelect from 'demo/multiSelect';
import FileUpload from 'demo/fileUpload';
import ImgUpload from 'demo/imgUpload';
import Qrcode from 'demo/qrcode'
import LazyLoad from 'demo/lazyLoad'
import RangePicker from 'demo/rangePicker'
import Dropdown from 'demo/dropdown'
import Newselect from 'demo/newSelect'
import Dateselect from 'demo/dateselect';
import Tooltip from 'demo/tooltip';
import GroupTitle from 'demo/groupTitle';
import TreeSelect from 'demo/treeSelect';

export default {
	list:[
		{
			url:"button",
			component:Button,
			name:"按钮"
		},
		{
			url:"carousel",
			component:Carousel,
			name:"旋转木马"
		},
		{
			url:"hammer",
			component:Hammer,
			name:"手势"
		},
		{
			url:"layout",
			component:Layout,
			name:"布局"
		},
		{
			url:"loading",
			component:Loading,
			name:"菊花"
		},
		{
			url:"modal",
			component:Modal,
			name:"弹窗"
		},
		{
			url:"notification",
			component:Notification,
			name:"通知"
		},
		{
			url:"switch",
			component:Switch,
			name:"切换按钮"
		},
		{
			url:"tabs",
			component:Tabs,
			name:"页签"
		},
		{
			url:"form",
			component:Form,
			name:"表单"
		},{
			url:"select",
			component:Select,
			name:"单选下拉"
		},{
			url:"rate",
			component:Rate,
			name:"评分"
		},{
			url:"splitter",
			component:Splitter,
			name:"分割线"
		},{
			url:"multiSelect",
			component:MultiSelect,
			name:"多选下拉"
		},{
			url:"fileUpload",
			component:FileUpload,
			name:"文件上传"
		},{
			url:"imgUpload",
			component:ImgUpload,
			name:"图片上传"
		},{
			url:"qrcode",
			component:Qrcode,
			name:"二维码生成器"
		},{
			url:"lazyLoad",
			component:LazyLoad,
			name:"懒加载"
		},{
			url:"rangePicker",
			component:RangePicker,
			name:"时间区间选择"
		},{
			url:"dropdown",
			component:Dropdown,
			name:"下拉菜单"
		},{
			url:"newSelect",
			component:Newselect,
			name:"多选下拉"
		},{
			url:"dateselect",
			component:Dateselect,
			name:"日期选择"
		},{
			url:"pagination",
			component:Pagination,
			name:"分页"
		},{
			url:"tooltip",
			component:Tooltip,
			name:"Tooltip"
		},{
			url:"groupTitle",
			component:GroupTitle,
			name:"头部"
		},{
			url:"treeSelect",
			component:TreeSelect,
			name:"树选择"
		}
	]
}
