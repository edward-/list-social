import { useState, useEffect } from 'react';

import NavbarContent from '@/components/NavbarContent';
import { User } from '@/lib/definitions';
import { PageProps } from '@/lib/interfaces';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { fetchUserAttributes } from 'aws-amplify/auth';

async function getMessages(locale: string) {
  return (await import(`../lang/${locale}.json`)).default;
}

const defaultUser: User = {
  given_name: '',
  family_name: '',
  email: '[non-email@mail.com]',
  nickname: '',
  picture: '/images/default_user.svg',
};

export default function Navbar({ params: { lang: locale } }: PageProps) {
  const [messages, setMessages] = useState({});
  const [user, setUser] = useState(defaultUser);
  const { signOut, authStatus } = useAuthenticator((context) => [context.user]);

  useEffect(() => {
    async function fetchMessages() {
      const messages = await getMessages(locale);
      setMessages(messages);
    }
    fetchMessages();
  }, [locale]);

  useEffect(() => {
    const fetchSession = async () => {
      const result = await fetchUserAttributes();

      setUser((prevUser: User) => ({
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

  return <NavbarContent locale={locale} messages={messages} user={user} action={signOut} />;
}
