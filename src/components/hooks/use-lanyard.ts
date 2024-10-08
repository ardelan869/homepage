import { useContext } from 'react';
import { LanyardContext } from '@/components/lanyard';

export default function useLanyardSocket() {
  if (!LanyardContext) {
    throw new Error('useLanyardSocket must be used within a LanyardProvider');
  }

  return useContext(LanyardContext);
}
