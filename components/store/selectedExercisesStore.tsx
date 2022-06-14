import { ExerciseProps } from '../../pages/workout/[id]';
import makeStore from './makeStore';

const {Provider, useStore} = makeStore<ExerciseProps[]>();

export const SelectedExercisesProvider = Provider;
export const useSelectedExercisesStore = useStore;
