'use client';

import { DISCORD_USER_ID } from '@/config/constants';
import { createContext } from 'react';

import { type LanyardWebsocket, useLanyard } from 'react-use-lanyard';

export const LanyardContext = createContext<LanyardWebsocket>({
  loading: true
});

export default function LanyardProvider({ children }: React.PropsWithChildren) {
  const lanyard = useLanyard({
    userId: DISCORD_USER_ID,
    socket: true
  });

  return (
    <LanyardContext.Provider value={lanyard}>
      {children}
    </LanyardContext.Provider>
  );
}
