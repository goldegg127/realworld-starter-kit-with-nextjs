'use client';

import { CommentButtonDeleteProps } from './type';
import { useHandleDeleteComment } from './hooks';

export default function CommentButtonDelete({ slug, commentId, username: authorName }: CommentButtonDeleteProps) {
    const { userInfo, handleDeleteComment } = useHandleDeleteComment(slug);

    return authorName === userInfo?.username ? (
        <button type="button" className="mod-options" onClick={() => handleDeleteComment(commentId)}>
            <i className="ion-trash-a" aria-label="delete comment"></i>
        </button>
    ) : (
        <></>
    );
}
