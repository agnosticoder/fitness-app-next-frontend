import { matchSorter } from "match-sorter";
import { useEffect, useMemo, useRef, useState } from "react";
import { useCombobox, useMultipleSelection } from 'downshift';
import { useErrorHandler } from 'react-error-boundary';
import { useSelectedExercisesStore } from './store/selectedExercisesStore';

const allExercises = [{name: 'Biceps', id: 'biceps'}, {name: 'Triceps', id: 'triceps'}, {name: 'Chest', id: 'chest'}, {name: 'Back', id: 'back'}, {name: 'Shoulders', id: 'shoulders'}, {name: 'Legs', id: 'legs'}];


const ChooseExercises = () => {
    const [inputValue, setInputValue] = useState('');
    const handleError = useErrorHandler();
    const [,setSelectedExercies] = useSelectedExercisesStore();


    // useMultipleSelection
    const {
        getDropdownProps,
        getSelectedItemProps,
        addSelectedItem,
        removeSelectedItem,
        selectedItems,
    } = useMultipleSelection<{ name: string, id: string }>();

    // filter items based on inputValue and remove selected items from the list
    const getFilteredItems = () => {
        const flatenedSelectedItems = selectedItems.map((item) => item.id);
        const filteredItems = matchSorter(allExercises, inputValue, {
            keys: ['name']
        });
        return filteredItems.filter((item) => !flatenedSelectedItems.includes(item.id));
    };

    //Combobox
    const
        { getLabelProps,
            getInputProps,
            getComboboxProps,
            getToggleButtonProps,
            getMenuProps,
            getItemProps,
            isOpen,
            highlightedIndex,
            selectedItem
        } = useCombobox(
            {
                inputValue,
                defaultHighlightedIndex: 0, //after selection, first item is highlighted
                defaultIsOpen: true,
                items: getFilteredItems(),
                selectedItem: null,
                itemToString: (item) => (item ? item.name : ""),
                stateReducer: (state, actionAndChanges) => {
                    const {type, changes} = actionAndChanges;
                    
                    switch(type) {
                        case useCombobox.stateChangeTypes.InputKeyDownEnter:
                        case useCombobox.stateChangeTypes.ItemClick:
                            return {
                                ...changes,
                                isOpen: true,
                            }
                    }

                    //Todo: Change this later
                    return {...changes, isOpen: true};
                },
                onStateChange: ({inputValue, type, selectedItem}) => {

                    switch(type) {
                        case useCombobox.stateChangeTypes.InputChange:
                            if(inputValue === undefined) return;
                            setInputValue(inputValue);
                            break;
                        case useCombobox.stateChangeTypes.ItemClick:
                        case useCombobox.stateChangeTypes.InputKeyDownEnter:
                        // case useCombobox.stateChangeTypes.InputBlur:
                            if(!selectedItem) return;
                            setInputValue('');
                            addSelectedItem(selectedItem);
                            break;
                        default:
                            break;
                    }
                }
            });

    useEffect(() => {
        setSelectedExercies(selectedItems);
    }, [selectedItems]);

    return (
        <div>
            {selectedItems.map((selectedItem, index) => (
                <div className="bg-orange-200" key={selectedItem.id} {...getSelectedItemProps({selectedItem, index})}>
                    {selectedItem.name}
                    <span onClick={() => removeSelectedItem(selectedItem)} className="ml-3 cursor-pointer">X</span>
                </div>
            ))}
            <label {...getLabelProps()}>Search your Exercise</label>
            <div {...getComboboxProps()}>
                <input
                    {...getInputProps(getDropdownProps({ preventKeyAction: isOpen }))}
                    className="w-full mb-2 p-2 rounded"
                    placeholder="Search your Exercise"
                />
                <button type="button" aria-label="toggle menu" {...getToggleButtonProps()}>Toggle</button>
            </div>
            <ul {...getMenuProps()} className="mb-4 p-2 min-w-full h-60 bg-slate-200 overflow-auto rounded-md">
                {/* {isOpen && (
                    exercises.map((exercise, index) => <ExerciseListItem key={exercise.id} {...exercise} className={`list-none ${index === highlightedIndex ? 'bg-slate-300' : ''}`} getItemProps={getItemProps}/>) 
                )} */}
                {isOpen && (
                    getFilteredItems().map((exercise, index) => (
                        <li
                            className={`cursor-pointer ${index === highlightedIndex ? exercise.id === selectedItem?.id ? 'bg-slate-400' : 'bg-slate-300' : ''} ${exercise.id === selectedItem?.id ? 'bg-slate-400' : ''}`}
                            key={`${exercise.name}${index}`} {...getItemProps({ item: exercise, index })}>
                            {exercise.name}
                        </li>))

                )}
            </ul>
        </div>
    );
};

export default ChooseExercises