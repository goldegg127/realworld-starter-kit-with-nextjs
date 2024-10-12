'use client';

import { useRouter } from 'next/navigation';
import { signupUser } from '@/dataSources/realworld';
import { navigator } from '@/utils/navigation';
import { useSignStates } from './useSignStates';

function useHandleSignup({
    username,
    email,
    password,
    errorMessage,
    setErrorMessage,
}: ReturnType<typeof useSignStates>) {
    const router = useRouter();

    const handleSignup = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const { user } = await signupUser({ username, email, password });

            if (user) {
                router.push(navigator.signin);
            } else {
                setErrorMessage('Login successful but no token received. Please try again later.');
            }
        } catch (error: any) {
            setErrorMessage('Login failed due to an unknown error. Please try again.');
            console.log(error);
        }
    };

    return { errorMessage, handleSignup };
}

export { useHandleSignup };
