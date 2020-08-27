export interface ISearchResult<T> {
  count: number, // 查询的总数
  data: T[], // 查询的数据
  errors: string[] // 查询的错误
}