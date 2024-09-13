'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { postComment } from '@/api';
import useAuthStore from '@/store/authStore';

export default function CommentEditor({ slug }: { slug: string }) {
    const [commentBody, setCommentBody] = useState('');
    const { token, userInfo } = useAuthStore();
    const initImage = '/image/demo-avatar.png';
    const [imagePath, setImagePath] = useState(initImage);

    const handleTextarea = (event: React.FocusEvent<HTMLTextAreaElement>) => {
        setCommentBody(event.target.value);
    };

    useEffect(() => {
        setImagePath(userInfo?.image || initImage);
    }, []);

    const handlePostComment = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            await postComment({ slug, commentBody, token });
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    };

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
                <Image src={imagePath} alt="" className="comment-author-img" width={32} height={32} />
                <button className="btn btn-sm btn-primary" type="submit">
                    Post Comment
                </button>
            </div>
        </form>
    );
}
