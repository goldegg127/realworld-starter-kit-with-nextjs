'use client';

import { useQuery } from '@tanstack/react-query';
import { syncDetailsWithSupabase, fetchDetailsFromSupabase } from '@/api/supabase';
import { Article } from '@/type';
import { useInputStates } from './useInputStates';
import { useEffect } from 'react';

function useGetArticle({
    slug,
    setTitle,
    setDescription,
    setBody,
    setTagList,
    setErrorMessage,
    setAuthorName,
}: ReturnType<typeof useInputStates> & { slug: string }) {
    const {
        data: queryData,
        error,
        isLoading,
    } = useQuery({
        queryKey: ['slug', slug],
        queryFn: async () => {
            await syncDetailsWithSupabase(slug);
            return fetchDetailsFromSupabase(slug);
        },
        staleTime: 1000 * 60 * 5,
        enabled: Boolean(slug),
    });

    useEffect(() => {
        if (error) {
            setErrorMessage('Unable to retrieve article information.');
            return;
        }

        if (queryData) {
            updateInputValues(queryData.article);
        }
    }, [error, queryData]);

    const updateInputValues = (article: Article) => {
        const { title, description, body, tagList, author } = article;

        setTitle(title);
        setDescription(description);
        setBody(body);
        setTagList(tagList);
        setAuthorName(author.username);
    };

    return { isLoading };
}

export { useGetArticle };
