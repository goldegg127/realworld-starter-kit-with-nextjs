import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/type';
import { syncDetailsWithSupabase, fetchDetailsFromSupabase } from '@/api/supabase';
import { formatDate, formatProfileLink } from '@/util/format';
import CommentsList from '@/components/article/CommentsList';
// import CommentEditor from '@/components/article/CommentEditor';

export default async function ArticleDetails({ params }: { params: { slug: string } }) {
    await syncDetailsWithSupabase(params.slug);

    const { article } = await fetchDetailsFromSupabase(params.slug);
    const {
        slug,
        title,
        description,
        body,
        tagList,
        createdAt,
        updatedAt,
        favorited,
        favoritesCount,
        author,
    }: Article = article;
    const { username, bio, image, following } = author;
    const profileLink = formatProfileLink(username);
    const date = formatDate(createdAt);

    return (
        <div className="article-page">
            <div className="banner">
                <div className="container">
                    <h1>{title}</h1>

                    <div className="article-meta">
                        <Link href={profileLink}>
                            <Image src={image} alt="" width={32} height={32} />
                        </Link>
                        <div className="info">
                            <Link href={profileLink} className="author">
                                {username}
                            </Link>
                            <span className="date">{date}</span>
                        </div>
                        {/**
                          * @todo 로그인 기능 구현 후 적용 예정
                          <button className="btn btn-sm btn-outline-secondary"> 
                              <i className="ion-plus-round"></i>
                              &nbsp; Follow Eric Simons <span className="counter">(10)</span>
                          </button>
                          &nbsp;&nbsp;
                          <button className="btn btn-sm btn-outline-primary">
                              <i className="ion-heart"></i>
                              &nbsp; Favorite Post <span className="counter">(29)</span>
                          </button>
                          <button className="btn btn-sm btn-outline-secondary">
                              <i className="ion-edit"></i> Edit Article
                          </button>
                          <button className="btn btn-sm btn-outline-danger">
                              <i className="ion-trash-a"></i> Delete Article
                          </button> 
                        */}
                    </div>
                </div>
            </div>

            <div className="container page">
                <div className="row article-content">
                    <div className="col-md-12">
                        <p>{description}</p>
                        <h2 id="introducing-ionic">{title}</h2>
                        <p>{body}</p>
                        <ul className="tag-list">
                            {tagList.map((tag, index) => (
                                <li key={`tag-${tag}-${index}`}>
                                    <Link href={`/?tag=${tag}`} className="tag-default tag-pill tag-outline">
                                        {tag}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <hr />

                <div className="article-actions">
                    <div className="article-meta">
                        <Link href={profileLink}>
                            <Image src={image} alt="" width={32} height={32} />
                        </Link>
                        <div className="info">
                            <Link href="" className="author">
                                {username}
                            </Link>
                            <span className="date">{date}</span>
                        </div>

                        {/**
                          * @todo 로그인 기능 구현 후 적용 예정
                          <button className="btn btn-sm btn-outline-secondary">
                              <i className="ion-plus-round"></i>
                              &nbsp; Follow Eric Simons
                          </button>
                          <button className="btn btn-sm btn-outline-primary">
                              <i className="ion-heart"></i>
                              &nbsp; Favorite Article <span className="counter">(29)</span>
                          </button>
                          <button className="btn btn-sm btn-outline-secondary">
                              <i className="ion-edit"></i> Edit Article
                          </button>
                          <button className="btn btn-sm btn-outline-danger">
                              <i className="ion-trash-a"></i> Delete Article
                          </button> 
                        */}
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-12 col-md-8 offset-md-2">
                        {
                            // * @todo 로그인 기능 구현 후 적용 예정 <CommentEditor />
                        }
                        <CommentsList slug={slug} />
                    </div>
                </div>
            </div>
        </div>
    );
}
