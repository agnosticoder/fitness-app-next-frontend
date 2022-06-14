import { Exercise } from './Exercise';

export interface Workout{
    id: string;
    name: string;
    exercises?: Exercise[];
}