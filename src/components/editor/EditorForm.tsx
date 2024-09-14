'use client';

import { useState, useEffect } from 'react';
import { postArticleDetails } from '@/api';
import useAuthStore from '@/store/authStore';
import { InputField, TextareaField, TagList } from '@/components/editor';

export default function EditorForm({ slug }: { slug: string }) {
    const [articleTitle, setArticleTitle] = useState('');
    const [articleDescription, setArticleDescription] = useState('');
    const [articleBody, setArticleBody] = useState('');
    const [articleTags, setArticleTags] = useState(['']);
    const [errorMessage, setErrorMessage] = useState('');
    const { token } = useAuthStore();

    useEffect(() => {
        if (slug) {
            console.log('Slug:', slug);
        }
    }, [slug]);

    const handleInputTitle = (event: React.FocusEvent<HTMLInputElement>) => setArticleTitle(event.target.value);
    const handleInputDescription = (event: React.FocusEvent<HTMLInputElement>) =>
        setArticleDescription(event.target.value);
    const handleTextarea = (event: React.FocusEvent<HTMLTextAreaElement>) => setArticleBody(event.target.value);
    const handleInputTags = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const newTag = event.currentTarget.value;

        if (newTag && event.key === 'Enter') {
            event.preventDefault();
            setArticleTags(prevStates => [...prevStates, newTag]);
            event.currentTarget.value = '';
        }
    };
    const handleSubmit = async (event: React.MouseEvent) => {
        event.preventDefault();

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
