import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import {v4 as uuid} from 'uuid';

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
export interface SetLocal{
    id: string,
    reps?: string;
    weight?: string;
}

export interface ExerciseLocal {
    id: string;
    name: string;
    sets?: SetLocal[];
}

export interface WorkoutLocal {
    id: string;
    name: string;
    exercises: ExerciseLocal[];
}

const dummyWorkout: WorkoutLocal = {
  id: uuid(),
    name: 'dummy workout',
    exercises: [
      {id: uuid(), name: 'dummy exercise1', sets: [{id: uuid(), reps: '5', weight: '100'}]},
      {id: uuid(), name: 'dummy exercise2', sets: [{id: uuid(), reps: '5', weight: '100'}]},
      {id: uuid(), name: 'dummy exercise3', sets: [{id: uuid(), reps: '5', weight: '100'}]},
    ],
}

export const workoutAtom = atomWithStorage<WorkoutLocal>('workout',dummyWorkout);

export const getWorkoutAtom = atom((get) => get(workoutAtom));

export const setWorkoutAtom = atom(null, (get, set, {workout}: {workout: WorkoutLocal | null}) => {
  if(!workout) return;
  set(workoutAtom, workout);
});
