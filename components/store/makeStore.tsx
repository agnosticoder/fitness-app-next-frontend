import { createContext, Dispatch, SetStateAction, useContext, useMemo, useReducer, useState } from 'react';



type ContextProps<T> = [T, Dispatch<SetStateAction<T>>];

interface MakeStoreProviderProps<T> {
    init: T,
    children: JSX.Element
}

const makeStore = <T,>() => {
    const Context = createContext<ContextProps<T>>({} as ContextProps<T>);
    const useStore = () => useContext(Context);

    const Provider = ({ init, children }: MakeStoreProviderProps<T>) => {
        const [state, setState] = useState(init);

        const contextValue = useMemo(():ContextProps<T> => [state, setState], [state]);

        return <Context.Provider value={contextValue}>{children}</Context.Provider>;
    };

    return {Provider, useStore}
};

export default makeStore;



































/* ---------------------------------- Todo ---------------------------------- */
// - Implement makeStore using useReducer and LocalStorage
// - https://www.youtube.com/watch?v=J-g9ZJha8FE

type State = any;

type Action = State;

type UserReducer = (state: State, action: Action) => any;

type InitialState = any[] | object


export const makeStoreWithReducer = (userReducer:UserReducer, initialState: InitialState = [], key:string) => {
    const storeContext = createContext<any>(null);
    const dispatchContext = createContext<any>(null);

    const useStore = () => useContext(storeContext);
    const useDispatch = () => useContext(dispatchContext);

    const reducer = (state: State, action: Action) => {
        const newState = userReducer(state, action);
        return newState;
    };

    const Provider = ({ children }: {children: JSX.Element}) => {
        const [state, dispatch] = useReducer(reducer, initialState);

        return (
            <dispatchContext.Provider value={dispatch}>
                <storeContext.Provider value={state}>{children}</storeContext.Provider>
            </dispatchContext.Provider>
        );
    };

    return [Provider, useStore, useDispatch] as const;
};
