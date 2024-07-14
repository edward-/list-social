import { AuthUser } from 'aws-amplify/auth';
import { Locale, TodoList } from '@/lib/definitions';
import { IntlShape } from '@formatjs/intl';

type FetchTodoList = () => void;

export interface PageProps {
  params: {
    lang: Locale;
  };
}

export interface InitProps {
  locale: Locale;
  user: AuthUser;
}

export interface PageContentProps {
  locale: Locale;
  user: AuthUser;
}

export interface SettingPageProps {
  intl?: IntlShape<string>;
}

export interface SidebarProps {
  locale: Locale;
  user: AuthUser;
}

export interface ReactProps {
  children: React.ReactNode;
}

export interface DataProps {
  children: React.ReactNode;
  locale: Locale;
  todoList: TodoList;
}

export interface CreateProps {
  intl?: IntlShape<string>;
  user: AuthUser;
}

export interface ViewProps {
  intl?: IntlShape<string>;
  todoList: TodoList;
  closeDetails: any;
}

export interface UpdateProps {
  intl?: IntlShape<string>;
  todoListId: string;
  closeDetails: any;
}
