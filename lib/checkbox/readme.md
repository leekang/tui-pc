Checkbox参数
name  类似原生name  String （在CheckboxGroup下非必须）
value 类似原生value  String （必须项）
style 扩展样式 Object （可选项）
defaultChecked  默认是否选中 Boolean （可选项）CheckboxGroup下不可用 

CheckboxGroup参数（多选框组合，用于包裹一组Checkbox）
onChange(values,checkedList)  选项变化时的回调函数  Function(values:当前选中的value数组   checkedList:当前选中的React对象数组)（可选项）
defaultValue  用于设置当前选中的值   String[]  （可选项）
name  用于设置CheckboxGroup组内的所有Checkbox的name属性，使其在同一个组（必须项）

getName() 获取name值
getValue() 获取value值
getInfo() 获取name和value组成的对象
setName() 设置name值（仅Checkbox有效 CheckbixGroup无效）
