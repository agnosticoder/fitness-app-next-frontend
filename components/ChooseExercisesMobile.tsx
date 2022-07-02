import { matchSorter } from 'match-sorter';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useCombobox, useSelect, useMultipleSelection } from 'downshift';
import { useErrorHandler } from 'react-error-boundary';
import { getSelectedExercisesAtom, selectedExercisesAtom, setSelectedExercisesAtom } from './store/atoms';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { CgCloseO } from 'react-icons/cg';
import { TiTick } from 'react-icons/ti';
import { isMobile, BrowserView, MobileView } from 'react-device-detect';

import _exercises from '../db/exercises.json';

const exercises = _exercises.exercises;


//choose any 30 exercises form exercises array
const getExercises = () => {
    const randomExercises = [];
    for (let i = 0; i < 30; i++) {
        const randomIndex = Math.floor(Math.random() * exercises.length);
        randomExercises.push(exercises[randomIndex]);
    }
    return randomExercises;
};

const allExercises = [
    { name: 'Biceps', id: 'biceps' },
    { name: 'Triceps', id: 'triceps' },
    { name: 'Chest', id: 'chest' },
    { name: 'Back', id: 'back' },
    { name: 'Shoulders', id: 'shoulders' },
    { name: 'Legs', id: 'legs' },
    { name: 'Abs', id: 'abs' },
    { name: 'Cardio', id: 'cardio' },
    { name: 'Other', id: 'other' },
];

const ChooseExercisesMobile = () => {
    const [inputValue, setInputValue] = useState('');
    const selectedExercises = useAtomValue(getSelectedExercisesAtom);
    const setSelectedExercies = useSetAtom(setSelectedExercisesAtom);
    const inputRef = useRef<HTMLInputElement>(null);

    let isInput = false;

    // filter items based on inputValue
    const getFilteredItems = () => {
        const filteredItems = matchSorter(allExercises, inputValue, {
            keys: ['name'],
        });
        return filteredItems;
    };

    //Combobox
    const { getToggleButtonProps, getMenuProps, getItemProps, isOpen, highlightedIndex, selectedItem } = useSelect({
        defaultIsOpen: true,
        items: getFilteredItems(),
        selectedItem: null,
        itemToString: (item) => (item ? item.name : ''),
        stateReducer: (state, actionAndChanges) => {
            const { type, changes } = actionAndChanges;

            switch (type) {
                case useSelect.stateChangeTypes.MenuKeyDownEnter:
                case useSelect.stateChangeTypes.ItemClick:
                    return {
                        ...changes,
                        isOpen: true,
                        highlightedIndex: state.highlightedIndex,
                    };
            }

            //Todo: Change this later
            return { ...changes, isOpen: true };
        },
        onSelectedItemChange: ({ selectedItem }) => {
            if (!selectedItem) return;
            // setInputValue('');
            setSelectedExercies(selectedItem);
        },
    });

    useEffect(() => {
        setSelectedExercies(null);
    }, []);

    return (
        <div
            //* This is beautiful peace of code to make dialog input work on mobile how it should be
            onMouseDownCapture={(e: any) => {
                if (document.activeElement?.tagName === 'INPUT') {
                    isInput = true;
                }
            }}
            onMouseUpCapture={(e: any) => {
                if (e.target.tagName === 'LI' && isInput) {
                    console.log('clicked on li mouseup');
                    inputRef.current?.focus();
                }
            }}
            // onTouchStartCapture={(e: any) => {
            //     if (document.activeElement?.tagName === 'INPUT') {
            //         isInput = true;
            //     }
            // }}
            // onTouchEndCapture={(e: any) => {
            //     if (e.target.tagName === 'LI' && isInput) {
            //         console.log('clicked on li mousedown');
            //         inputRef.current?.focus();
            //     }
            // }}
        >
            <div>
                <input
                    ref={inputRef}
                    className="w-full mb-2 p-2 rounded bg-zinc-700"
                    placeholder="Search your Exercise"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button className="hidden" type="button" aria-label="toggle menu" {...getToggleButtonProps()}>
                    Toggle
                </button>
            </div>
            <ul
                {...getMenuProps()}
                className="mb-4 p-2 min-w-full h-96 overflow-auto rounded-md divide-y divide-zinc-600/50"
            >
                {isOpen &&
                    getFilteredItems().map((exercise, index) => (
                        <li
                            className={`relative cursor-pointer h-14 rounded p-2 pr-4 ${
                                !isMobile && index === highlightedIndex
                                    ? exercise.id === selectedItem?.id
                                        ? 'bg-zinc-500'
                                        : 'bg-zinc-600'
                                    : ''
                            } ${exercise.id === selectedItem?.id ? 'bg-zinc-400' : ''}`}
                            key={`${exercise.name}${index}`}
                            {...getItemProps({
                                item: exercise,
                                index,
                            })}
                        >
                            {exercise.name}
                            {selectedExercises.filter((item) => item?.id === exercise.id).length > 0 && (
                                <span className="absolute right-0">
                                    <TiTick className="text-green-500" size={20} />
                                </span>
                            )}
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default ChooseExercisesMobile;
