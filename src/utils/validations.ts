export interface ErrorResponse {
    typeOfViolation: 'NotBlank' | 'MaxValue';
    min?: number;
    max?: number;
    customErrorMsg?: string;
}
