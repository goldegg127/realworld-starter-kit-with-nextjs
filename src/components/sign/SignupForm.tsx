'use client';

import { Button, InputField } from '@/components/common';
import { useSignStates, useInputEmail, useInputName, useInputPassword, useHandleSignup } from './hooks';

export default function SignupForm() {
    const states = useSignStates();
    const { handleInputName } = useInputName(states);
    const { handleInputEmail } = useInputEmail(states);
    const { handleInputPassword } = useInputPassword(states);
    const { errorMessage, handleSignup } = useHandleSignup(states);

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
