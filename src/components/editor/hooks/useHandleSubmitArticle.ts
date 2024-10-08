'use client';

import { useAuthStore } from '@/stores';
import { postArticleDetails, updateArticleDetails } from '@/app/api/realworld';
import { useInputStates } from './useInputStates';

function useHandleSubmitArticle({
    slug,
    title,
    description,
    body,
    tagList,
    authorName,
    errorMessage,
    setErrorMessage,
}: ReturnType<typeof useInputStates> & { slug: string }) {
    const { token, userInfo } = useAuthStore();
    const isEditable = slug && token && userInfo?.username === authorName;

    const createArticle = async () => {
        if (token) {
            try {
                await postArticleDetails(
                    {
                        title,
                        description,
                        body,
                        tagList,
                    },
                    token,
                );
            } catch (error) {
                setErrorMessage('error: ');
                console.error('error: ', error);
            }
        } else {
            setErrorMessage('An account is required. Please log in to continue.');
        }
    };

    const editArticle = async () => {
        if (token) {
            try {
                await updateArticleDetails(
                    slug,
                    {
                        title,
                        description,
                        body,
                    },
                    token,
                );
            } catch (error) {
                setErrorMessage('error: ');
                console.error('error: ', error);
            }
        } else {
            setErrorMessage('An account is required. Please log in to continue.');
        }
    };

    const handleSubmit = async (event: React.MouseEvent) => {
        event.preventDefault();

        /**
         * @todo 개발 완료 후 slug 에서 isEditable 조건으로 교체
        }**/
        slug ? editArticle() : createArticle();
    };

    return { errorMessage, handleSubmit };
}

export { useHandleSubmitArticle };
