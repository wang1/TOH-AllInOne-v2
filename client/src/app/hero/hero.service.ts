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
  // 另外，watchQuery()执行后，如果返回的数据有变化，将自动更新缓存

  getAllHeroes() {
    return this.apollo.watchQuery<any>({
      query: GQL.getAllHeroes,
    }).valueChanges;
  }

  getTopHeroes() {
    console.log("top")
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
    // if not search term, return empty data object.
    // 非常重要, 否则当搜索为空时（如输入了个字母s，然后又将其删除）将得到所有hero名称
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
      // 此处使用了乐观响应，即在获得服务器响应前更新给组件一个响应，以加快用户体验
      // __typename及id用来保证唯一性
      // 需注意 optimisticResponse 裡面的每一層都要加上 __typename 並且一定要回傳物件的 id ，
      // 這樣 Apollo Clietn 才可以依照 type 及 id 來動態更新快取。
      // 当新增的数据从服务器返回时，因为id和typename在cache中不存在，apollo无法自动更新cache
      // 所以需要手动使用update方法更新cache，该方法在乐观响应时更新一次，服务器返回结果后又执行一次
      // 没有使用refetchQueries
      optimisticResponse: {
        __typename: 'Mutation',
        addHero: {
          __typename: 'Hero',
          id: '', // 因当前没有生成id，写一个空的id，否则控制台有警告
          ...heroInput,
        }
      },
      update: (store, { data: { addHero } }) => {
        // readQury()只从我们的缓存中读取所有英雄数据。
        const data = store.readQuery({ query: GQL.getAllHeroes });
        // 将我们突变的评论添加到最后。
        // 注意getAllHeroes必须与gql中的一致
        // data.getAllHeroes.push(addHero);
        // 将我们的数据写回缓存。
        store.writeQuery({ query: GQL.getAllHeroes, data });
      },
      // // 添加英雄后,使用refetchQueries执行查询以更新apollo的数据缓存, 保证其它组件显示更新后的英雄
      // refetchQueries: [{
      //   query: GQL.getAllHeroes,
      // }],
    });
  }

  deleteHeroById(id: string) {
    return this.apollo.mutate<any>({
      mutation: GQL.deleteHeroById,
      variables: { id },
      optimisticResponse: {
        __typename: 'Mutation',
        deleteHeroById: {
          __typename: 'Hero',
          id,
        }
      },
      update: (store, { data: deleteHeroById }) => {

        const data = store.readQuery({ query: GQL.getAllHeroes });
        // data.getAllHeroes = data.getAllHeroes.filter(hero => hero.id !== id);
        store.writeQuery({ query: GQL.getAllHeroes, data });
      },
      // refetchQueries: [{
      //   query: GQL.getAllHeroes,
      // }],
    });
  }

  updateHero(heroInput: HeroInput) {
    return this.apollo.mutate<any>({
      mutation: GQL.updateHero,
      variables: { heroInput },
      // 此处使用了乐观响应，即在获得服务器响应前更新给组件一个响应，以加快用户体验，
      // 同时能保证如果导航到其它组件时显示的数据不是陈旧的，因为此时服务器可能还没响应
      // __typename及id用来保证cache的唯一性
      // 当更新后的数据从服务器返回时，因为id和typename与cache中一致，apollo自动更新cache并影响UI
      // 没有使用refetchQueries
      optimisticResponse: {
        __typename: 'Mutation',
        updateHero: {
          __typename: 'Hero',
          ...heroInput,
        }
      },
      // refetchQueries: [{
      //   query: GQL.getAllHeroes,
      // }],
    });
  }

}
