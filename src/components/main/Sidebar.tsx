import Link from 'next/link';
import { syncTagListWithSupabase, fetchTagListFromSupabase } from '@/app/api/supabase';
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
    await syncTagListWithSupabase();

    const { tags } = await fetchTagListFromSupabase();

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
