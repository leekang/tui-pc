###Notification
消息通知
###如何使用
Notification.config({
    message:'再一次使用方法，方式。',
    direction:'right',
    duration:5000,
    title:'标题',
    icon:'error'
})
###API
参数             描述                   可选值
message         消息的主题内容           文本/必填
direction       消息弹出框的渐入方式      right,left,top,bottom,默认为scale
duration        消息弹出框的持续时间      毫秒数,默认为3000
title           消息弹出框的标题          文本/不必填
icon            图标的形式和颜色          error,info,warning,success./必选其一


