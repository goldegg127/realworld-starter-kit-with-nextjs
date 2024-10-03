'use client';

import { useSignStates, useInputEmail, useInputPassword, useHandleLogin } from './hooks';
import { Button, InputField } from '@/components/common';

export default function SigninForm() {
    const states = useSignStates();
    const { handleInputEmail } = useInputEmail(states);
    const { handleInputPassword } = useInputPassword(states);
    const { errorMessage, handleLogin } = useHandleLogin(states);

    return (
        <>
            {errorMessage && (
                <ul className="error-messages">
                    <li>{errorMessage}</li>
                </ul>
            )}
            <form onSubmit={handleLogin}>
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
                    Sign in
                </Button>
            </form>
        </>
    );
}
