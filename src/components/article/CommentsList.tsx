import Link from 'next/link';
import Image from 'next/image';
import { syncCommentsWithSupabase, fetchCommentsFromSupabase } from '@/api/supabase';
import { formatDate, formatProfileLink } from '@/util/format';
import { Comments } from '@/type';

export default async function CommentsList({ slug }: { slug: string }) {
    await syncCommentsWithSupabase(slug);

    const { comments }: { comments: Comments } = await fetchCommentsFromSupabase(slug);

    return (
        <ul>
            {comments.map(comment => {
                const { id, createdAt, updatedAt, body, author } = comment;
                const { username, bio, image, following } = author;
                const profileLink = formatProfileLink(username);
                const date = formatDate(createdAt);

                return (
                    <li key={id}>
                        <article className="card">
                            <div className="card-block">
                                <p className="card-text">{body}</p>
                            </div>
                            <div className="card-footer">
                                <Link href="/profile/author" className="comment-author">
                                    <Image src={image} alt="" className="comment-author-img" width={32} height={32} />
                                </Link>{' '}
                                <Link href={profileLink} className="comment-author">
                                    {username}
                                </Link>
                                <span className="date-posted">{date}</span>
                                {/**
                                  * @todo 로그인 기능 구현 후 적용 
                                  <span className="mod-options">
                                      <i className="ion-trash-a"></i>
                                  </span> 
                                */}
                            </div>
                        </article>
                    </li>
                );
            })}
        </ul>
    );
}
