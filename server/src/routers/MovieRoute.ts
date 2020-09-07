import Express from 'express';
import { MovieModel } from '../db';
import { MovieService } from '../services/MovieService';
import { resolveNaptr } from 'dns';
import { ResponseHelper } from './ResponseHelper';
import { SearchCondition } from "../services/SearchCondition";

const router = Express.Router()
router.get('/:id', async (req, res) => {
  try {
    const movieId = req.params.id
    const movie = await MovieService.findById(movieId)
    // 响应：服务器的接口的响应格式，往往是一种标准格式
    ResponseHelper.senData(movie, res)
  } catch (error) {
    ResponseHelper.senData(null, res)
  }
})

router.get("/", async (req, res) => {
  // const result = await MovieService.find(req.query);
  // ResponseHelper.sendPageData(result, res)
})

router.post('/', async (req, res) => {
  const result =  await MovieService.add(req.body)
  if (Array.isArray(result)) {
    ResponseHelper.sendError(result, res);
  }
  else {
    ResponseHelper.senData(result, res)
  }
})

router.put('/:id', async (req, res) => {
  try {
    const result = await MovieService.edit(req.params.id, req.body)
    if (result.length > 0) {
      ResponseHelper.sendError(result, res);
    } else {
      ResponseHelper.senData(true, res);
    }
  } catch (error) {
    ResponseHelper.sendError("id错误", res);
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await MovieService.delete(req.params.id);
    ResponseHelper.senData(true, res);
  } catch (error) {
    ResponseHelper.sendError("id错误", res);
  }
})

export default router