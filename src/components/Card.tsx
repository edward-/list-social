'use client';

import { ReactProps } from '@/lib/interfaces';

export default function Card({ children }: ReactProps) {
  return <div className='bg-white p-5 border border-gray-200 rounded-lg shadow'>{children}</div>;
}
