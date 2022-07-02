import { atom } from "jotai";

export const confirmDialogAtom = atom(false);
export const messageAtom = atom('');

/* ------------------------- select Exercises Atom ------------------------ */

type ExerciseT = {id: string, name: string};

export const selectedExercisesAtom = atom<ExerciseT[]>([]);

export const getSelectedExercisesAtom = atom((get) => get(selectedExercisesAtom));

export const setSelectedExercisesAtom = atom(null, (get, set, {exercise}: {exercise: ExerciseT | null}) => {
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

/* ------------------------------ Workout Atom ------------------------------ */
interface Set{
    reps?: string;
    weight?: string;
}
interface Exercise {
    name: string;
    sets?: Set[];
}

interface Workout {
    name: string;
    exercises: Exercise[];
}

export const workoutAtom = atom<Workout>({} as Workout);

export const getWorkoutAtom = atom((get) => get(workoutAtom));

export const setWorkoutAtom = atom(null, (get, set, {workout}: {workout: Workout | null}) => {

});
