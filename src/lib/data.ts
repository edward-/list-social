import { TodoList, User } from '@/lib/definitions';

export const defaultTodoList: TodoList = {
  name: '',
  items: [],
  comments: 0,
  isDone: false,
  deadLine: '',
  updatedAt: new Date(),
};

export const defaultUser: User = {
  given_name: '',
  family_name: '',
  email: '[non-email@mail.com]',
  nickname: '',
  picture: '/images/default_user.svg',
};
