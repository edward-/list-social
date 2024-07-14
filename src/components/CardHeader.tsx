'use client';

import { ReactProps } from '@/lib/interfaces';

export default function CardHeader({ children }: ReactProps) {
  return <h5 className='my-2 text-xl font-medium tracking-tight text-gray-800'>{children}</h5>;
}
