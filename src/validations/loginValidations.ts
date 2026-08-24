import type { FormValidations } from '../utils/validations';

export const loginValidations: FormValidations = {
    email: {
        validations: ['NotBlank', 'Email'],
    },
};
