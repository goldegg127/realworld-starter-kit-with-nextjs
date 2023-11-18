import { Article } from '@/type';

async function fetchTagList() {
    const res = await fetch('https://api.realworld.io/api/tags');

    if (!res.ok) {
        throw Error('failed fetching tag list');
    }

    return res.json();
}

export default async function Sidebar() {
    const data = await fetchTagList();
    const { tags }: { tags: Article['tagList'] } = data;

    return (
        <article className="sidebar">
            <p>Popular Tags</p>
            <ul className="tag-list">
                {tags.map((tag, index) => (
                    <li key={`tag-${tag}-${index}`}>
                        <a href={`/?tag=${tag}`} className="tag-pill tag-default">
                            {tag}
                        </a>
                    </li>
                ))}
            </ul>
        </article>
    );
}
