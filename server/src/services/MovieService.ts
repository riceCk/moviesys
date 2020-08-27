import { Movie } from "../entities/Movie";
import { IMove } from "../db/MovieSchema";
import { MovieModel } from "../db";
import { SearchCondition } from "./SearchCondition";
import { ISearchResult } from "./CommonTypes";



export class MovieService {
  /**
   * 添加电影数据
   * @param movie 电影详情
   */
  public static async add (movie: Movie): Promise<IMove | string[]> {
    // 1.转换类型
    movie = Movie.transform(movie)
    // 2.数据验证
    const errors = await movie.validateThis()
    if (errors.length > 0) {
      return errors
    }
    // 3.添加到数据库\
   return await MovieModel.create(movie)
  }
  /**
   * 修改数据库数据
   * @param id 数据id
   * @param movie 电影详情
   */
  public static async edit (id: string, movie: Movie): Promise<string[]> {
    // 1.转换类型
    const movieObj = Movie.transform(movie)
    // 2.数据验证
    const errors = await movieObj.validateThis(true)
    if (errors.length > 0) {
      return errors
    }
    await MovieModel.updateOne({_id: id}, movie)
    return errors
  }
  /**
   * 删除指定id
   * @param id
   */
  public static async delete(id: string): Promise<void> {
    await MovieModel.deleteOne({_id: id})
  }
  /**
   * 查找指定电影
   * @param id
   */
  public static async findById(id: string): Promise<IMove | null> {
    return await MovieModel.findById(id)
  }
  /**
   * 查询电脑
   * 查找条件
   * @param condition page limit size
   */
  public static async find(condition: SearchCondition): Promise<ISearchResult<IMove>> {
    // 1.转换类型
    const condObj = SearchCondition.transform(condition)
    // 2.数据验证
    const errors = await condObj.validateThis(true)
    if (errors.length > 0) {
      return {
        count: 0,
        data: [],
        errors
      }
    }
    // 3.查询
    const movies = await MovieModel.find({
      name: {$regex: new RegExp(condObj.key)}
    }).skip((condObj.page - 1) * condObj.limit).limit(condObj.limit);
    const count = await MovieModel.find({
      name: {$regex: new RegExp(condObj.key)}
    }).countDocuments()
    return {
      count,
      data: movies,
      errors: []
    }
  }
}