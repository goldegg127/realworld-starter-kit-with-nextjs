'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SignupUser } from '@/api';
import { useAuthStore } from '@/stores/authStore';
import { navigator } from '@/util/navigation';
import { Button, InputField } from '@/components/common';

export default function SignupForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();
    const { login } = useAuthStore();

    const handleInputName = (event: React.FocusEvent<HTMLInputElement>) => setUsername(event.target.value);
    const handleInputEmail = (event: React.FocusEvent<HTMLInputElement>) => setEmail(event.target.value);
    const handleInputPassword = (event: React.FocusEvent<HTMLInputElement>) => setPassword(event.target.value);

    const handleSignup = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const { user } = await SignupUser({ username, email, password });

            if (user) {
                login(user);
                router.push(navigator.main);
            } else {
                setErrorMessage('Login successful but no token received. Please try again later.');
            }
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
                <InputField
                    type="text"
                    styleClass={{ size: 'lg' }}
                    placeholder="Username"
                    onBlurHandler={handleInputName}
                />
                <InputField
                    type="text"
                    styleClass={{ size: 'lg' }}
                    placeholder="Email"
                    onBlurHandler={handleInputEmail}
                />
                <InputField
                    type="password"
                    styleClass={{ size: 'lg' }}
                    placeholder="Password"
                    onBlurHandler={handleInputPassword}
                />
                {/**
                 * @todo Button 컴포넌트 적용 후 발생하는 “Extra attributes from the server” 경고 해결하기
                 */}
                <Button
                    type="submit"
                    styleClass={{ size: 'lg', outline: false, color: 'primary', pull: 'pull-xs-right' }}>
                    Sign up
                </Button>
            </form>
        </>
    );
}
