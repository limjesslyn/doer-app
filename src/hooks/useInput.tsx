import { useState, ChangeEvent } from 'react';

interface UseInputOptions {
    initialValue?: string;
}

const useInput = ({ initialValue = '' }: UseInputOptions = {}) => {
    const [value, setValue] = useState<string>(initialValue);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return {
        value,
        onChange: handleChange,
    };
};

export default useInput;
