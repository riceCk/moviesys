import 'reflect-metadata';
import Express from 'express';
import MovieRouter from './routers/MovieRoute';
import UploadRouter from './routers/UploadRoute';

const app = Express()

// 定义静态文件访问中间件
app.use('/upload', Express.static("public/upload"))

app.use(Express.json()); // 配置中间件，用于解析请求消息体的

// 使用postame进行测试
app.use("/api/movie", MovieRouter)
// 文件上传
// 通常情况下，服务器会提供一个统一的api接口，用于处理上传文件

app.use('/api/upload', UploadRouter);

app.listen(3000, () => {
  console.log('开启服务器')
})