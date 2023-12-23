import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const isReturnToken = atom(false);
export const playerName = atomWithStorage('name', undefined);
