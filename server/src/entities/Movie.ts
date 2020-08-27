import { IsNotEmpty, ArrayMinSize, IsInt, Min, Max, validate } from 'class-validator';
import { Type, plainToClass } from 'class-transformer'
import { BaseEntity } from '../services/BaseEntity';

export class Movie extends BaseEntity {
  @IsNotEmpty({message: '电影名称不可以为空'})
  @Type(() => String)
  public name: string;

  @IsNotEmpty({message: '电影类型不可以为空'})
  @ArrayMinSize(1, {message: '电影类型至少有一个'})
  @Type(() => Array)
  public type: string[]

  @IsNotEmpty({message: '上映地区不可以为空'})
  @ArrayMinSize(1, {message: '上映地区至少有一个'})
  @Type(() => Array)
  public areas: string[]

  @IsNotEmpty({message: '时长不可以为空'})
  @IsInt({message: "时长必须是整数"})
  @Min(1, {message: '时长最小1分钟'})
  @Max(9999, {message: '时长过长'})
  @Type(() => Number)
  public timeLong: number

  @IsNotEmpty({message: '是否热映不可以为空'})
  @Type(() => Boolean)
  public isHot: boolean = false;

  @IsNotEmpty({message: '是否即将上映不可以为空'})
  @Type(() => Boolean)
  public isComing: boolean = false;

  @IsNotEmpty({message: '是否是经典影片不可以为空'})
  @Type(() => Boolean)
  public isClassic: boolean = false;

  // 简介
  @Type(() => String)
  public description?: string
  // 海报图
  @Type(() => String)
  public poster?: string

  /**
   * 将一个平面对象转换为movie类的对象
   * @param plainObject 平面对象或者moview对象
   */
  public static transform(plainObject: object): Movie {
    return super.baseTransform(Movie, plainObject )
  }
}