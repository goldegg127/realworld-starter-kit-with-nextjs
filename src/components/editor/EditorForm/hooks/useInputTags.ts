'use client';

import { useArticleStore } from '@/stores';

function useInputTags() {
    const { tagList, setTagList } = useArticleStore();

    const handleInputTags = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const newTag = event.currentTarget.value;

        if (newTag && event.key === 'Enter') {
            event.preventDefault();
            setTagList([...tagList, newTag]);
            event.currentTarget.value = '';
        }
    };

    return { tagList, handleInputTags };
}

export { useInputTags };
