'use client';

import { HandleInputEvent } from '@/types';
import { useInputStates } from './useInputStates';

function useHandleInput({ setTitle, setDescription, setBody, tagList, setTagList }: ReturnType<typeof useInputStates>) {
    const handleInputTitle = (event: HandleInputEvent<HTMLInputElement>) => setTitle(event.target.value);
    const handleInputDescription = (event: HandleInputEvent<HTMLInputElement>) => setDescription(event.target.value);
    const handleInputBody = (event: HandleInputEvent<HTMLTextAreaElement>) => setBody(event.target.value);
    const handleInputTags = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const newTag = event.currentTarget.value;

        // 한글 입력이 완료되었는지 확인
        if (event.nativeEvent.isComposing) {
            return;
        }

        if (newTag && event.key === 'Enter') {
            event.preventDefault();

            setTagList([...tagList, newTag]);
            event.currentTarget.value = '';
        }
    };

    return { handleInputTitle, handleInputDescription, handleInputBody, handleInputTags };
}

export { useHandleInput };
