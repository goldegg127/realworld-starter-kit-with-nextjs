'use client';

import { useArticleStore } from '@/stores';

function useInputTitle() {
    const { title, setTitle } = useArticleStore();
    const handleInputTitle = (event: React.FocusEvent<HTMLInputElement>) => setTitle(event.target.value);

    return { title, handleInputTitle };
}

export { useInputTitle };
