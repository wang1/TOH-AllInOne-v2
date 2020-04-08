// 此input类型主要用于在添加/更新hero时，
// 在service中要传递heroInput变量参数给graphql，必须和后台的类型一致，使用Hero都是不行的！！
export interface HeroInput {
  id?: string;  // 添加英雄时id可以没有
  no: string;
  name: string;
  description?: string;
  salary?: number;
  isTop?: boolean;
}
