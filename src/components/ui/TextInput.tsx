import { buildClassName } from '../../utils/misc';
import type { ErrorResponse } from '../../utils/validations';
import ErrorMessage from './ErrorMessage';

interface OwnProps {
    value: string;
    label: string;
    helperText?: string;
    extraClassName?: string;
    startAdornment?: React.ReactNode;
    endAdornment?: React.ReactNode;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: ErrorResponse | null;
}

function TextInput(props: OwnProps) {
    const {
        label,
        value,
        helperText,
        startAdornment,
        endAdornment,
        onChange,
        error = null,
        extraClassName = '',
    } = props;

    const containerClasses = buildClassName(
        'form-input',
        {
            error: !!error,
            'start-adornment': !!startAdornment,
            'end-adornment': !!endAdornment,
        },
        `$${extraClassName}`,
    );

    return (
        <div className={containerClasses}>
            <div className="form-input__input">
                {startAdornment && (
                    <div className={buildClassName('form-input__input__adornment', 'start')}>
                        {startAdornment}
                    </div>
                )}
                <input value={value} placeholder="" onChange={(e) => onChange?.(e)} />
                <span>{label}</span>
                {endAdornment && (
                    <div className={buildClassName('form-input__input__adornment', 'end')}>
                        {endAdornment}
                    </div>
                )}
            </div>
            <ErrorMessage errorObj={error} />
            {helperText && <div className="form-input__helper-txt">{helperText}</div>}
        </div>
    );
}

export default TextInput;
