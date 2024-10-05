'use client';

import { useAuthStore } from '@/stores';
import { useInputStates, useHandleInput, useHandleSubmitArticle, useGetArticle, useHandleInit } from './hooks';
import { Button, InputField, TextareaField } from '@/components/common';
import TagList from './TagList';
import { useEffect } from 'react';

export default function EditorForm({ slug }: { slug: string }) {
    const states = useInputStates();
    const { handleInputTitle, handleInputDescription, handleInputBody, handleInputTags } = useHandleInput(states);
    const { handleSubmit } = useHandleSubmitArticle({ slug, ...states });
    const { isLoading } = useGetArticle({ slug, ...states });
    const { initForm } = useHandleInit(states);

    const { token, userInfo } = useAuthStore();
    const isEditable = slug && token && userInfo?.username === states.authorName;

    useEffect(() => {
        return () => initForm();
    }, [slug]);

    /**
     * @todo 개발 완료 후 slug 에서 isEditable 조건으로 교체
    }**/
    if (slug && isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <ul className="error-messages">
                <li>{states.errorMessage}</li>
            </ul>

            <fieldset>
                <InputField
                    type="text"
                    styleClass={{ size: 'lg' }}
                    placeholder="Article Title"
                    value={states.title}
                    onChangeHandler={handleInputTitle}
                />
                <InputField
                    type="text"
                    styleClass={{ size: 'lg' }}
                    placeholder="What's this article about?"
                    value={states.description}
                    onChangeHandler={handleInputDescription}
                />
                <TextareaField
                    styleClass={{ size: 'lg' }}
                    rows={8}
                    placeholder="Write your article (in markdown)"
                    value={states.body}
                    onChangeHandler={handleInputBody}
                />
                <InputField
                    type="text"
                    styleClass={{ size: 'lg' }}
                    placeholder="Enter tags"
                    readOnly={slug ? true : false}
                    onKeyboardHandler={handleInputTags}
                />
                <TagList tagList={states.tagList} setTagList={states.setTagList} readOnly={Boolean(slug)} />
                <Button
                    type="button"
                    onClick={handleSubmit}
                    styleClass={{ size: 'lg', outline: false, color: 'primary', pull: 'pull-xs-right' }}>
                    Publish Article
                </Button>
            </fieldset>
        </>
    );
}
