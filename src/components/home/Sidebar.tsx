import Link from 'next/link';
import { Article } from '@/type';
import { fetchTagList } from '@/api';

export default async function Sidebar() {
    const data = await fetchTagList();
    const { tags }: { tags: Article['tagList'] } = data;

    return (
        <article className="sidebar">
            <p>Popular Tags</p>
            <ul className="tag-list">
                {tags.map((tag, index) => (
                    <li key={`tag-${tag}-${index}`}>
                        <Link href={`?tag=${tag}`} className="tag-pill tag-default">
                            {tag}
                        </Link>
                    </li>
                ))}
            </ul>
        </article>
    );
}
