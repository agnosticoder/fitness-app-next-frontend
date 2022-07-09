import NiceModal, { useModal } from '@ebay/nice-modal-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiFillCloseCircle } from 'react-icons/ai';
import GenricDialog from '../GenricDialog';
import useGetWorkout from '../hooks/useGetWorkout';

const WorkoutHisory = NiceModal.create(({ workoutId }: { workoutId: string }) => {
    const { visible, hide } = useModal();
    const { data: workout } = useGetWorkout({ id: workoutId });
    const router = useRouter();

    return (
        <GenricDialog isOpen={visible}>
            <div className="w-full">
                <div className="relative bg-zinc-800 text-zinc-200 rounded-md p-4 max-w-sm m-auto drop-shadow-2xl">
                    <h1 className="text-2xl font-bold my-4 text-center">{workout?.name}</h1>
                    <div className="h-[400px] overflow-auto divide-y divide-zinc-600/50">
                        {workout?.exercises?.map((exercise) => (
                            <div key={exercise.id} className="mb-2 ">
                                <h2 className="font-bold mt-2">{exercise.name}</h2>
                                {exercise.sets.map((set, index) => (
                                    <div key={set.id} className="text-sm">
                                        <span className="inline-block mr-4">{index + 1}</span>
                                        <span className="inline-block mr-2">{set.reps}</span>
                                        <span className="inline-block mr-2">X</span>
                                        <span className="inline-block mr-2">{set.weight} kg</span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    <button className="absolute top-0 left-0" onClick={hide} type="button">
                        <AiFillCloseCircle size={40} className="p-2 text-red-500" />
                    </button>
                    <button
                        className="font-bold text-lg absolute top-0 right-0 p-2 text-rose-600 disabled:text-rose-600/40"
                        onClick={() => {
                            router.push(`/history/edit/${workoutId}`);
                            hide();
                        }}
                        type="button"
                    >
                        Edit
                    </button>
                </div>
            </div>
        </GenricDialog>
    );
});

export default WorkoutHisory;
