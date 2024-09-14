'use client';

import { useState, useEffect } from 'react';
import { postArticleDetails, updateArticleDetails } from '@/api';
import { useAuthStore } from '@/stores';
import { useInputTitle, useInputDescription, useInputBody, useInputTags } from './hooks';
import InputField from './InputField';
import TextareaField from './TextareaField';
import TagList from './TagList';

export default function EditorForm({ slug }: { slug: string }) {
    const [errorMessage, setErrorMessage] = useState('');
    const { token } = useAuthStore();

    const { title, handleInputTitle } = useInputTitle();
    const { description, handleInputDescription } = useInputDescription();
    const { body, handleTextarea } = useInputBody();
    const { tagList, handleInputTags } = useInputTags();

    useEffect(() => {
        if (slug && token) {
            console.log({ slug, token });
        }
    }, [slug, token]);

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

        slug ? editArticle() : createArticle();
    };

    return (
        <>
            <ul className="error-messages">
                <li>{errorMessage}</li>
            </ul>

            <fieldset>
                <InputField onBlurHandler={handleInputTitle} placeholder="Article Title" />
                <InputField onBlurHandler={handleInputDescription} placeholder="What's this article about?" />
                <TextareaField onBlurHandler={handleTextarea} placeholder="Write your article (in markdown)" />
                <InputField onKeyboardHandler={handleInputTags} placeholder="Enter tags" />
                <TagList tagList={tagList} />
                <button className="btn btn-lg pull-xs-right btn-primary" type="button" onClick={handleSubmit}>
                    Publish Article
                </button>
            </fieldset>
        </>
    );
}
