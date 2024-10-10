import Link from 'next/link';
import { fetchTagList } from '@/app/api';
import { navigator } from '@/utils/navigation';

export default async function Sidebar() {
    return (
        <article className="sidebar">
            <p>Popular Tags</p>
            <TagList />
        </article>
    );
}

async function TagList() {
    const { tags }: { tags: string[] } = await fetchTagList();

    return (
        <ul className="tag-list">
            {!tags || tags.length === 0 ? (
                <p>⚠️ No tags available</p>
            ) : (
                tags.map((tag, index) => (
                    <li key={`tag-${tag}-${index}`}>
                        <Link href={navigator.tag(tag)} className="tag-pill tag-default">
                            {tag}
                        </Link>
                    </li>
                ))
            )}
        </ul>
    );
}
