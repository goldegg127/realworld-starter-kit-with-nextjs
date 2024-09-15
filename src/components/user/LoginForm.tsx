'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/api';
import { useAuthStore } from '@/stores/authStore';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();
    const { login } = useAuthStore();

    const handleInputEmail = (event: React.FocusEvent<HTMLInputElement>) => setEmail(event.target.value);
    const handleInputPassword = (event: React.FocusEvent<HTMLInputElement>) => setPassword(event.target.value);

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const { user } = await loginUser({ email, password });

            if (user) {
                login(user);
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
