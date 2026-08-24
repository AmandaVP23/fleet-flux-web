export interface FieldErrorResponse {
    typeOfViolation: 'NotBlank' | 'Email';
    min?: number;
    max?: number;
    customErrorMsg?: string | null;
}

export type ValidationType = 'NotBlank' | 'Email';

export interface ErrorValidationParams {
    validations: ValidationType[];
    customErrorMsg?: (
        validationParams: Omit<ErrorValidationParams, 'customErrorMsg'>,
        field: FieldType,
    ) => string;
}

export type FormValidations = Record<string, ErrorValidationParams>;

export type FieldType = string | number | null;

function setCustomErrorMsg(params: ErrorValidationParams, field: FieldType) {
    const { customErrorMsg, ...rest } = params;

    if (customErrorMsg) {
        return customErrorMsg(rest, field);
    }

    return null;
}

function validateEmail(params: ErrorValidationParams, value: FieldType): FieldErrorResponse | null {
    if (!value) {
        return null;
    }
    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.required = true;
    emailInput.value = String(value);

    if (emailInput.checkValidity()) {
        return null;
    }

    return {
        typeOfViolation: 'Email',
        customErrorMsg: setCustomErrorMsg(params, value),
    };
}

function validateNotBlank(
    params: ErrorValidationParams,
    value: FieldType,
): FieldErrorResponse | null {
    if (value === null || (typeof value === 'string' && value.trim() === '')) {
        console.log('hey!');
        return {
            typeOfViolation: 'NotBlank',
            customErrorMsg: setCustomErrorMsg(params, value),
        };
    }

    return null;
}

export function validate(
    fields: Record<string, FieldType>,
    validations: FormValidations,
): Record<string, FieldErrorResponse> | null {
    console.log('validate');
    console.log(fields);
    console.log(validations);
    const validationFunctionsMapper: Record<
        ValidationType,
        (params: ErrorValidationParams, value: FieldType) => FieldErrorResponse | null
    > = {
        NotBlank: validateNotBlank,
        Email: validateEmail,
    };

    const errors: Record<string, FieldErrorResponse> = {};
    Object.entries(validations).forEach(([fieldKey, validationParams]) => {
        console.log('hey!', fieldKey);

        for (const validationType of validationParams.validations) {
            const fn = validationFunctionsMapper[validationType];
            if (!fn) {
                throw new Error(`ValidationType not mapped -> ${validationType}`);
            }

            const fieldValue = fields[fieldKey];
            if (fieldValue === undefined) {
                throw new Error(`Validation for non existing field value, fieldKey: ${fieldKey}`);
            }

            const error = fn(validationParams, fieldValue);

            if (error) {
                errors[fieldKey] = error;
                break;
            }
        }
    });

    return Object.keys(errors).length > 0 ? errors : null;
}
