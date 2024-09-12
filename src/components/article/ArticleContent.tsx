import Link from 'next/link';

export default function ArticleContent({
    title,
    description,
    body,
    tagList,
}: {
    title: string;
    description: string;
    body: string;
    tagList: string[];
}) {
    return (
        <section className="row article-content">
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
        </section>
    );
}
