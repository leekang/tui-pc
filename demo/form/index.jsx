import React, { Component } from 'react';
import {Form,Input,Button,Radio,Checkbox,Switch,InputNumber,Select,DatePicker,TimePicker,Fileupload} from 'tui';
import ImageServer from 'server/image';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;

export default class FormDemo extends Component {
	onSubmit(e,data){
		console.log(e,data)
	}
	info(){
		console.log(this.refs.form.getInfo())
	}
	radioGroupChange(e,dom){
		console.log(e.target.value)
		console.log(dom)
	}
	radioChange(e){
		console.log(e.target.value)
	}
	checkboxGroupChange(values,checkedList){
		console.log(values)
		console.log(checkedList)
	}
	checkboxChange(e){
		console.log(e.target.checked)
	}
	numberChange(value){
		console.log(value)
	}
	dateChange(date,dateString){
		console.log(dateString)
	}
	timeChange(time,timeString){
		console.log(timeString)
	}
	onFileSelect(){
	}
	render(){
		const blockStyle = {
			display: 'block'
		}
		return (
			<div style={{width:500}} className="block-center" >
				<div className="bg-white p">
					<Form onSubmit={this.onSubmit.bind(this)} ref="form">
						<FormItem label="字段1" labelSpan={4} wrapperSpan={18} required>
							<Input type="text" name="a" ref="a" maxLength={100} readOnly={true} disabled={false} placeholder="单行文本" defaultValue="input默认值"/>
						</FormItem>
						<FormItem label="字段2" labelSpan={4} wrapperSpan={18}>
							<Input type="textarea" rows={3} name="b" ref="b" maxLength={200} readOnly={true} disabled={false} placeholder="多行文本" defaultValue="textarea默认值"/>
						</FormItem>
						<FormItem label='字段3' labelSpan={4} wrapperSpan={18}>
							<RadioGroup name="sex" defaultValue="no" disabled={true} onChange={this.radioGroupChange.bind(this)}>
								<Radio value="male" type="image" title="男男男男男男" >
									<img src="http://s2.mogucdn.com/p1/160614/1_ie4weyjxgy3gmnjshezdambqgqyde_640x640.jpg_100x100.jpg" />		
								</Radio>
								<Radio value="female" type="image" title="女女女女女女" >
									<img src="http://s2.mogucdn.com/p1/160614/1_ie4weyjxgy3gmnjshezdambqgqyde_640x640.jpg_100x100.jpg" />		
								</Radio>
								<Radio value="no">未知</Radio>
							</RadioGroup>
						</FormItem>
						<FormItem label='字段4' labelSpan={4} wrapperSpan={18}>
							<Radio name="like" value="yes" onChange={this.radioChange.bind(this)}>喜欢</Radio>
						</FormItem>
						<FormItem label='字段5' labelSpan={4} wrapperSpan={18}>
							<CheckboxGroup name="fruit" defaultValue={['apple','orange']} onChange={this.checkboxGroupChange.bind(this)}>
								<Checkbox value="apple">苹果</Checkbox>
								<Checkbox value="banner">香蕉</Checkbox>
								<Checkbox style={blockStyle} value="orange">橘子</Checkbox>
							</CheckboxGroup>
						</FormItem>
						<FormItem label='选择框' labelSpan={4} wrapperSpan={18}>
							<Select 
								style={{width:200}}
								showSearch
								defaultValue="aa">
									<Option value="aa">aa</Option>
									<Option value="ceshi">aa</Option>
							</Select>
						</FormItem>
						<FormItem label='字段6' labelSpan={4} wrapperSpan={18}>
							<Checkbox name="apple" value="apple" type="image" title="苹果" defaultChecked={true} onChange={this.checkboxChange.bind(this)}>
								<img src="http://s2.mogucdn.com/p1/160614/1_ie4weyjxgy3gmnjshezdambqgqyde_640x640.jpg_100x100.jpg" />		
							</Checkbox>
						</FormItem>
						<FormItem label="字段7" labelSpan={4} wrapperSpan={18}>
							<Switch name="c"/>
						</FormItem>
						<FormItem label="字段8" labelSpan={4} wrapperSpan={18}>
							<InputNumber name="count"  min={1} max={10} defaultValue={3} disabled={true} onChange={this.numberChange.bind(this)}/>
						</FormItem>
						<FormItem label="字段9" labelSpan={4} wrapperSpan={18}>
							<DatePicker name="date" showTime={true} onChange={this.dateChange.bind(this)}/>
						</FormItem>
						<FormItem label="字段10" labelSpan={4} wrapperSpan={18}>
							<TimePicker name="time" disabled={true} format="HH:mm:ss" onChange={this.timeChange.bind(this)}/>
						</FormItem>
						<FormItem label="文件上传" labelSpan={4} wrapperSpan={18}>
							<Fileupload max={5} ref="files" server={ImageServer.upload} onChange={this.onFileSelect.bind(this)}/>
						</FormItem>
						<FormItem labelSpan={4} wrapperSpan={20}>
							<Button type="primary" >提交</Button>
							<Button className="m-l" htmlType="reset">重置</Button>
							<Button className="m-l" htmlType="button" onClick={this.info.bind(this)}>信息</Button>
						</FormItem>
					</Form>
				</div>
			</div>
		)
	}
}

