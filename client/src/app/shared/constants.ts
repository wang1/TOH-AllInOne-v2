export const Constants = {
  URL: 'http://localhost:3000/graphql',
};

export enum ROLES {
  ADMIN = 'admin',
  TEACHER = 'teacher',
  STUDENT = 'student',
}

export enum ERROR_TYPE {
  NETWORK_ERR = 'Network error',
  BAD_REQ = 'Bad Request',
  UNAUTHORIZED = 'Unauthorized',
  FORBIDDEN = 'Forbidden',
  OTHER = 'other',
}

export enum ERROR_MESSAGE {
  NETWORK_ERR = '网络错误，请检查。',
  BAD_REQ = '输入有误，请检查。',
  UNAUTHORIZED = '登录失败，请检查。',
  FORBIDDEN = '没有权限，请检查。',
  OTHER = '服务器内部错误，请重试或报告。',
}
