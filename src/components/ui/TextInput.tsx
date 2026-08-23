import { useState } from 'react';

interface OwnProps {
    label: string;
    helperText?: string;
    className?: string;
    placeholder?: string;
    startAdornment?: React.ReactNode;
    endAdornment?: React.ReactNode;

    // todo - error - form-input--error
}

function TextInput(props: OwnProps) {
    const { label, helperText, className, placeholder, startAdornment, endAdornment } = props;

    const [value, setValue] = useState('');

    return (
        <div className="form-input">
            <div className="form-input__input">
                <input
                    value={value}
                    placeholder=""
                    onChange={(e) => setValue(e.currentTarget.value)}
                />
                <span>{label}</span>
            </div>
        </div>
    );
}

export default TextInput;
