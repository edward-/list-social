'use client';

import { ReactProps } from '@/lib/interfaces';

export default function CardBody({ children }: ReactProps) {
  return <div className='mt-5'>{children}</div>;
}
