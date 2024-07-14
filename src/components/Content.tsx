'use client';

import { ReactProps } from '@/lib/interfaces';

export default function Content({ children }: ReactProps) {
  return <div className='w-full lg:w-[calc(100%-15rem)] p-5 lg:p-10 float-right'>{children}</div>;
}
