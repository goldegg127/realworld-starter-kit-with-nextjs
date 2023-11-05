import { Article } from "@/app/type/index";
import CommentsList from "./CommentsList";
import CommentEditor from "./CommentEditor";
import { formatDate, formatProfileLink } from '@/app/util/format';

async function fetchDetails(slug: string) {
    const res = await fetch(`https://api.realworld.io/api/articles/${slug}`);

    if(!res.ok) {
        throw new Error("failed to fetch for article details");
    }

    return res.json();
}

export default async function ArticleDetails({ params } : { params: {slug: string} }) {
    const data = await fetchDetails(params.slug);

    const { slug, title, description, body, tagList, createdAt, updatedAt, favorited, favoritesCount, author } : Article = data.article;
    const { username, bio, image, following } = author;
    const profileLink = formatProfileLink(username);
    const date = formatDate(createdAt);

    return(
        <div className="article-page">
            <div className="banner">
                <div className="container">
                    <h1>{title}</h1>

                    <div className="article-meta">
                        <a href={profileLink}><img src={image} alt="" /></a>
                        <div className="info">
                            <a href={profileLink} className="author">{username}</a>
                            <span className="date">{date}</span>
                        </div>
                        {/* 로그인 기능 구현 후 적용 예정
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
                            {tagList.map((tag, index) => <li key={index}><a href={`/?tag=${tag}`} className="tag-default tag-pill tag-outline">{tag}</a></li>)}
                        </ul>
                    </div>
                </div>

                <hr />

                <div className="article-actions">
                    <div className="article-meta">
                        <a href={profileLink}><img src={image} alt="" /></a>
                        <div className="info">
                            <a href="" className="author">{username}</a>
                            <span className="date">{date}</span>
                        </div>

                        {/* 로그인 기능 구현 후 적용 예정
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
                        <CommentEditor />
                        <CommentsList slug={slug} />
                    </div>
                </div>
            </div>
        </div>
    );
}