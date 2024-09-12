import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { loginUser } from '@/api';

export default async function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const handleInputEmail = (event: React.FocusEvent<HTMLInputElement>) => setEmail(event.target.value);
    const handleInputPassword = (event: React.FocusEvent<HTMLInputElement>) => setPassword(event.target.value);

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const { user } = await loginUser({ email, password });
            const { token } = user;

            if (token) {
                Cookies.set('real-world-token', token, {
                    secure: true,
                    sameSite: 'Strict',
                    expires: 7,
                });
                router.push('/');
            } else {
                setErrorMessage('Login successful but no token received. Please try again later.');
            }
        } catch (error) {
            setErrorMessage('Login failed. Please check your credentials and try again.');
            console.error('error: ', error);
        }
    };

    return (
        <>
            {errorMessage && (
                <ul className="error-messages">
                    <li>{errorMessage}</li>
                </ul>
            )}
            <form onSubmit={handleLogin}>
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
                <button type="submit" className="btn btn-lg btn-primary pull-xs-right">
                    Sign in
                </button>
            </form>
        </>
    );
}
