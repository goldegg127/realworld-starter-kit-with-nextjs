import Link from 'next/link';
import Image from 'next/image';
import { searchParamsType, Articles, Article } from '@/type';
import { formatDate } from '@/util/format';
import { navigator } from '@/util/navigation';
import Pagination from './Pagination';
/** @todo 좋아요 기능 구현 후 적용
 *  import { Button } from '@/components/common';
 */

export default function ArticleList({
    articles,
    articlesCount,
    currentPage,
    searchParams,
}: {
    articles: Articles;
    articlesCount: number;
    currentPage: number;
    searchParams?: searchParamsType;
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
            <Pagination currentPage={currentPage} articlesCount={articlesCount} searchParams={searchParams} />
        </>
    );
}

function ArticleItem({ article }: { article: Article }) {
    const { slug, title, description, tagList, createdAt, author } = article;
    const { username, image } = author;
    const profileLink = navigator.profile(username);
    const articleLink = navigator.articleDetails(slug);

    return (
        <article className="article-preview">
            <div className="article-meta">
                <Link href={profileLink}>
                    <Image src={image} alt={`${username} profile image`} width={32} height={32} />
                </Link>
                <div className="info">
                    <Link href={profileLink} className="author">
                        {username}
                    </Link>
                    <span className="date">{formatDate(createdAt)}</span>
                </div>
                {/**
                 * @todo 좋아요 기능 구현 후 적용
                <Button
                    type="button"
                    styleClass={{
                        size: 'sm',
                        outline: favorited ? false : true,
                        color: 'primary',
                        pull: 'pull-xs-right',
                    }}>
                    <i className="ion-heart"></i> {favoritesCount}
                </Button>
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
                            <Link href={navigator.tag(tag)} className="tag-default tag-pill tag-outline">
                                {tag}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </article>
    );
}
