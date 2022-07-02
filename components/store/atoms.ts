import { atom } from "jotai";

export const confirmDialogAtom = atom(false);
export const messageAtom = atom('');

type Exercise = {id: string, name: string} | null;

export const selectedExercisesAtom = atom<Exercise[]>([]);

export const getSelectedExercisesAtom = atom((get) => get(selectedExercisesAtom));

export const setSelectedExercisesAtom = atom(null, (get, set, exercise: Exercise) => {
    if(!exercise) return set(selectedExercisesAtom, []);
    const selectedExercises = get(selectedExercisesAtom);

    const index = selectedExercises.indexOf(exercise);
    if (index > 0) {
        set(selectedExercisesAtom, [
          ...selectedExercises.slice(0, index),
          ...selectedExercises.slice(index + 1),
        ])
      } else if (index === 0) {
        set(selectedExercisesAtom, [...selectedExercises.slice(1)])
      } else {
        set(selectedExercisesAtom, [...selectedExercises, exercise])
      }
})