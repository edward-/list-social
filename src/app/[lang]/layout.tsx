import { Locale } from '@/lib/definitions';

import { i18n } from '../../../i18n-config';

import '@/app/globals.css';

export const metadata = {
  title: 'ListSocial',
  description:
    'ListSocial is an application where you can publish your tasks on any topic, and the community will help you improve your tasks and support you in achieving success in your projects.',
};

interface Props {
  params: { lang: Locale };
  children: React.ReactNode;
}

export default async function Root({ params, children }: Props) {
  return (
    <html lang={params.lang}>
      <body className='relative min-h-screen overflow-y-auto bg-primary-color-100'>{children}</body>
    </html>
  );
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
