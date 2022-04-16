import { matchSorter } from "match-sorter";
import { useEffect, useState } from "react";
import fetchAllExercises from "../lib/fetchAllExercises";
import { Exercise } from "../pages/workout/[id]";
import ExerciseListItem from "./ExerciseListItem";
import { useCombobox } from 'downshift';

const ChooseExercises = () => {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [exerciseQuery, setExerciseQuery] = useState('');

    // Fetch all exercises on mount and update the state
    useEffect(() => {
        fetchAllExercises()
            .then((exercises) => {
                setExercises(exercises);
            })
            .catch((err) => console.error({ err }));
    }, []);

    //filter exercises by query using matchSorter
    const filteredExercises = matchSorter(exercises, exerciseQuery, {
        keys: ["name"],
    });

    return (
        <div>
            <input
                className="w-full mb-2 p-2 rounded"
                type="text"
                placeholder="Search your Exercise"
                value={exerciseQuery}
                onChange={(e) => setExerciseQuery(e.currentTarget.value)}
            />
            <div className="mb-4 p-2 min-w-full h-60 bg-slate-300 overflow-auto">
                <ul>
                    {exercises.length &&
                        filteredExercises.map((exercise) => <ExerciseListItem key={exercise.id} {...exercise} />)}
                </ul>
            </div>
        </div>
    );
};

export default ChooseExercises