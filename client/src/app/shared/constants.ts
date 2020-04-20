import { LoneSchemaDefinition } from 'graphql/validation/rules/LoneSchemaDefinition';

export const Constants = {
  URL: 'http://10.1.244.100:3000/graphql',
};

export enum ROLES {
  ADMIN = 'admin',
  TEACHER = 'teacher',
  PUBLIC = 'public',
}

export enum ERROR_TYPE {
  NETWORK_ERR = 'Network error',
  BAD_REQ = 'Bad Request',
  UNAUTHORIZED = 'Unauthorized',
  FORBIDDEN = 'Forbidden',
  OTHERS = 'others',
}

export enum ERROR_MESSAGE {
  NETWORK_ERR = '网络错误，请检查。',
  BAD_REQ = '输入有误，请检查。',
  UNAUTHORIZED = '登录失败，请检查。',
  FORBIDDEN = '没有权限，请检查。',
  OTHERS = '服务器内部错误，请重试或报告。',
  NEED_lOGIN = '请登录。',
}


// 成功启动MongoDB后，再打开一个命令行窗口输入mongo，就可以进行数据库的一些操作。

// 输入help可以看到基本操作命令：
// show dbs:显示数据库列表 
// show collections：显示当前数据库中的集合（类似关系数据库中的表） 
// show users：显示用户
// use <db name>：切换当前数据库，这和MS-SQL里面的意思一样 
// 1、添加
// db.users.save({name: ‘zhangsan’, age: 25, sex: true});