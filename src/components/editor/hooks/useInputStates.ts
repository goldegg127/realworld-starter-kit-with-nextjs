'use client';

import { useState } from 'react';

function useInputStates() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [body, setBody] = useState('');
    const [tagList, setTagList] = useState<string[]>([]);
    const [authorName, setAuthorName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    return {
        title,
        setTitle,
        description,
        setDescription,
        body,
        setBody,
        tagList,
        setTagList,
        errorMessage,
        setErrorMessage,
        authorName,
        setAuthorName,
    };
}

export { useInputStates };
