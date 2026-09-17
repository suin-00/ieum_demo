'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ChatRoomRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/chats');
  }, [router]);

  return null;
}
