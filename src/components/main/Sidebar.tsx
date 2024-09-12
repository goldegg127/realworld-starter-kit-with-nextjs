import Link from 'next/link';
import { syncTagListWithSupabase, fetchTagListFromSupabase } from '@/api/supabase';
import { formatTagLink } from '@/util/format';

export default async function Sidebar() {
    return (
        <article className="sidebar">
            <p>Popular Tags</p>
            <TagList />
        </article>
    );
}

async function TagList() {
    await syncTagListWithSupabase();

    const { tags } = await fetchTagListFromSupabase();

    return (
        <ul className="tag-list">
            {!tags || tags.length === 0 ? (
                <p>⚠️ No tags available</p>
            ) : (
                tags.map((tag, index) => (
                    <li key={`tag-${tag}-${index}`}>
                        <Link href={formatTagLink(tag)} className="tag-pill tag-default">
                            {tag}
                        </Link>
                    </li>
                ))
            )}
        </ul>
    );
}
