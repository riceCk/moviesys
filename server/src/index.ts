import 'reflect-metadata';
import Express from 'express';
import MovieRouter from './routers/MovieRoute';

const app = Express()

app.use("/api/movie", MovieRouter)

app.listen(3000, () => {
  console.log('开启服务器')
})