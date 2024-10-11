'use client';

import { useAuthStore } from '@/stores/authStore';
import { uesHandlePostComment, useHandleCommentBody } from './hooks';
import { Button, TextareaField } from '@/components/common';
import CardFooterImage from './CommentsCardFooterImage';

export default function CommentEditor({ slug }: { slug: string }) {
    const { token, userInfo } = useAuthStore();
    const { commentBody, handleTextarea } = useHandleCommentBody();
    const { handlePostComment } = uesHandlePostComment({ slug, commentBody, token });

    return (
        <form className="card comment-form" onSubmit={handlePostComment}>
            <div className="card-block">
                <TextareaField
                    styleClass={{ size: 'xs' }}
                    rows={3}
                    placeholder="Write a comment..."
                    onBlurHandler={handleTextarea}
                />
            </div>
            <div className="card-footer">
                <CardFooterImage username={userInfo?.username} image={userInfo?.image} />
                <Button type="submit" styleClass={{ size: 'sm', outline: false, color: 'primary' }}>
                    Post Comment
                </Button>
            </div>
        </form>
    );
}
