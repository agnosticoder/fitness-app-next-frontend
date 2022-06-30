import { atom } from "jotai";
import { Exercise } from "../hooks/useCreateExercises";

export const confirmDialogAtom = atom(false);
export const messageAtom = atom('');
export const selectedExercisesAtom = atom<Exercise[]>([]);