import {Dispatch, SetStateAction, useEffect, useState} from "react";

function getLocalStorageValue<T>(key: string, defaultValue: T): T {
    const saved = localStorage.getItem(key);

    if (saved) {
        return (JSON.parse(saved) as T);
    }
    return defaultValue;
}

type SetValue<T> = Dispatch<SetStateAction<T>>

function useLocalStorage<T>(key: string, defaultValue: T): [T, SetValue<T>] {
    const [value, setValue] = useState<T>(() => {
        return getLocalStorageValue<T>(key, defaultValue);
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}

export default useLocalStorage;