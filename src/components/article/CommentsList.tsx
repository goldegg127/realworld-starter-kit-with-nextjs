import Image from 'next/image';
import { fetchComments } from '@/api';
import { formatDate, formatProfileLink } from '@/util/format';

type Comments = Comment[];
type Comment = {
    id: number;
    createdAt: string;
    updatedAt: string;
    body: string;
    author: {
        username: string;
        bio: string;
        image: string;
        following: boolean;
    };
};

export default async function CommentsList({ slug }: { slug: string }) {
    const data = await fetchComments(slug);
    const { comments }: { comments: Comments } = data;

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
                                <a href="/profile/author" className="comment-author">
                                    <Image src={image} alt="" className="comment-author-img" width={32} height={32} />
                                </a>{' '}
                                <a href={profileLink} className="comment-author">
                                    {username}
                                </a>
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
