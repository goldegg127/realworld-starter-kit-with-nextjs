'use client';

import { HandleInputEvent } from '@/type';
import { useArticleStore } from '@/stores';

function useInputBody() {
    const { body, setBody } = useArticleStore();
    const handleTextarea = (event: HandleInputEvent<HTMLTextAreaElement>) => setBody(event.target.value);
    const initTextarea = () => body && setBody('');

    return { body, handleTextarea, initTextarea };
}

export { useInputBody };
