import { useState } from 'react';

import IconArrowRight from '../assets/icons/icon-arrow-right.svg';
import FullLogo from '../assets/icons/logos/logo-full-color.svg';
import Button from '../components/ui/Button';
import TextInput from '../components/ui/TextInput';
import { validate } from '../utils/validations';
import { loginValidations } from '../validations/loginValidations';

function LoginScreen() {
    const [email, setEmail] = useState('');

    const onFormSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        console.log('form submmited');
        validate({ email }, loginValidations);
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
