'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useAuthStore } from '@/stores/authStore';
import { uesHandlePostComment } from './hooks';
import { Button } from '@/components/common';

export default function CommentEditor({ slug }: { slug: string }) {
    const [commentBody, setCommentBody] = useState('');
    const { token, userInfo } = useAuthStore();
    const initImage = '/image/demo-avatar.png';
    const [image, setImage] = useState(initImage); // hydration error 해결

    const handleTextarea = (event: React.FocusEvent<HTMLTextAreaElement>) => {
        setCommentBody(event.target.value);
    };

    const { handlePostComment } = uesHandlePostComment({ slug, commentBody, token });

    useEffect(() => {
        setImage(userInfo?.image || initImage);
    }, [userInfo?.image]);

    return (
        <form className="card comment-form" onSubmit={handlePostComment}>
            <div className="card-block">
                <textarea
                    className="form-control"
                    placeholder="Write a comment..."
                    rows={3}
                    onBlur={handleTextarea}></textarea>
            </div>
            <div className="card-footer">
                <Image
                    src={image}
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
