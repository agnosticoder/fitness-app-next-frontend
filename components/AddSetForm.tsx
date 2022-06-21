import { FormEvent, useEffect, useState } from "react";
import Button from "./Button";
import useCreateSet from "./hooks/useCreateSet";

// only allow floating point numbers upto two decimal places using regex
const isMatch = (value: string) => {
    const regex = /^\d*(\.\d{0,2})?$/;
    return regex.test(value);
}

const AddSetForm = ({ exerciseId }: { exerciseId: string }) => {
    const [weight, setWeight] = useState('');
    const [reps, setReps] = useState('');
    const [errors, setErrors] = useState({ weight: '', reps: '' });
    const { mutate, data } = useCreateSet();

    const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        if (!isMatch(value)) return;
        setWeight(value);
    };

    const handleRepsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        if (!isMatch(value)) return;
        setReps(value);
    };

    // reset errors when weight or reps change
    useEffect(() => {
        if (weight !== '') {
            setErrors({ ...errors, weight: '' });
        }

        if (reps !== '') {
            setErrors({ ...errors, reps: '' });
        }
    }, [weight, reps]);

    const onAddSet = (e: FormEvent) => {
        e.preventDefault();
        if (weight === '' || reps === '') {
            setErrors({ weight: weight === '' ? 'Required' : '', reps: reps === '' ? 'Required' : '' });
            return;
        }
        setReps('');
        setWeight('');
        mutate({exerciseId, weight, reps});
    };

    return (
        <form className="mt-4" onSubmit={onAddSet}>
            <div className="w-1/2 inline-block">
                <input
                    name="weight"
                    className={`w-full border-gray-500 border-2 rounded ${errors.weight ? 'border-red-500' : ''}`}
                    type="text"
                    placeholder="Weight"
                    value={weight}
                    onChange={handleWeightChange}
                />
            </div>
            <div className="w-1/2 inline-block">
                <input
                    name="reps"
                    className={`w-full border-gray-500 border-2 rounded ${errors.reps ? 'border-red-500' : ''}`}
                    type="text"
                    placeholder="Reps"
                    value={reps}
                    onChange={handleRepsChange}
                />
            </div>
            <div className="w-full">
                <Button className="block w-full" type="submit">
                    Add Set
                </Button>
            </div>
        </form>
    );
};

export default AddSetForm;
