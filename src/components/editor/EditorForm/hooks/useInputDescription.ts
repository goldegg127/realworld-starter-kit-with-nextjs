'use client';

import { useState } from 'react';

function useInputDescription() {
    const [articleDescription, setArticleDescription] = useState('');
    const handleInputDescription = (event: React.FocusEvent<HTMLInputElement>) =>
        setArticleDescription(event.target.value);

    return { articleDescription, handleInputDescription };
}

export { useInputDescription };
