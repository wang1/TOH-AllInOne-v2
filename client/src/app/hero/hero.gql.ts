import gql from 'graphql-tag';


// 我们用graphql-tag库中的gql标签将解析查询字符串为一个Grapqhal查询文档对象
// 请留意gql的语法，有参数和没有参数有不同！！！

export const GQL = {
  getAllHeroes: gql`{
    getAllHeroes {
      id
      no
      name
      salary
      description
      isTop
    }
  }`,

  getTopHeroes: gql`{
    getTopHeroes {
      id
      no
      name
      salary
      description
      isTop
    }
  }`,
  getOneHeroById: gql`
    query getOneHeroById($id: String!) {
      getOneHeroById(id: $id) {
        id
        no
        name
        salary
        description
        isTop
      }
    }
  `,

  getHeroesBySomeStringInName: gql`
    query getHeroesBySomeStringInName($someStringInName: String!) {
      getHeroesBySomeStringInName(someStringInName: $someStringInName) {
        id
        name
      }
    }
  `,
// 请注意，必须使用HeroInput类型，要与后台一致。所以需要额外定义一个HeroInput接口！！！
  addHero: gql`
    mutation addHero($heroInput: HeroInput!) {
      addHero(heroInput: $heroInput) {
        id
      }
    }
  `,

  deleteHeroById: gql`
    mutation deleteHeroById($id: String!) {
      deleteHeroById(id: $id) {
        id
      }
    }
  `,

  updateHero: gql`
    mutation updateHero($heroInput: HeroInput!) {
      updateHero(heroInput: $heroInput) {
        id
      }
    }
  `,
};

