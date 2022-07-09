import { matchSorter } from 'match-sorter';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useCombobox, useMultipleSelection } from 'downshift';
import { useErrorHandler } from 'react-error-boundary';
import { selectedExercisesAtom } from './store/atoms';
import { useAtom } from 'jotai';
import { CgCloseO } from 'react-icons/cg';
import { TiTick } from 'react-icons/ti';
import { isMobile, BrowserView, MobileView } from 'react-device-detect';
import {v4 as uuid} from 'uuid';

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
    { name: 'Biceps', id: uuid() },
    { name: 'Triceps', id: uuid() },
    { name: 'Chest', id: uuid() },
    { name: 'Back', id: uuid() },
    { name: 'Shoulders', id: uuid() },
    { name: 'Legs', id: uuid() },
    { name: 'Abs', id: uuid() },
    { name: 'Cardio', id: uuid() },
    { name: 'Other', id: uuid() },
]

const ChooseExercisesBrowser = () => {
    const [inputValue, setInputValue] = useState('');
    const handleError = useErrorHandler();
    const [, setSelectedExercies] = useAtom(selectedExercisesAtom);

    // useMultipleSelection
    const { getDropdownProps, getSelectedItemProps, addSelectedItem, removeSelectedItem, selectedItems } =
        useMultipleSelection<{ name: string; id: string }>();

    // filter items based on inputValue and remove selected items from the list
    const getFilteredItems = () => {
        // const flatenedSelectedItems = selectedItems.map((item) => item.id);
        const filteredItems = matchSorter(allExercises, inputValue, {
            keys: ['name'],
        });
        // return filteredItems.filter((item) => !flatenedSelectedItems.includes(item.id));
        return filteredItems;
    };

    //Combobox
    const {
        getLabelProps,
        getInputProps,
        getComboboxProps,
        getToggleButtonProps,
        getMenuProps,
        getItemProps,
        isOpen,
        highlightedIndex,
        selectedItem,
    } = useCombobox({
        inputValue,
        defaultHighlightedIndex: 0, //after selection, first item is highlighted
        defaultIsOpen: true,
        items: getFilteredItems(),
        selectedItem: null,
        itemToString: (item) => (item ? item.name : ''),
        stateReducer: (state, actionAndChanges) => {
            const { type, changes } = actionAndChanges;

            switch (type) {
                case useCombobox.stateChangeTypes.InputKeyDownEnter:
                case useCombobox.stateChangeTypes.ItemClick:
                    return {
                        ...changes,
                        isOpen: true,
                        highlightedIndex: state.highlightedIndex
                    };
            }

            //Todo: Change this later
            return { ...changes, isOpen: true };
        },
        onStateChange: ({ inputValue, type, selectedItem }) => {
            switch (type) {
                case useCombobox.stateChangeTypes.InputChange:
                    if (inputValue === undefined) return;
                    setInputValue(inputValue);
                    break;
                case useCombobox.stateChangeTypes.ItemClick:
                case useCombobox.stateChangeTypes.InputKeyDownEnter:
                    // case useCombobox.stateChangeTypes.InputBlur:
                    if (!selectedItem) return;
                    !isMobile && setInputValue('');
                    if (selectedItems.filter((item) => item.id === selectedItem.id).length > 0) {
                        removeSelectedItem(selectedItem);
                        return;
                    }
                    addSelectedItem(selectedItem);
                    break;
                default:
                    break;
            }
        },
    });

    useEffect(() => {
        setSelectedExercies(selectedItems);
    }, [selectedItems]);

    return (
        <div>
            {/* <label {...getLabelProps()}>Search your Exercise</label> */}
            <div {...getComboboxProps()}>
                <input
                    {...getInputProps(getDropdownProps({ preventKeyAction: isOpen}))}
                    className="w-full mb-2 p-2 rounded bg-zinc-700"
                    placeholder="Search your Exercise"
                />
                {/* <button type="button" aria-label="toggle menu" {...getToggleButtonProps()}>Toggle</button> */}
            </div>
            <ul
                {...getMenuProps()}
                className="mb-4 p-2 min-w-full h-96 overflow-auto rounded-md divide-y divide-zinc-600/50"
            >
                {/* {isOpen && (
                    exercises.map((exercise, index) => <ExerciseListItem key={exercise.id} {...exercise} className={`list-none ${index === highlightedIndex ? 'bg-slate-300' : ''}`} getItemProps={getItemProps}/>) 
                )} */}
                {isOpen &&
                    getFilteredItems().map((exercise, index) => (
                        <li
                            className={`relative cursor-pointer h-14 rounded p-2 pr-4 ${!isMobile &&
                                index === highlightedIndex
                                    ? exercise.id === selectedItem?.id
                                        ? 'bg-zinc-500'
                                        : 'bg-zinc-600'
                                    : ''
                            } ${exercise.id === selectedItem?.id ? 'bg-zinc-400' : ''}`}
                            key={`${exercise.name}${index}`}
                            {...getItemProps({ item: exercise, index })}
                        >
                            {exercise.name}
                            {selectedItems.filter((item) => item.id === exercise.id).length > 0 
                            && <span className='absolute right-0'>
                                <TiTick className='text-green-500' size={20}/>
                            </span>}
                        </li>
                    ))}
            </ul>
            {/* {selectedItems.map((selectedItem, index) => (
                <span
                    className="mr-4 w-full h-10 overflow-x-auto"
                    key={selectedItem.id}
                    {...getSelectedItemProps({ selectedItem, index })}
                >
                    {selectedItem.name}
                    <span onClick={() => removeSelectedItem(selectedItem)} className="ml-1 cursor-pointer">
                        <CgCloseO className="inline-block text-red-500" />
                    </span>
                </span>
            ))} */}
        </div>
    );
};

export default ChooseExercisesBrowser;
