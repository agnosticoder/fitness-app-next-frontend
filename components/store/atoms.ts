import { atom } from 'jotai';

export const dialogAtom = atom(false);

export const getDialogAtom = atom((get) => get(dialogAtom));

export const setDialogAtom = atom(null, (_get, set, value:boolean) => {
    set(dialogAtom, value);
});
