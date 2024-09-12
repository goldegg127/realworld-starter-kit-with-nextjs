import { useState } from 'react';
import Cookies from 'js-cookie';
import { SignupUser } from '@/api';

export default async function SignupForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputName = (event: React.FocusEvent<HTMLInputElement>) => setUsername(event.target.value);
    const handleInputEmail = (event: React.FocusEvent<HTMLInputElement>) => setEmail(event.target.value);
    const handleInputPassword = (event: React.FocusEvent<HTMLInputElement>) => setPassword(event.target.value);

    const handleSignup = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const res = await SignupUser({ username, email, password });
            const { token } = res.data;

            Cookies.set('token', token, {
                secure: true,
                sameSite: 'Strict',
                expires: 7,
            });
            console.log('Login successful:', res);
        } catch (error) {
            setErrorMessage('Login failed. Please check your credentials and try again.');
            console.log('error: ', error);
        }
    };

    return (
        <>
            {errorMessage && (
                <ul className="error-messages">
                    <li>{errorMessage}</li>
                </ul>
            )}

            <form onSubmit={handleSignup}>
                <fieldset className="form-group">
                    <input
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Username"
                        onBlur={handleInputName}
                    />
                </fieldset>
                <fieldset className="form-group">
                    <input
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Email"
                        onBlur={handleInputEmail}
                    />
                </fieldset>
                <fieldset className="form-group">
                    <input
                        className="form-control form-control-lg"
                        type="password"
                        placeholder="Password"
                        onBlur={handleInputPassword}
                    />
                </fieldset>
                <button className="btn btn-lg btn-primary pull-xs-right" type="submit">
                    Sign up
                </button>
            </form>
        </>
    );
}
