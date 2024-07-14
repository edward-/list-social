'use client';

import SidebarLink from '@/components/SidebarLink';
import Link from 'next/link';
import { SidebarProps } from '@/lib/interfaces';
import { Image } from '@aws-amplify/ui-react';
import { getIntl } from '@/lib/intl';
import CreateList from './CreateList';

export default async function Sidebar({ locale, user }: SidebarProps) {
  const intl = await getIntl(locale);
  return (
    <div className='fixed top-0 left-0 z-50 w-60 h-screen bg-gray-800 hidden lg:block'>
      <div className='flex items-center justify-start h-16 w-[calc(100%-2rem)] mx-4'>
        <Link href={`/${locale}/home`} style={{ borderRadius: '50%', overflow: 'hidden', width: 40, height: 40 }}>
          <Image alt='List Social' src='/images/ls_white.png' width={40} />
        </Link>
        <div className='text-xl text-gray-200 p-2'>ListSocial</div>
      </div>

      <hr className='h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25' />

      <div className='h-[calc(100vh-65px)] overflow-y-auto'>
        <SidebarLink href={`/${locale}/home`}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
            />
          </svg>

          <div className='mx-4'>{intl ? intl.formatMessage({ id: 'common.navigation.home' }) : '[ToDo List]'}</div>
        </SidebarLink>

        <SidebarLink href={`/${locale}/community`}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z'
            />
          </svg>

          <div className='mx-4'>{intl ? intl.formatMessage({ id: 'common.navigation.community' }) : '[ToDo List]'}</div>
        </SidebarLink>

        <CreateList intl={intl} user={user} />
      </div>
    </div>
  );
}
