type Articles = Article[];
type Article = {
    slug: string;
    title: string;
    body: string;
    tagList: string[];
    createdAt: string;
    updatedAt: string;
    favorited: boolean;
    favoritesCount: number;
    author: {
        username: string;
        bio?: string;
        image: string;
        following: boolean;
    };
};

export default function Item({ pageArticles } : { pageArticles: Articles }) {

    const renderArticle = (article: Article) => {
        const { slug, title, body, tagList, createdAt, favorited, favoritesCount, author } = article;
        const { username, image } = author;
        const profileLink = `/profile/${username}`;
        const articleLink = `/article/${slug}`;
        const date = new Date(createdAt).toLocaleDateString('en-us', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

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
                    <p className='hidden-text-target'><a href={articleLink}>{body}</a></p>
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