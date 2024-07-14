'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { Authenticator, ThemeProvider } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { fetchUserAttributes, updateUserAttributes, type UpdateUserAttributesOutput } from 'aws-amplify/auth';

import { IntlShape } from '@formatjs/intl';

import Spinner from '@/components/Spinner';
import Navbar from '@/components/Navbar';
import Content from '@/components/Content';
import Sidebar from '@/components/Sidebar';
import { components, formFields } from '@/components/Cognito';

import { getIntl } from '@/lib/intl';
import { User, Locale } from '@/lib/definitions';
import { authTheme } from '@/lib/styles';
import { InitProps, PageProps, SettingPageProps } from '@/lib/interfaces';
import { defaultUser } from '@/lib/data';

import('@/../amplify_outputs.json').then((outputs) => {
  Amplify.configure(outputs);
});

export default function Page({ params: { lang: locale } }: PageProps) {
  return (
    <main>
      <ThemeProvider theme={authTheme}>
        <Authenticator formFields={formFields} components={components}>
          {({ user }) =>
            user !== undefined ? (
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

function Init({ locale, user }: InitProps) {
  const props = { lang: locale };
  const [intl, setIntl] = useState<IntlShape<string>>();

  useEffect(() => {
    const fetchIntl = async () => {
      const intlData = await getIntl(locale);
      setIntl(intlData);
    };

    fetchIntl();
  }, [locale]);

  return (
    <main>
      <Navbar params={props} />
      <Content>
        <PageContent intl={intl} />
      </Content>
      <Sidebar locale={locale} user={user} />
    </main>
  );
}

function PageContent({ intl }: SettingPageProps) {
  const [formData, setFormData] = useState<User>(defaultUser);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formSuccessMessage, setFormSuccessMessage] = useState('');
  const { authStatus } = useAuthenticator((context) => [context.user]);

  useEffect(() => {
    const fetchSession = async () => {
      const result = await fetchUserAttributes();

      setFormData((prevUser: User) => ({
        ...prevUser,
        given_name: result.given_name || defaultUser.given_name,
        family_name: result.family_name || defaultUser.family_name,
        email: result.email || defaultUser.email,
        nickname: result.nickname || defaultUser.nickname,
        picture: result.picture || defaultUser.picture,
      }));
    };
    fetchSession();
  }, [authStatus]);

  const handleInput = (e: React.ChangeEvent<any>) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };

  const submitForm = (e: React.ChangeEvent<any>) => {
    e.preventDefault();

    const formURL = e.target.action;
    const data = new FormData();

    // Turn our formData state into data we can use with a form submission
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    updateUserAttributes({
      userAttributes: formData,
    })
      .then((response) => {
        setFormSuccess(true);
        setFormSuccessMessage(
          intl ? intl.formatMessage({ id: 'page.settings.form.update-successful' }) : '[successful]'
        );
      })
      .catch((error) => {
        setFormSuccess(true);
        setFormSuccessMessage(intl ? intl.formatMessage({ id: 'page.settings.form.update-error' }) : '[error]');
      });
  };

  return (
    <div>
      <h1 className='max-w-md mx-auto text-3xl text-gray-900 dark:text-white py-4'>
        {intl ? intl.formatMessage({ id: 'page.settings.user-information' }) : '[User information]'}
      </h1>
      {formSuccess ? (
        <div className='max-w-md mx-auto text-xl text-gray-900 dark:text-white py-4'>{formSuccessMessage}</div>
      ) : (
        <div>
          <form className='max-w-md mx-auto' onSubmit={submitForm}>
            <div className='relative z-0 w-full mb-5 group'>
              <input
                type='text'
                name='nickname'
                id='nickname'
                className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                placeholder=' '
                onChange={handleInput}
                value={formData.nickname}
                required
              />
              <label
                htmlFor='nickname'
                className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
              >
                {intl ? intl.formatMessage({ id: 'page.settings.form.nickname' }) : '[Nickname]'}
              </label>
            </div>
            <div className='relative z-0 w-full mb-5 group'>
              <input
                type='email'
                name='email'
                id='email'
                className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                placeholder=' '
                onChange={handleInput}
                value={formData.email}
                required
              />
              <label
                htmlFor='email'
                className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
              >
                {intl ? intl.formatMessage({ id: 'page.settings.form.email' }) : '[Email address]'}
              </label>
            </div>
            <div className='grid md:grid-cols-2 md:gap-6'>
              <div className='relative z-0 w-full mb-5 group'>
                <input
                  type='text'
                  name='given_name'
                  id='given_name'
                  className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                  placeholder=' '
                  onChange={handleInput}
                  value={formData.given_name}
                  required
                />
                <label
                  htmlFor='given_name'
                  className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                >
                  {intl ? intl.formatMessage({ id: 'page.settings.form.given-name' }) : '[First name]'}
                </label>
              </div>
              <div className='relative z-0 w-full mb-5 group'>
                <input
                  type='text'
                  name='family_name'
                  id='family_name'
                  className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                  placeholder=' '
                  onChange={handleInput}
                  value={formData.family_name}
                  required
                />
                <label
                  htmlFor='family_name'
                  className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                >
                  {intl ? intl.formatMessage({ id: 'page.settings.form.family-name' }) : '[Last name]'}
                </label>
              </div>
            </div>
            <button
              type='submit'
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              {intl ? intl.formatMessage({ id: 'page.settings.form.update' }) : '[Update]'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
