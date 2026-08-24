import { useState } from 'react';

import FullLogo from '../assets/icons/logos/logo-full-color.svg';
import TextInput from '../components/ui/TextInput';

function LoginScreen() {
    const [email, setEmail] = useState('');

    const onFormSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
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
                </form>
            </div>
        </div>
    );
}

export default LoginScreen;
