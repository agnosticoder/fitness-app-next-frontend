import { Set } from './Set';

export interface Exercise {
    id: string;
    name: string;
    workoutId: string;
    sets?: Set[];
}
