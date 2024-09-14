'use client';

import { useArticleStore } from '@/stores';

function useInputDescription() {
    const { description, setDescription } = useArticleStore();
    const handleInputDescription = (event: React.FocusEvent<HTMLInputElement>) => setDescription(event.target.value);

    return { description, handleInputDescription };
}

export { useInputDescription };
