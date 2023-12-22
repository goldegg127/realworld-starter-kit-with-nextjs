import Link from 'next/link';
import Image from 'next/image';
import { fetchArticles } from '@/api';
import { Articles, Article } from '@/type/index';
import { formatDate, formatProfileLink } from '@/util/format';
import Pagination from './Pagination';

export default function ArticleItems({
    articles,
    articlesCount,
    currentPage,
}: {
    articles: Articles;
    articlesCount: number;
    currentPage: number;
}) {
    return (
        <>
            <ul>
                {articles.map(article => {
                    return (
                        <li key={article.slug}>
                            <ArticleItem article={article} />
                        </li>
                    );
                })}
            </ul>
            <Pagination currentPage={currentPage} articlesCount={articlesCount} />
        </>
    );
}

function ArticleItem({ article }: { article: Article }) {
    const { slug, title, description, tagList, createdAt, favorited, favoritesCount, author } = article;
    const { username, image } = author;
    const profileLink = formatProfileLink(username);
    const articleLink = `/article/${slug}`;
    const date = formatDate(createdAt);

    return (
        <article className="article-preview">
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
                * @todo 로그인 기능 구현 후 적용
                    <button className={`btn ${favorited ? `btn-primary` : `btn-outline-primary`} btn-sm pull-xs-right`}>
                        <i className="ion-heart"></i> {favoritesCount}
                    </button>
                */}
            </div>
            <div className="preview-link">
                <h3>
                    <Link href={articleLink}>{title}</Link>
                </h3>
                <p className="hidden-text-target">
                    <Link href={articleLink}>{description}</Link>
                </p>
                <Link href={articleLink}>Read more...</Link>
                <ul className="tag-list">
                    {tagList.map((tag, index) => (
                        <li key={`${slug}-${tag}-${index}`}>
                            <Link href={`/?tag=${tag}`} className="tag-default tag-pill tag-outline">
                                {tag}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </article>
    );
}
