'use client';

import Image from 'next/image';
import { Articles, Article } from '@/type/index';
import { formatDate, formatProfileLink } from '@/util/format';

function ArticleItem({ article }: { article: Article }) {
    const { slug, title, description, tagList, createdAt, favorited, favoritesCount, author } = article;
    const { username, image } = author;
    const profileLink = formatProfileLink(username);
    const articleLink = `/article/${slug}`;
    const date = formatDate(createdAt);

    return (
        <article className="article-preview">
            <div className="article-meta">
                <a href={profileLink}>
                    <Image src={image} alt="" width={32} height={32} />
                </a>
                <div className="info">
                    <a href={profileLink} className="author">
                        {username}
                    </a>
                    <span className="date">{date}</span>
                </div>
                {/** 
                * @todo 로그인 기능 구현 후 적용
                    <button className={`btn ${favorited ? `btn-primary` : `btn-outline-primary`} btn-sm pull-xs-right`}>
                        <i className="ion-heart"></i> {favoritesCount}
                    </button>
                */}
            </div>
            <div className="preview-link">
                <h3>
                    <a href={articleLink}>{title}</a>
                </h3>
                <p className="hidden-text-target">
                    <a href={articleLink}>{description}</a>
                </p>
                <a href={articleLink}>Read more...</a>
                <ul className="tag-list">
                    {tagList.map((tag, index) => (
                        <li key={`${slug}-${tag}-${index}`}>
                            <a href={`/?tag=${tag}`} className="tag-default tag-pill tag-outline">
                                {tag}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </article>
    );
}

export default function ArticleItems({ articles }: { articles: Articles }) {
    return (
        <ul>
            {articles.map(article => {
                return (
                    <li key={article.slug}>
                        <ArticleItem article={article} />
                    </li>
                );
            })}
        </ul>
    );
}
