'use client';

import React, { Suspense, useState, useEffect, useCallback } from 'react';
import { Authenticator, ThemeProvider } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import type { Schema } from '@/../amplify/data/resource';
import type { SelectionSet } from 'aws-amplify/data';
import { generateClient } from 'aws-amplify/data';

import { IntlShape } from '@formatjs/intl';

import Card from '@/components/Card';
import CardHeader from '@/components/CardHeader';
import CardBody from '@/components/CardBody';
import Spinner from '@/components/Spinner';
import Navbar from '@/components/Navbar';
import Content from '@/components/Content';
import Sidebar from '@/components/Sidebar';
import { components, formFields } from '@/components/Cognito';
import ViewList from '@/components/ViewList';

import { getIntl } from '@/lib/intl';
import { TodoList } from '@/lib/definitions';
import { getStatus } from '@/lib/utils';
import { authTheme } from '@/lib/styles';
import { PageProps, PageContentProps } from '@/lib/interfaces';
import { transformTodos } from '@/lib/transform';

import('@/../amplify_outputs.json').then((outputs) => {
  Amplify.configure(outputs);
});

const client = generateClient<Schema>({
  authMode: 'userPool',
});

export default function Page({ params: { lang: locale } }: PageProps) {
  return (
    <main>
      <ThemeProvider theme={authTheme}>
        <Authenticator formFields={formFields} components={components}>
          {({ user }) =>
            user ? (
              <Suspense fallback={<Spinner />}>
                <Init locale={locale} user={user} />
              </Suspense>
            ) : (
              <></>
            )
          }
        </Authenticator>
      </ThemeProvider>
    </main>
  );
}

function Init({ locale, user }: PageContentProps) {
  return (
    <main>
      <Navbar params={{ lang: locale }} />
      <Content>
        <PageContent locale={locale} user={user} />
      </Content>
      <Sidebar locale={locale} user={user} />
    </main>
  );
}

function PageContent({ locale, user }: PageContentProps) {
  const [todoList, setTodoList] = useState<Array<TodoList>>([]);
  const [intl, setIntl] = useState<IntlShape<string>>();
  const [viewModal, setViewModal] = useState(false);

  useEffect(() => {
    const fetchIntl = async () => {
      const intlData = await getIntl(locale);
      setIntl(intlData);
    };
    fetchIntl();
  }, [locale]);

  const transformTodosToTodoList = useCallback((todos: Array<Schema['Todo']['type']>) => {
    return transformTodos(todos);
  }, []);

  const fetchTodos = useCallback(() => {
    const getTodos = async () => {
      // const selectionSet = ['id', 'name', 'owner'] as const;
      // const sub = await client.models.Todo.observeQuery({ selectionSet: ['id', 'name', 'owner'] }).subscribe(
      //   ({ items }) => {
      //     console.log('After Adding New Item', items);
      //   }
      // );
      // return () => sub.unsubscribe();

      const { data: todos, errors } = await client.models.Todo.list({
        limit: 20,
      });

      setTodoList(transformTodosToTodoList(todos));
    };
    getTodos();
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const closeViewModel = useCallback(() => {
    setViewModal(false);
  }, []);

  useEffect(() => {
    const sub = client.models.Todo.onCreate().subscribe({
      next: (data) => {
        setTodoList([...todoList, ...transformTodosToTodoList([data])]);
      },
    });

    return () => sub.unsubscribe();
  }, [todoList]);

  return (
    <div className='grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
      {todoList.map((list) => (
        <div key={list.name}>
          <div>
            <Card>
              <div onClick={() => setViewModal(true)}>
                <CardHeader>{list.name}</CardHeader>
                <CardBody>
                  {list.items.map((item) => (
                    <div key={item.name} className='flex items-center flex-nowrap mt-3'>
                      <div>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={getStatus(item.status)}
                          alt='Status image'
                          width={50}
                          height={50}
                          className='rounded-full p-1'
                        />
                      </div>
                      <div className='mx-3'>
                        <p className='text-base'>{item.name}</p>
                        {/* <p className="text-sm text-gray-500 line-clamp-1">{item.detail}</p> */}
                      </div>
                    </div>
                  ))}
                </CardBody>
                <div className='flex justify-end'>
                  <div className='text-base text-gray-400'>
                    {intl ? intl.formatMessage({ id: 'page.home.comments' }) : '[Comments]'}: {list.comments}
                  </div>
                </div>
              </div>
            </Card>
          </div>
          {viewModal ? <ViewList intl={intl} todoList={list} closeDetails={closeViewModel} /> : <></>}
        </div>
      ))}
    </div>
  );
}
