import type { Schema } from '@/../amplify/data/resource';
import { Item, TodoList } from '@/lib/definitions';

export const transformTodos = (todos: Array<Schema['Todo']['type']>) => {
  return todos.map((todo) => transformTodo(todo)).sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
};

export const transformTodo = (todo: Schema['Todo']['type']) => {
  let items: Array<Item> = JSON.parse(String(todo.list ?? '[]'));
  items.sort((a, b) => a.order - b.order);

  const newTodoList: TodoList = {
    id: todo.id,
    name: todo.name || '',
    comments: todo.comments.length,
    isDone: todo.isDone || false,
    deadLine: todo.deadLine ? new Date(todo.deadLine).toISOString().substring(0, 19) : '',
    items: items,
    updatedAt: new Date(todo.updatedAt),
  };

  return newTodoList;
};
