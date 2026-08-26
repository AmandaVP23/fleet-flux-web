import { useState } from 'react';

import IconArrowRight from '../assets/icons/icon-arrow-right.svg';
import FullLogo from '../assets/icons/logos/logo-full-color.svg';
import Button from '../components/ui/Button';
import TextInput from '../components/ui/TextInput';
import useKeycloak from '../hooks/useKeycloak';
import { type FormErrors, validate } from '../utils/validations';
import { loginValidations } from '../validations/loginValidations';

function LoginScreen() {
    const [email, setEmail] = useState('');
    const [formErrors, setFormErrors] = useState<FormErrors>(null);
    const { requestKeycloakInformationAndInit } = useKeycloak();

    const onFormSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        const errors = validate({ email }, loginValidations);
        setFormErrors(errors);
        console.log('validations');

        if (errors) {
            return null;
        }

        await requestKeycloakInformationAndInit(email.trim());
    };

    return (
        <div className="login-screen">
            <div className="login-screen__container">
                <div className="login-screen__container__top">
                    <FullLogo />
                </div>
                <form onSubmit={onFormSubmit}>
                    <h1>Sign In To Your Workspace</h1>
                    <p>Built for real-time fleet oversight</p>
                    <TextInput
                        name="email"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                        error={formErrors?.email ?? null}
                    />
                    <div className="d-flex justify-end">
                        <Button type="submit">
                            <span>Enter</span>
                            <IconArrowRight />
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginScreen;
