### pdf使用说明
基于pdfjs-dist@2.0.489  版本

npm install pdfjs-dist@2.0.489

##### 属性
名字         | 必输    |	类型  |	默认值 |	说明
------------|---------|---------|-------|------
pdfUrl      |  true   | string  |       | 传入pdf的地址url|
pdfWidth    |  true   | number  |       | 显示pdf内容的宽
pdfHeight   |  true   | number  |       | 显示pdf内容的高
pdfTitle    |  false  | string  |       | pdf头部标题
isNeedButton|  false  | boolean | false | 是否需要按钮
isCountDown |  false  | boolean | false | 当isNeedButton为true生效,是否需要倒计时
countDown   |  false  | number  |   30  | 倒计事件(秒)

##### 事件
名字         | 事件说明  |	  	备注
------------|----------|-----------------
on-click    |  click   | 点击按钮,返回值
caseError   |  error   | 接口请求失败/渲染出错返回错误信息
