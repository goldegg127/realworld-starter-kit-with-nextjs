'use client';

import { HandleInputEvent } from '@/type';
import { useArticleStore } from '@/stores';

function useInputTitle() {
    const { title, setTitle } = useArticleStore();
    const handleInputTitle = (event: HandleInputEvent<HTMLInputElement>) => setTitle(event.target.value);
    const initInputTitle = () => title && setTitle('');

    return { title, handleInputTitle, initInputTitle };
}

export { useInputTitle };
