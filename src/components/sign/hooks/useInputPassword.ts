'use client';

import { HandleInputEvent } from '@/type';
import { useSignStates } from './useSignStates';

function useInputPassword({ setPassword }: ReturnType<typeof useSignStates>) {
    const handleInputPassword = (event: HandleInputEvent<HTMLInputElement>) => setPassword(event.target.value);

    return { handleInputPassword };
}

export { useInputPassword };
