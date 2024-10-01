'use client';

import { useHandleDeleteComment } from '../hooks/useHandleDeleteComment';

export default function CommentButtonDelete({
    slug,
    commentId,
    username: authorName,
}: {
    slug: string;
    commentId: number;
    username: string;
}) {
    const { userInfo, handleDeleteComment } = useHandleDeleteComment(slug);

    return authorName === userInfo?.username ? (
        <button type="button" className="mod-options" onClick={() => handleDeleteComment(commentId)}>
            <i className="ion-trash-a" aria-label="delete comment"></i>
        </button>
    ) : (
        <></>
    );
}
