import { useCallback, useEffect, useState } from "react";
import useDebounce from "../components/hooks/useDebounce";

const Debounce = () => {
    const [value, setValue] = useState('');
    const { debouncedValue } = useDebounce(value, 2000);

    const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    };

    useEffect(() => {
        console.log('debounced value', debouncedValue);
    }, [debouncedValue]);

    return (
        <div>
            <input
                className="w-full h-14 text-2xl mb-4"
                type="text"
                placeholder="Debounce this input"
                value={value}
                onChange={onHandleChange}
            />
            <h1>
                <div className="text-2xl inline-block mr-4">Debounce:</div>
                <span className="text-2xl">{debouncedValue}</span>
            </h1>
        </div>
    );
};

export default Debounce;