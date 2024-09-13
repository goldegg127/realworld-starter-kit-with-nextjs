import Link from 'next/link';
import Image from 'next/image';
import { syncCommentsWithSupabase, fetchCommentsFromSupabase } from '@/api/supabase';
import { Comments } from '@/type';
import { formatDate, formatProfileLink } from '@/util/format';
import DeleteCommentButton from './DeleteCommentButton';

export default async function CommentsList({ slug }: { slug: string }) {
    await syncCommentsWithSupabase(slug);

    const { comments }: { comments: Comments } = await fetchCommentsFromSupabase(slug);

    return (
        <ul>
            {comments.map(comment => {
                const { id: commentId, createdAt, body, author } = comment;
                const { username, image } = author;
                const profileLink = formatProfileLink(username);
                const date = formatDate(createdAt);

                return (
                    <li key={`${commentId}-${author}`}>
                        <article className="card">
                            <div className="card-block">
                                <p className="card-text">{body}</p>
                            </div>
                            <div className="card-footer">
                                <Link href={profileLink} className="comment-author">
                                    <Image src={image} alt="" className="comment-author-img" width={32} height={32} />
                                </Link>{' '}
                                <Link href={profileLink} className="comment-author">
                                    {username}
                                </Link>
                                <span className="date-posted">{date}</span>
                                <DeleteCommentButton slug={slug} commentId={commentId} />
                            </div>
                        </article>
                    </li>
                );
            })}
        </ul>
    );
}
