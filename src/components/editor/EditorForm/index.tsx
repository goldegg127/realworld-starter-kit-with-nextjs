'use client';

import { useState, useEffect } from 'react';
import { postArticleDetails, updateArticleDetails } from '@/api';
import useAuthStore from '@/store/authStore';
import { useInputTitle, useInputDescription, useInputBody, useInputTags } from './hooks';
import InputField from './InputField';
import TextareaField from './TextareaField';
import TagList from './TagList';

export default function EditorForm({ slug }: { slug: string }) {
    const [errorMessage, setErrorMessage] = useState('');
    const { token } = useAuthStore();

    const { articleTitle, handleInputTitle } = useInputTitle();
    const { articleDescription, handleInputDescription } = useInputDescription();
    const { articleBody, handleTextarea } = useInputBody();
    const { articleTags, handleInputTags } = useInputTags();

    useEffect(() => {
        if (slug) {
            console.log('Slug:', slug);
        }
    }, [slug]);

    const createArticle = async () => {
        if (token) {
            try {
                await postArticleDetails(
                    {
                        title: articleTitle,
                        description: articleDescription,
                        body: articleBody,
                        tagList: articleTags,
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

        slug && createArticle();
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
                <TagList articleTags={articleTags} />
                <button className="btn btn-lg pull-xs-right btn-primary" type="button" onClick={handleSubmit}>
                    Publish Article
                </button>
            </fieldset>
        </>
    );
}
