'use client';

import { useArticleStore } from '@/stores';

function useInputBody() {
    const { body, setBody } = useArticleStore();
    const handleTextarea = (event: React.FocusEvent<HTMLTextAreaElement>) => setBody(event.target.value);

    return { body, handleTextarea };
}

export { useInputBody };
