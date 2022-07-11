import produce from "immer";
import { atom } from "jotai";
import {v4 as uuid} from 'uuid';

export const confirmDialogAtom = atom(false);

export const messageAtom = atom('');

/* ---------------------------- Notificaton Atom ---------------------------- */
type NotificatonT = {
    notificationId: string;
    message: string;
    mode: 'info' | 'success' | 'warning' | 'error';
};

const notificatonAtom = atom<NotificatonT[]>([]);

export const getNotificationAtom = atom((get) => get(notificatonAtom));

export const setNotificatonAtom = atom(null, (get, set, notification: Pick<NotificatonT, 'message' | 'mode'>) => {
    const notificationId = uuid();

    const newNotification = {
        ...notification,
        notificationId,
    };

    const notifications = get(notificatonAtom);
    set(
        notificatonAtom,
        notifications.concat(newNotification),
    );

    setTimeout(() => {
        const notifications = get(notificatonAtom);
        set(
            notificatonAtom,
            notifications.filter((n) => n.notificationId !== notificationId)
        );
    }, 3000);
});

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

/* ------------------------------ Workout Local Atom ------------------------------ */
export interface SetLocal{
    id: string,
    reps?: string;
    weight?: string;
    setOrder?: string | null;
    isDone?: boolean;
    createdAt?: string;
    updatedAt?: string;
    exerciseId?: string;
}

export interface ExerciseLocal {
    id: string;
    name: string;
    isDone?: boolean;
    createdAt?: string;
    updatedAt?: string;
    workoutId?: string;
    sets?: SetLocal[];
}

export interface WorkoutLocal {
    id: string;
    name: string;
    isDone?: boolean;
    isTemplate?: boolean;
    createdAt?: string;
    updatedAt?: string;
    exercises: ExerciseLocal[];
}

export const workoutAtom = atom<WorkoutLocal>({} as WorkoutLocal);

export const getWorkoutAtom = atom((get) => get(workoutAtom));

const newTemplateAtom = atom(null, (get, set ) => {
  set(workoutAtom, {
    id: uuid(),
    name: 'New Template',
    exercises: []
  })
});

const setWorkoutAtom = atom(null, (_get, set, workout: WorkoutLocal) => {
  set(workoutAtom, workout);
});

const addExerciseAtom = atom(null, (get, set) => {
    const workout = get(workoutAtom);
    const selectedExercises = get(selectedExercisesAtom);
    const exercisesWithWorkoutId = selectedExercises.map(exercise => ({...exercise, workoutId: workout.id}));
    const newWorkout = produce(workout, (draft) => {
        draft.exercises = [...draft.exercises, ...exercisesWithWorkoutId];
    });
    set(workoutAtom, newWorkout);
});

const resetWorkoutAtom = atom(null, (get, set) => {
    set(workoutAtom, {
        id: uuid(),
        name: '',
        exercises: [],
    });
});

const addSetAtom = atom(null, (get, set, { exerciseId }: { exerciseId: string }) => {
    const workout = get(workoutAtom);
    const newWorkout = produce(workout, (draft) => {
        draft.exercises.forEach((exercise) => {
            if(exercise.id === exerciseId) {
              exercise.sets = exercise.sets || [];
              exercise.sets.push({
                id: uuid(),
                reps: '',
                weight: '',
                isDone: false,
                exerciseId,
              });
            }
        });
    });
    set(workoutAtom, newWorkout);
});

const removeSetAtom = atom(null, (get, set, { exerciseId, setId }: { exerciseId: string, setId: string }) => {
  const workout = get(workoutAtom);
  const newWorkout = produce(workout, (draft) => {
    draft.exercises.forEach((exercise) => {
      if(exercise.id === exerciseId) {
        exercise.sets = exercise.sets?.filter((set) => set.id !== setId);
      }
    });
  });
  set(workoutAtom, newWorkout);
})

const toggleSetDoneAtom = atom(null, (get, set, { exerciseId, setId }: { exerciseId: string, setId: string }) => {
  const workout = get(workoutAtom);
  const newWorkout = produce(workout, (draft) => {
    draft.exercises.forEach((exercise) => {
      if(exercise.id === exerciseId) {
        exercise.sets?.forEach((set) => {
          if(set.id === setId) {
            set.isDone = !set.isDone;
          }
        })
      }
    });
  });
  set(workoutAtom, newWorkout);
});

const setRepsInputAtom = atom(
    null,
    (get, set, { exerciseId, setId, reps }: { exerciseId: string; setId: string; reps: string }) => {
        const workout = get(workoutAtom);
        const newWorkout = produce(workout, (draft) => {
            draft.exercises.forEach((exercise) => {
                if (exercise.id === exerciseId) {
                    exercise.sets?.forEach((set) => {
                        if (set.id === setId) {
                            set.reps = reps;
                        }
                    });
                }
            });
        });
        console.log(newWorkout);
        set(workoutAtom, newWorkout);
    }
);

const setWeightInputAtom = atom(null, (get, set, { exerciseId, setId, weight }: { exerciseId: string; setId: string; weight: string }) => {
    const workout = get(workoutAtom);
    const newWorkout = produce(workout, (draft) => {
        draft.exercises.forEach((exercise) => {
            if (exercise.id === exerciseId) {
                exercise.sets?.forEach((set) => {
                    if (set.id === setId) {
                        set.weight = weight;
                    }
                });
            }
        });
    });
    set(workoutAtom, newWorkout);
});

const deleteExerciseAtom = atom(null, (get, set, { exerciseId }: { exerciseId: string }) => {
    const workout = get(workoutAtom);
    const newWorkout = produce(workout, (draft) => {
        draft.exercises = draft.exercises.filter((exercise) => exercise.id !== exerciseId);
    });
    set(workoutAtom, newWorkout);
});

const setTemplateNameAtom = atom(null, (get, set, { name }: { name: string }) => {
    const workout = get(workoutAtom);
    const newWorkout = produce(workout, (draft) => {
        draft.name = name;
    });
    set(workoutAtom, newWorkout);
});

type WorkoutAction = 
{type: 'NEW_TEMPLATE'} |
{type: 'SET_WORKOUT', workout: WorkoutLocal} |
{type: 'ADD_EXERCISE'} | 
{type: 'RESET_WORKOUT'} | 
{type: 'ADD_SET', exerciseId: string} |
{type: 'REMOVE_SET', exerciseId: string, setId: string} |
{type: 'TOGGLE_SET_DONE', exerciseId: string, setId: string} |
{type: 'SET_REPS_INPUT', exerciseId: string, setId: string, reps: string} |
{type: 'SET_WEIGHT_INPUT', exerciseId: string, setId: string, weight: string} |
{type: 'DELETE_EXERCISE', exerciseId: string} |
{type: 'SET_TEMPLATE_NAME', name: string};

export const dispatchWorkoutAtom = atom(null, (get, set, action:WorkoutAction) => {
  if(action.type === 'NEW_TEMPLATE') {
    set(newTemplateAtom);
  }
  if(action.type === 'SET_WORKOUT') {
    set(setWorkoutAtom, action.workout);
  }
  if(action.type === 'ADD_EXERCISE'){
    set(addExerciseAtom);
  }
  if(action.type === 'RESET_WORKOUT'){
    set(resetWorkoutAtom);
  }
  if(action.type === 'ADD_SET'){
    set(addSetAtom, { exerciseId: action.exerciseId });
  }
  if(action.type === 'REMOVE_SET'){
    set(removeSetAtom, { exerciseId: action.exerciseId, setId: action.setId });
  }
  if(action.type === 'SET_REPS_INPUT'){
    set(setRepsInputAtom, { exerciseId: action.exerciseId, setId: action.setId, reps: action.reps });
  }
  if(action.type === 'SET_WEIGHT_INPUT'){
    set(setWeightInputAtom, { exerciseId: action.exerciseId, setId: action.setId, weight: action.weight });
  }
  if(action.type === 'DELETE_EXERCISE'){
    set(deleteExerciseAtom, { exerciseId: action.exerciseId });
  }
  if(action.type === 'SET_TEMPLATE_NAME'){
    set(setTemplateNameAtom, { name: action.name });
  }
  if(action.type === 'TOGGLE_SET_DONE'){
    set(toggleSetDoneAtom, { exerciseId: action.exerciseId, setId: action.setId });
  }
});
