import type { ErrorResponse } from '../../utils/validations';

interface OwnProps {
    errorObj: ErrorResponse | null;
}

function ErrorMessage(props: OwnProps) {
    const { errorObj } = props;

    if (!errorObj) {
        return null;
    }

    const getErrorMsg = () => {
        if (errorObj.customErrorMsg) {
            return errorObj.customErrorMsg;
        }

        switch (errorObj.typeOfViolation) {
            case 'NotBlank':
                return 'Mandatory field';
            default:
                return 'Campo inválido';
        }
    };

    return <div className="error-message">{getErrorMsg()}</div>;
}

export default ErrorMessage;
