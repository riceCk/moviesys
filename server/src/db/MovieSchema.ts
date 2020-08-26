import Mongoose from 'mongoose';
import { Movie } from '../entities/Movie';

interface IMove extends Movie, Mongoose.Document {}

const movieSchema = new Mongoose.Schema<IMove>({
  name: String,
  types: [String],
  areas: [String],
  timeLong: Number,
  isHot: Boolean,
  isComing: Boolean,
  isClassic: Boolean,
  description: String,
  poster: String
}, {
  versionKey: false
})

export default Mongoose.model<IMove>("Movie", movieSchema)