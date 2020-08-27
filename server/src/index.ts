import 'reflect-metadata';
import { MovieService } from './services/MovieService';
import { MovieModel } from './db';
import { Movie } from './entities/Movie';

const condi: any = {
  page: 10,
  limit: 5,
  key: ''
}
MovieService.find(condi).then(result => {
  if (result.errors.length > 0) {
    console.log(result.errors)
  } else {
    result.data.forEach(item => console.log(item.name))
    console.log(result.count)
  }
})

// function getRandom(min: number, max: number) {
//   const dec = max - min;
//   return Math.floor(Math.random() * dec + min);
// }

// for (let i = 0; i < 100; i++) {
//   const m = new Movie()
//   m.name = '电影' + (i + 1);
//   m.areas = ['中国大陆', '美国']
//   m.type = ["喜剧", "动作"]
//   m.isClassic = true;
//   m.timeLong = getRandom(70, 240);
//   MovieService.add(m);
// }