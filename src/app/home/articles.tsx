import { Articles, Article } from "@/app/type/index";
import { formatDate, formatProfileLink } from '@/app/util/format';

export default function Item({ pageArticles } : { pageArticles: Articles }) {

    const renderArticle = (article: Article) => {
        const { slug, title, description, tagList, createdAt, favorited, favoritesCount, author } = article;
        const { username, image } = author;
        const profileLink = formatProfileLink(username);
        const articleLink = `/article/${slug}`;
        const date = formatDate(createdAt);

        return (
            <article className="article-preview">
                <div className="article-meta">
                <a href={profileLink}><img src={image} alt="" /></a>
                <div className="info">
                    <a href={profileLink} className="author">{username}</a>
                    <span className="date">{date}</span>
                </div>
                {/* <button className={`btn ${favorited ? `btn-primary` : `btn-outline-primary`} btn-sm pull-xs-right`}>
                    <i className="ion-heart"></i> {favoritesCount}
                </button> */}
                </div>
                <div className='preview-link'>
                    <h3><a href={articleLink}>{title}</a></h3>
                    <p className='hidden-text-target'><a href={articleLink}>{description}</a></p>
                    <a href={articleLink}>Read more...</a>
                    <ul className="tag-list">
                        {tagList.map((tag, index) => <li key={index}><a href={`/?tag=${tag}`} className="tag-default tag-pill tag-outline">{tag}</a></li>)}
                    </ul>
                </div>
            </article>
        );
    }

    return (
        <ul>
            {pageArticles.map((article) => {
                return <li key={article.slug}>{renderArticle(article)}</li>;
            })}
        </ul>
    );
}