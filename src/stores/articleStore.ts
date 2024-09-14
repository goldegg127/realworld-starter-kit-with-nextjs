import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Author } from '@/type';
import { localStoragePersist } from '@/util/storageUtils';

type ArticleState = {
    title: string;
    description: string;
    body: string;
    tagList: string[];
    author: Author;
    setTitle: (title: string) => void;
    setDescription: (description: string) => void;
    setBody: (body: string) => void;
    setTagList: (tagList: string[]) => void;
    setAuthor: (author: Author) => void;
};

const useArticleStore = create<ArticleState>()(
    persist<ArticleState>(
        set => ({
            title: '',
            description: '',
            body: '',
            tagList: [],
            author: {
                username: '',
                bio: '',
                image: '',
                following: false,
            },
            setTitle: title => set({ title }),
            setDescription: description => set({ description }),
            setBody: body => set({ body }),
            setTagList: tagList => set({ tagList }),
            setAuthor: author => set({ author }),
        }),
        {
            name: 'article-storage',
            storage: localStoragePersist,
        },
    ),
);

export { useArticleStore };
