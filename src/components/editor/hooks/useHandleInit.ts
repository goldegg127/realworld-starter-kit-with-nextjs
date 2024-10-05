'use client';

import { useInputStates } from './useInputStates';

function useHandleInit({
    setTitle,
    setDescription,
    setBody,
    setTagList,
    setErrorMessage,
}: ReturnType<typeof useInputStates>) {
    const initForm = () => {
        setTitle('');
        setDescription('');
        setBody('');
        setTagList([]);
        setErrorMessage('');
    };

    return { initForm };
}

export { useHandleInit };
