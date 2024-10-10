import Link from 'next/link';
import Image from 'next/image';
import { syncCommentsWithSupabase, fetchCommentsFromSupabase } from '@/dataSources/supabase';
import { Comments } from '@/types';
import { CardFooterProps, ProfileLinkProps } from './type';
import { formatDate } from '@/utils/format';
import { navigator } from '@/utils/navigation';
import CommentButtonDelete from './CommentDeleteButton';

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
