'use client';

import Image from 'next/image';
import { useAuthStore } from '@/stores/authStore';
import { uesHandlePostComment, useHandleCommentBody } from './hooks';
import { Button, TextareaField } from '@/components/common';

export default function CommentEditor({ slug }: { slug: string }) {
    const initImage = '/images/demo-avatar.png';
    const { token, userInfo } = useAuthStore();
    const { commentBody, handleTextarea } = useHandleCommentBody();
    const { handlePostComment } = uesHandlePostComment({ slug, commentBody, token });

    return (
        <form className="card comment-form" onSubmit={handlePostComment}>
            <div className="card-block">
                <TextareaField
                    styleClass={{ size: 'xs' }}
                    rows={3}
                    placeholder='"Write a comment...'
                    onBlurHandler={handleTextarea}
                />
            </div>
            <div className="card-footer">
                <Image
                    src={`${userInfo?.image || initImage}`}
                    alt={`${userInfo?.username} profile image`}
                    className="comment-author-img"
                    width={32}
                    height={32}
                />
                <Button type="submit" styleClass={{ size: 'sm', outline: false, color: 'primary' }}>
                    Post Comment
                </Button>
            </div>
        </form>
    );
}
