# 电影管理系统
服务器端：提供API接口
客户端：ajax请求接口获取数据，使用数据渲染页面

服务器端：TS + express + mongodb + class-validator + class-transformer

客户端：Ts + react全家桶（react-router、redux、antd）

# 开发顺序：
1.服务器端
使用postman
2.客户端
> tslint: 跟eslint相似，是用于检查代码风格

## 文件上传
1.通常情况下，服务器会提供一个统一的api接口，用于处理上传的文件

2.客户端会使用post请求，请求服务器

content-type: multipart/form-data

3.服务器如何得到上传的文件

使用express的中间件：multer

问题：['解决']('./server/src/routers/UploadRoute.ts')
- 如何设置上传的后缀名（根据胡库的的文件后缀名决定）
- 如何限制文件的上传尺寸
- 如何限制文件的后缀名
- 当发生错误时，如何响应给客户端；正确时，如何响应；

正确：响应文件的路径
错误：响应错误消息