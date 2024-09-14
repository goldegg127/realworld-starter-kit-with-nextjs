import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { localStoragePersist } from '@/util/storageUtils';

type ArticleState = {
    title: string;
    description: string;
    body: string;
    tagList: string[];
    setTitle: (title: string) => void;
    setDescription: (description: string) => void;
    setBody: (body: string) => void;
    setTagList: (tagList: string[]) => void;
};

const useArticleStore = create<ArticleState>()(
    persist<ArticleState>(
        set => ({
            title: '',
            description: '',
            body: '',
            tagList: [],
            setTitle: title => set({ title }),
            setDescription: description => set({ description }),
            setBody: body => set({ body }),
            setTagList: tagList => set({ tagList }),
        }),
        {
            name: 'article-storage',
            storage: localStoragePersist,
        },
    ),
);

export { useArticleStore };
