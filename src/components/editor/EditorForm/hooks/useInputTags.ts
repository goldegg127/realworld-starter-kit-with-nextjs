'use client';

import { useState } from 'react';

function useInputTags() {
    const [articleTags, setArticleTags] = useState(['']);

    const handleInputTags = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const newTag = event.currentTarget.value;

        if (newTag && event.key === 'Enter') {
            event.preventDefault();
            setArticleTags(prevStates => [...prevStates, newTag]);
            event.currentTarget.value = '';
        }
    };

    return { articleTags, handleInputTags };
}

export { useInputTags };
