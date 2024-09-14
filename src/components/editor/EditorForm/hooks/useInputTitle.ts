'use client';

import { useState } from 'react';

function useInputTitle() {
    const [articleTitle, setArticleTitle] = useState('');
    const handleInputTitle = (event: React.FocusEvent<HTMLInputElement>) => setArticleTitle(event.target.value);

    return { articleTitle, handleInputTitle };
}

export { useInputTitle };
