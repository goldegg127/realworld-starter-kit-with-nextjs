'use client';

import { useRouter } from 'next/navigation';
import { loginUser } from '@/dataSources/realworld';
import { useAuthStore } from '@/stores/authStore';
import { navigator } from '@/utils/navigation';
import { useSignStates } from './useSignStates';

function useHandleLogin({ email, password, errorMessage, setErrorMessage }: ReturnType<typeof useSignStates>) {
    const router = useRouter();
    const { login } = useAuthStore();

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const { user } = await loginUser({ email, password });

            if (user) {
                login(user);
                router.push(navigator.main);
            } else {
                setErrorMessage('Login successful but no token received. Please try again later.');
            }
        } catch (error) {
            setErrorMessage('Login failed. Please check your credentials and try again.');
            console.error('error: ', error);
        }
    };

    return { errorMessage, handleLogin };
}

export { useHandleLogin };
