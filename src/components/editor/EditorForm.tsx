'use client';

import { useState, useEffect } from 'react';
import { postArticleDetails, updateArticleDetails } from '@/api';
import { useAuthStore, useArticleStore } from '@/stores';
import { useInputTitle, useInputDescription, useInputBody, useInputTags } from './hooks';
import { Button, InputField, TextareaField } from '@/components/common';
import TagList from './TagList';

export default function EditorForm({ slug }: { slug: string }) {
    const [errorMessage, setErrorMessage] = useState('');
    const { token, userInfo } = useAuthStore();
    const { author } = useArticleStore();

    const isEditable = slug && token && userInfo?.username === author?.username;

    const { title, handleInputTitle, initInputTitle } = useInputTitle();
    const { description, handleInputDescription, initInputDescription } = useInputDescription();
    const { body, handleTextarea, initTextarea } = useInputBody();
    const { tagList, handleInputTags, initInputTags } = useInputTags();

    useEffect(() => {
        /**
         * @todo 개발 완료 후 if (slug && token) 에서 if (isEditable) 으로 교체
        }**/
        if (slug && token) {
            console.log({ slug, token });
        } else if (!isEditable) {
            initInputTitle();
            initTextarea();
            initInputDescription();
            initInputTags();
        }
    }, [slug, token, isEditable, initInputTitle, initTextarea, initInputDescription, initInputTags]);

    useEffect(() => {
        /**
         * @todo 개발 완료 후 제거
        }**/
        console.log({ slug, token });
        console.log({ title, description, body, tagList });
    }, [slug, token, title, description, body, tagList]);

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
         * @todo 개발 완료 후 if (isEditable) 으로 교체
        }**/
        slug ? editArticle() : createArticle();
    };

    return (
        <>
            <ul className="error-messages">
                <li>{errorMessage}</li>
            </ul>

            <fieldset>
                <InputField value={title} onChangeHandler={handleInputTitle} placeholder="Article Title" />
                <InputField
                    value={description}
                    onChangeHandler={handleInputDescription}
                    placeholder="What's this article about?"
                />
                <TextareaField
                    value={body}
                    onChangeHandler={handleTextarea}
                    placeholder="Write your article (in markdown)"
                />
                <InputField
                    onKeyboardHandler={handleInputTags}
                    placeholder="Enter tags"
                    readOnly={slug ? true : false}
                />
                <TagList readOnly={slug ? true : false} />
                <Button
                    type="button"
                    onClick={handleSubmit}
                    styleClass={{ size: 'lg', outline: false, color: 'primary' }}>
                    Publish Article
                </Button>
            </fieldset>
        </>
    );
}
