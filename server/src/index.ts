import 'reflect-metadata';
import { MovieModel } from "./db";

MovieModel.find().then(ms => {
  ms.forEach(m => {
    console.log(m)
  })
})