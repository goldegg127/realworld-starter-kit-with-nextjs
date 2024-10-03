'use client';

import { HandleInputEvent } from '@/type';
import { useSignStates } from './useSignStates';

function useInputEmail({ setEmail }: ReturnType<typeof useSignStates>) {
    const handleInputEmail = (event: HandleInputEvent<HTMLInputElement>) => setEmail(event.target.value);

    return { handleInputEmail };
}

export { useInputEmail };
