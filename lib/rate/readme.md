###rate
评分组件
###如何使用
                <Rate count={this.state.count} showTxt={true} moveCount={true} value={this.state.value} onChange={this.handleChange.bind(this)}/>
###API
参数          描述                                  可选值
count        总共有多少颗星                          整数数值//必填
showTxt      是否显示这些文字                        boolean//必填 默认为false
Txt          描述文字                               计量词如“分”,"颗","星"
moveCount    是否在鼠标移动的时候动态改变评分值         boolean默认值为false
defaultValue 初始有多少个星星                        整数数值//必填
disabled     是否让次评分组件只读                     boolean默认值为false
onChange     评分改变时的回调                function(value){} value为改变后的评分数