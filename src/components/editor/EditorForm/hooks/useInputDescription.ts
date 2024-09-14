'use client';

import { HandleInputEvent } from '@/type';
import { useArticleStore } from '@/stores';

function useInputDescription() {
    const { description, setDescription } = useArticleStore();
    const handleInputDescription = (event: HandleInputEvent<HTMLInputElement>) => setDescription(event.target.value);

    return { description, handleInputDescription };
}

export { useInputDescription };
