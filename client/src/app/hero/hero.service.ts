import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GQL } from './hero.gql';
import { of } from 'rxjs';
import { HeroInput } from './hero.input';

@Injectable({
  providedIn: 'root'  // 默认为应用级别的服务（从 Angular 6.0 开始，创建单例服务），可随处注入然后使用
})
export class HeroService {

  constructor(private apollo: Apollo) { }

  // The watchQuery method returns a QueryRef object which has the valueChanges property that is an Observable.
  // 由于apollo.watchQuery的valueChanges属性以及mutate返回的是一个Observable对象(该对象contains loading, error, and data properties),
  //  不能指定其类型, 故此处使用any类型
  // TODO: 在保证类型一致性方面需要再思考

  getAllHeroes() {
    return this.apollo.watchQuery<any>({
      query: GQL.getAllHeroes,
    }).valueChanges;
  }

  getTopHeroes() {
    return this.apollo.watchQuery<any>({
      query: GQL.getTopHeroes,
    }).valueChanges;
  }

  getOneHeroById(id: string) {
    return this.apollo.watchQuery<any>({
      query: GQL.getOneHeroById,
      variables: { id },  // 是{id: id}的简写
    }).valueChanges;
  }

  getHeroesBySomeStringInName(someStringInName: string) {
    // if not search term, return empty data object.非常重要, 否则组件将阻塞???试一试，再写详细点
    if (!someStringInName.trim()) {
      return of({ data: {} });
    }
    return this.apollo.watchQuery<any>({
      query: GQL.getHeroesBySomeStringInName,
      variables: { someStringInName },
    }).valueChanges;
  }

  addHero(heroInput: HeroInput) {
    return this.apollo.mutate<any>({
      mutation: GQL.addHero,
      variables: { heroInput },
      // 添加英雄后,使用refetchQueries执行查询以更新apollo的数据缓存, 保证其它组件显示更新后的英雄
      refetchQueries: [{
        query: GQL.getAllHeroes,
      }],
    });
  }

  deleteHeroById(id: string) {
    return this.apollo.mutate<any>({
      mutation: GQL.deleteHeroById,
      variables: { id },
      refetchQueries: [{
        query: GQL.getAllHeroes,
      }],
    });
  }

  updateHero(heroInput: HeroInput) {
    return this.apollo.mutate<any>({
      mutation: GQL.updateHero,
      variables: { heroInput },
      refetchQueries: [{
        query: GQL.getAllHeroes,
      }],
    });
  }

}
