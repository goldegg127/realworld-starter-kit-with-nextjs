'use client';

import { useState } from 'react';

function useInputBody() {
    const [articleBody, setArticleBody] = useState('');
    const handleTextarea = (event: React.FocusEvent<HTMLTextAreaElement>) => setArticleBody(event.target.value);

    return { articleBody, handleTextarea };
}

export { useInputBody };
