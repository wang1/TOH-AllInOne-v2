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