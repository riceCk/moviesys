import { Movie } from "./entities/Movie";
import { validate } from "class-validator";
import { plainToClass } from 'class-transformer'

const m: any = {}
m.name = 1111111
m.type = ["喜剧"]
m.areas = ["中国大陆"]
m.timeLong = 2
// 将plain object 转换 Movie对象
const movie = plainToClass(Movie, m as object)
console.log(movie, 111111)
validate(movie).then(errors => {
  console.log(errors)
})