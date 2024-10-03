'use client';

import { useState } from 'react';

function useHandleCommentBody() {
    const [commentBody, setCommentBody] = useState('');

    const handleTextarea = (event: React.FocusEvent<HTMLTextAreaElement>) => {
        setCommentBody(event.target.value);
    };

    return { commentBody, handleTextarea };
}

export { useHandleCommentBody };
