'use client';

import { useState } from 'react';
import { postArticleDetails } from '@/api';
import useAuthStore from '@/store/authStore';

export default function EditorForm() {
    const [articleTitle, setArticleTitle] = useState('');
    const [articleDescription, setArticleDescription] = useState('');
    const [articleBody, setArticleBody] = useState('');
    const [articleTags, setArticleTags] = useState(['']);
    const [errorMessage, setErrorMessage] = useState('');
    const { token } = useAuthStore();

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
                await postArticleDetails(token, {
                    title: articleTitle,
                    description: articleDescription,
                    body: articleBody,
                    tagList: articleTags,
                });
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
                <fieldset className="form-group">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Article Title"
                        onBlur={handleInputTitle}
                    />
                </fieldset>
                <fieldset className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="What's this article about?"
                        onBlur={handleInputDescription}
                    />
                </fieldset>
                <fieldset className="form-group">
                    <textarea
                        className="form-control"
                        rows={8}
                        placeholder="Write your article (in markdown)"
                        onBlur={handleTextarea}></textarea>
                </fieldset>
                <fieldset className="form-group">
                    <input type="text" className="form-control" placeholder="Enter tags" onKeyDown={handleInputTags} />
                </fieldset>
                <TagList articleTags={articleTags} />
                <button className="btn btn-lg pull-xs-right btn-primary" type="button" onClick={handleSubmit}>
                    Publish Article
                </button>
            </fieldset>
        </>
    );
}

function TagList({ articleTags }: { articleTags: string[] }) {
    return (
        <div className="tag-list">
            {articleTags.map(
                (tag, index) =>
                    tag && (
                        <span key={`${index}-${tag}`} className="tag-default tag-pill">
                            <i className="ion-close-round"></i> {tag}
                        </span>
                    ),
            )}
        </div>
    );
}
