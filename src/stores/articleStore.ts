import { create } from 'zustand';
import { persist, PersistStorage } from 'zustand/middleware';

type ArticleState = {
    title: string;
    description: string;
    body: string;
    tags: string[];
    setTitle: (title: string) => void;
    setDescription: (description: string) => void;
    setBody: (body: string) => void;
    setTags: (tags: string[]) => void;
};

const useArticleStore = create<ArticleState>(set => ({
    title: '',
    description: '',
    body: '',
    tags: [],
    setTitle: title => set({ title }),
    setDescription: description => set({ description }),
    setBody: body => set({ body }),
    setTags: tags => set({ tags }),
}));

export { useArticleStore };
