'use client';

import { HandleInputEvent } from '@/types';
import { useSignStates } from './useSignStates';

function useInputName({ setUsername }: ReturnType<typeof useSignStates>) {
    const handleInputName = (event: HandleInputEvent<HTMLInputElement>) => setUsername(event.target.value);

    return { handleInputName };
}

export { useInputName };
