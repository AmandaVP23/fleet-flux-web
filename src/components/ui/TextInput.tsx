import { useState } from 'react';

interface OwnProps {
    label: string;
    helperText?: string;
    className?: string;
    placeholder?: string;
    startAdornment?: React.ReactNode;
    endAdornment?: React.ReactNode;
}

function TextInput(props: OwnProps) {
    const { label, helperText, className, placeholder, startAdornment, endAdornment } = props;

    const [value, setValue] = useState('');

    return (
        <div className="form-input">
            <label>
                <input
                    value={value}
                    placeholder=""
                    onChange={(e) => setValue(e.currentTarget.value)}
                />
                <span>{label}</span>
            </label>
        </div>
    );
}

export default TextInput;
