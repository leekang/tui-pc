Radio参数
name  类似原生name  String （在RadioGroup下非必须）
value 类似原生value  String （必须项）
style 扩展样式 Object （可选项）
defaultChecked  默认是否选中 Boolean （可选项）

RadioGroup参数（单选框组合，用于包裹一组Radio）
onChange(e,dom)  选项变化时的回调函数   Function(e:Event   dom:当前选中的Dom对象) （可选项）
value  用于设置当前选中的值   any  （可选项）
name  用于设置RadioGroup组内的所有Radio的name属性，使其在同一个组（必须项）

getName() 获取name值
getValue() 获取value值
getInfo() 获取name和value组成的对象
setName() 设置name值（仅Radio有效 RadioGroup无效）
