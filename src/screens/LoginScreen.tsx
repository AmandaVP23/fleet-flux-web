import FullLogo from '../assets/icons/logos/logo-full-color.svg';
import { buildClassName } from '../utils/misc';

function LoginScreen() {
    const onFormSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
    };

    console.log(buildClassName('btn', 'hey', '$ola'));
    console.log(
        buildClassName('oi', {
            jjj: true,
            $dasdas: true,
            'not-s': false,
        }),
    );

    return (
        <div className="login-screen">
            <div className="login-screen__container">
                <div className="login-screen__container__top">
                    <FullLogo />
                </div>
                <form onSubmit={onFormSubmit}>
                    <h1>Sign In To Your Workspace</h1>
                    <p>Built for real-time fleet oversight</p>
                </form>
            </div>
        </div>
    );
}

export default LoginScreen;
