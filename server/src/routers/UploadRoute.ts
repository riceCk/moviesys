import Express from 'express';
import multer from 'multer';
import path from 'path';
import { ResponseHelper } from './ResponseHelper';
import { receiveMessageOnPort } from 'worker_threads';

const router = Express.Router();

const storage = multer.diskStorage({
  destination: path.resolve(__dirname, '../../public/upload/'),
  filename(req, file, cb) {
    // 文件名是啥
    const time = new Date().getTime()
    const originalFileName = file.originalname
    // 后缀名
    const extname = path.extname(originalFileName);
    // 设置文件的全程
    cb(null, `${time}${extname}`);
  }
})

const allowedExtensions = [".jpg", ".png", ".gif", ".bmp", "jiff"];
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024, // 文件最大5m
  },
  fileFilter(req, file, cb) {
    // 得到文件后缀名
    const ext = path.extname(file.originalname)
    if (allowedExtensions.includes(ext)) {
      cb(null, true)
    } else {
      cb(new Error("文件类型不正确"))
    }
  }
}).single('imgfle')

router.post("/", upload, (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      // 发生错误
      ResponseHelper.sendError(err.message, res)
    } else {
      // 一切都好
      const url = `/upload/${req.file.filename}`
      ResponseHelper.senData(url, res);
    }
  })
})

export default router;