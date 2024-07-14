import { i18n } from './../../i18n-config';

export type User = {
  given_name: string;
  family_name: string;
  email: string;
  nickname: string;
  picture: string;
};

export enum Status {
  DONE = 1,
  INPROGRESS = 2,
  HOLDON = 3,
  CANCELLED = 4,
}

export interface TodoList {
  id?: string;
  name: string;
  items: Item[];
  comments?: number;
  isDone: boolean;
  deadLine?: string;
  updatedAt: Date;
}

export interface Item {
  name: string;
  order: number;
  status: Status;
  subListId?: string;
}

export type Locale = (typeof i18n)['locales'][number];
