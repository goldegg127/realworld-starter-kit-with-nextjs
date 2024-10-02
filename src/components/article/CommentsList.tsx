import Link from 'next/link';
import Image from 'next/image';
import { syncCommentsWithSupabase, fetchCommentsFromSupabase } from '@/api/supabase';
import { Comments } from '@/type';
import { CardFooterProps, CommentButtonDeleteProps, ProfileLinkProps } from './type';
import { formatDate } from '@/util/format';
import { navigator } from '@/util/navigation';
import { useHandleDeleteComment } from './hooks';

export default async function CommentsList({ slug }: { slug: string }) {
    await syncCommentsWithSupabase(slug);

    const { comments }: { comments: Comments } = await fetchCommentsFromSupabase(slug);

    return (
        <ul>
            {comments.map(comment => {
                const { id: commentId, createdAt, body, author } = comment;

                return (
                    <li key={`${commentId}-${author}`}>
                        <article className="card">
                            <div className="card-block">
                                <p className="card-text">{body}</p>
                            </div>
                            <CardFooter slug={slug} commentId={commentId} author={author} createdAt={createdAt} />
                        </article>
                    </li>
                );
            })}
        </ul>
    );
}

function CardFooter({ slug, commentId, author, createdAt }: CardFooterProps) {
    const { username, image } = author;

    return (
        <div className="card-footer">
            <ProfileLink username={username}>
                <Image
                    src={image}
                    alt={`${username} profile image`}
                    className="comment-author-img"
                    width={32}
                    height={32}
                />
            </ProfileLink>{' '}
            <ProfileLink username={username}>{username}</ProfileLink>
            <span className="date-posted">{formatDate(createdAt)}</span>
            <CommentButtonDelete slug={slug} commentId={commentId} username={username} />
        </div>
    );
}

function ProfileLink({ username, children }: ProfileLinkProps) {
    return (
        <Link href={navigator.profile(username)} className="comment-author">
            {children}
        </Link>
    );
}

function CommentButtonDelete({ slug, commentId, username: authorName }: CommentButtonDeleteProps) {
    const { userInfo, handleDeleteComment } = useHandleDeleteComment(slug);

    return authorName === userInfo?.username ? (
        <button type="button" className="mod-options" onClick={() => handleDeleteComment(commentId)}>
            <i className="ion-trash-a" aria-label="delete comment"></i>
        </button>
    ) : (
        <></>
    );
}
