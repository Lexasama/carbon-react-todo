import {useEffect, useState} from "react";

const useLocalStorage = (key: string, defaultValue = null) => {
    const [value, setValue] = useState(() => {
        try {
            const saved = localStorage.getItem(key);
            if (saved !== null) {
                return JSON.parse(saved);
            }
            return defaultValue;
        } catch {
            return defaultValue;
        }
    });

    useEffect(() => {
        const rawValue = JSON.stringify(value);
        localStorage.setItem(key, rawValue);
    }, [value, setValue]);

    return [value, setValue];
};


export default useLocalStorage;